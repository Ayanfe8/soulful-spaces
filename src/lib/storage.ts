import { readPublicConfigSync } from "@/lib/public-config";

const BUCKET = "content-images";

/**
 * Resolves a CMS image_path (e.g. "portfolio/portfolio-1.jpg") to a public
 * Storage URL. Absolute URLs are returned untouched. Returns "" when real
 * config can't be resolved — no hardcoded project fallback. In that case the
 * content reads also fail and routes render ContentUnavailable.
 */
export function storageImageUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = readPublicConfigSync()?.url;
  if (!base) {
    console.error("[storage] Supabase URL unavailable; cannot build image URL");
    return "";
  }
  const clean = path.replace(/^\/+/, "");
  return `${base}/storage/v1/object/public/${BUCKET}/${clean}`;
}
