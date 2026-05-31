
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (booking_date, booking_time)
);

GRANT SELECT, INSERT ON public.bookings TO anon;
GRANT SELECT, INSERT ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert a booking
CREATE POLICY "Anyone can create a booking"
  ON public.bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to read only date+time (for availability checking) - we'll restrict via a view-like SELECT pattern
-- Simpler: allow reading booking_date and booking_time columns only. Postgres RLS is row-level not column-level.
-- For availability we expose date+time only via a SECURITY DEFINER function.
CREATE POLICY "No public reads of full bookings"
  ON public.bookings FOR SELECT
  TO anon, authenticated
  USING (false);

-- Function to fetch booked slots (date+time only) for availability UI
CREATE OR REPLACE FUNCTION public.get_booked_slots(target_date DATE)
RETURNS TABLE (booking_time TEXT)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT booking_time FROM public.bookings
  WHERE booking_date = target_date AND status <> 'cancelled';
$$;

GRANT EXECUTE ON FUNCTION public.get_booked_slots(DATE) TO anon, authenticated;
