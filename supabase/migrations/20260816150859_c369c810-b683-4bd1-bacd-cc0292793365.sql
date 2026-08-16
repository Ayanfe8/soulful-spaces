create extension if not exists pg_net with schema extensions;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table if not exists private.app_config (
  key text primary key,
  value text not null
);
revoke all on private.app_config from public, anon, authenticated;
alter table private.app_config enable row level security;

insert into private.app_config(key, value) values
  ('booking_email_url', 'https://project--a6d2510d-0cca-4ba9-941e-b9fe5e8eb13d.lovable.app/api/public/booking-email'),
  ('booking_webhook_secret', '__SET_OUT_OF_BAND__')
on conflict (key) do update set value = excluded.value;

create or replace function public.notify_booking_created()
returns trigger
language plpgsql
security definer
set search_path = public, extensions, private
as $$
declare
  endpoint text;
  secret text;
begin
  select value into endpoint from private.app_config where key = 'booking_email_url';
  select value into secret from private.app_config where key = 'booking_webhook_secret';
  if endpoint is null or secret is null then
    return new;
  end if;

  perform net.http_post(
    url := endpoint,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', secret
    ),
    body := jsonb_build_object(
      'type', 'INSERT',
      'record', to_jsonb(new)
    )
  );
  return new;
end;
$$;

revoke all on function public.notify_booking_created() from public, anon, authenticated;

drop trigger if exists on_booking_created_send_emails on public.bookings;
create trigger on_booking_created_send_emails
after insert on public.bookings
for each row execute function public.notify_booking_created();