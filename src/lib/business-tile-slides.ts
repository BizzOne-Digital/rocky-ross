import fs from "fs";
import path from "path";
import type { PublicMedia } from "@/lib/types/public-media";
import { BUSINESS_SLUGS } from "@/lib/business-slugs";
import { getLocalGalleryMedia } from "@/lib/business-gallery-local";

function fileExists(publicUrlPath: string): boolean {
  try {
    const rel = publicUrlPath.replace(/^\//, "").replace(/\//g, path.sep);
    return fs.existsSync(path.join(process.cwd(), "public", rel));
  } catch {
    return false;
  }
}

export function getLocalLogoMedia(slug: string): PublicMedia | null {
  if (!BUSINESS_SLUGS.includes(slug as (typeof BUSINESS_SLUGS)[number])) return null;
  for (const ext of ["png", "webp", "jpg", "jpeg", "svg"]) {
    const url = `/images/logos/${slug}.${ext}`;
    if (fileExists(url)) {
      return {
        id: `local-logo-${slug}`,
        url,
        width: 800,
        height: 400,
        alt: "",
        usage: "logo",
        sortOrder: -1,
        focalX: 50,
        focalY: 50,
        logoFit: "contain",
      };
    }
  }
  return null;
}

function uniqueByUrl(items: PublicMedia[]): PublicMedia[] {
  const seen = new Set<string>();
  return items.filter((m) => {
    if (seen.has(m.url)) return false;
    seen.add(m.url);
    return true;
  });
}

/** Logo first, then up to 3 real photos (gallery / tile / hero). No stock filler. */
export function getTileSlideshowMedia(slug: string, media: PublicMedia[]): PublicMedia[] {
  const fromDb = media.filter((m) => ["logo", "tile", "gallery", "hero"].includes(m.usage));

  const logo =
    fromDb.find((m) => m.usage === "logo") ??
    getLocalLogoMedia(slug);

  const photos = uniqueByUrl([
    ...getLocalGalleryMedia(slug),
    ...fromDb.filter((m) => m.usage !== "logo"),
  ]);

  const ordered: PublicMedia[] = [];
  if (logo) ordered.push(logo);
  for (const p of photos) {
    if (logo && p.url === logo.url) continue;
    ordered.push(p);
  }

  return ordered.slice(0, 4);
}
