CREATE POLICY "Public can read content-images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'content-images');

CREATE POLICY "Authenticated can upload content-images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'content-images');

CREATE POLICY "Authenticated can update content-images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'content-images')
WITH CHECK (bucket_id = 'content-images');

CREATE POLICY "Authenticated can delete content-images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'content-images');

UPDATE public.portfolio_projects
SET image_path = CASE
  WHEN image_path LIKE 'portfolio-%' THEN 'portfolio/' || image_path
  WHEN image_path LIKE 'service-%' THEN 'services/' || image_path
  WHEN image_path = 'hero-interior.jpg' THEN 'homepage/hero-interior.jpg'
  ELSE image_path
END
WHERE image_path IS NOT NULL AND image_path NOT LIKE '%/%';