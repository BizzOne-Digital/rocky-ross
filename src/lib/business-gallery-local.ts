import fs from "fs";
import path from "path";
import { getDefaultTileMedia } from "@/lib/business-tile-images";
import type { PublicMedia } from "@/lib/types/public-media";
import { BUSINESS_SLUGS } from "@/lib/business-slugs";
import { getDjLocalGalleryMedia, getDjLocalHeroMedia, isDjBusinessSlug } from "@/lib/dj-gallery-local";

const GALLERY_ALTS: Record<string, [string, string]> = {
  "old-north-end-tattoos": [
    "Custom floral tattoo sketch at Old North End Tattoos",
    "Professional tattoo machine and ink at Old North End Tattoos",
  ],
  "el-gringos-tacos": [
    "Street-style tacos with avocado and salsa at El Gringo's Tacos",
    "Birria tacos with consommé at El Gringo's Tacos",
  ],
  "tequila-chilladas-bar": [
    "Craft cocktails at Tequila Chillada's Bar",
    "Tequila tasting flight at Tequila Chillada's Bar",
  ],
  "trims-barbershop": [
    "Classic barber tools and shave setup at Trims Barbershop",
    "Premium clippers and grooming tools at Trims Barbershop",
  ],
};

function fileExists(publicUrlPath: string): boolean {
  try {
    const rel = publicUrlPath.replace(/^\//, "").replace(/\//g, path.sep);
    return fs.existsSync(path.join(process.cwd(), "public", rel));
  } catch {
    return false;
  }
}

/** Local gallery files: `/images/gallery/{slug}-1.jpg`, `-2.jpg`, then tile fallback. */
export function getLocalGalleryMedia(slug: string): PublicMedia[] {
  if (!BUSINESS_SLUGS.includes(slug as (typeof BUSINESS_SLUGS)[number])) return [];
  if (isDjBusinessSlug(slug)) return getDjLocalGalleryMedia();

  const urls: string[] = [];
  for (const n of [1, 2]) {
    const url = `/images/gallery/${slug}-${n}.jpg`;
    if (fileExists(url)) urls.push(url);
  }
  const tileUrl = `/images/tiles/${slug}.jpg`;
  if (urls.length === 0 && fileExists(tileUrl)) urls.push(tileUrl);

  const alts = GALLERY_ALTS[slug];

  return urls.map((url, i) => ({
    id: `local-gallery-${slug}-${i}`,
    url,
    width: 1200,
    height: 900,
    alt: alts?.[i] ?? "",
    usage: "gallery",
    sortOrder: i,
    focalX: 50,
    focalY: 45,
    logoFit: "cover",
  }));
}

export function enrichBusinessMedia<T extends { slug: string; media: PublicMedia[] }>(business: T): T {
  let media = [...business.media];

  if (isDjBusinessSlug(business.slug)) {
    const djHero = getDjLocalHeroMedia();
    const djGallery = getDjLocalGalleryMedia();
    media = media.filter((m) => m.usage !== "gallery" && m.usage !== "hero");
    if (djHero) media = [djHero, ...media];
    media = [...media, ...djGallery];
  }

  const hasBranding = media.some((m) => ["tile", "hero", "logo", "gallery"].includes(m.usage));
  if (!hasBranding) {
    media = [...getDefaultTileMedia(business.slug), ...media];
  }

  if (!media.some((m) => m.usage === "gallery")) {
    media = [...media, ...getLocalGalleryMedia(business.slug)];
  }

  if (!media.some((m) => m.usage === "hero")) {
    const src = media.find((m) => m.usage === "gallery") ?? media.find((m) => m.usage === "tile");
    if (src) {
      media = [{ ...src, id: `${src.id}-hero`, usage: "hero" }, ...media];
    }
  }

  return { ...business, media };
}
