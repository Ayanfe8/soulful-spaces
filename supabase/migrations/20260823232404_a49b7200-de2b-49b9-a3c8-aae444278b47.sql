CREATE POLICY "Authenticated can view bookings"
ON public.bookings FOR SELECT
TO authenticated
USING (true);