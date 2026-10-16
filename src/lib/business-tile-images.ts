import { BUSINESS_SLUGS } from "@/lib/business-slugs";
import type { PublicMedia } from "@/lib/types/public-media";

const TILE_ALTS: Record<string, string> = {
  "old-north-end-tattoos": "Tattoo machine and rose sketch at Old North End Tattoos",
  "el-gringos-tacos": "Street-style tacos at El Gringo's Tacos",
  "tequila-chilladas-bar": "Cocktails at Tequila Chillada's Bar",
  "trims-barbershop": "Barber tools at Trims Barbershop",
  "ross-squad-djs-event-rentals": "DJ controller for Ross Squad events",
};

export function getDefaultTileMedia(slug: string): PublicMedia[] {
  if (!BUSINESS_SLUGS.includes(slug as (typeof BUSINESS_SLUGS)[number])) return [];
  return [
    {
      id: `local-tile-${slug}`,
      url: `/images/tiles/${slug}.jpg`,
      width: 1200,
      height: 900,
      alt: TILE_ALTS[slug] ?? "",
      usage: "tile",
      sortOrder: 0,
      focalX: 50,
      focalY: 45,
      logoFit: "cover",
    },
  ];
}

export function withDefaultTileMedia<T extends { slug: string; media: PublicMedia[] }>(business: T): T {
  if (business.media.some((m) => ["tile", "hero", "gallery", "logo"].includes(m.usage))) {
    return business;
  }
  return { ...business, media: getDefaultTileMedia(business.slug) };
}
