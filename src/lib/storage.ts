const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ??
  "https://rrybhxqsayenioprikon.supabase.co";

const BUCKET = "content-images";

/**
 * Resolves a CMS image_path (e.g. "portfolio/portfolio-1.jpg") to a public
 * Storage URL. Absolute URLs are returned untouched.
 */
export function storageImageUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const clean = path.replace(/^\/+/, "");
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${clean}`;
}
