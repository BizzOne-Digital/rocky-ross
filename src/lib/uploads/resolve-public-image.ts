import { LEGACY_UPLOAD_PLACEHOLDER } from "./constants";

/** Map content image URLs for display; legacy disk `/uploads/...` → placeholder. */
export function resolvePublicImageUrl(url: string | null | undefined): string {
  if (!url?.trim()) return LEGACY_UPLOAD_PLACEHOLDER;
  if (url.startsWith("/uploads/")) return LEGACY_UPLOAD_PLACEHOLDER;
  return url;
}

export function hasDisplayableServiceImage(url: string | null | undefined): boolean {
  if (!url?.trim()) return false;
  if (url.startsWith("/uploads/")) return false;
  return true;
}
