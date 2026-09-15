ALTER TABLE public.site_settings
ADD COLUMN whatsapp_url text;

UPDATE public.site_settings
SET instagram_url = 'https://www.instagram.com/habitatbygrayson?igsh=ZndsdmxjMHRrNDdt&utm_source=qr',
    pinterest_url = 'https://pin.it/4n4Rhvbbx',
    whatsapp_url = NULL,
    updated_at = now();