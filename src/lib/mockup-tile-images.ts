import fs from "fs";
import path from "path";
import { BUSINESS_SLUGS, type BusinessSlug } from "@/lib/business-slugs";
import type { PublicMedia } from "@/lib/types/public-media";

const TILE_ALTS: Record<BusinessSlug, string> = {
  "ross-squad-djs-event-rentals": "Professional DJ turntable with headphones — Ross Squad DJs",
  "old-north-end-tattoos": "Traditional tattoo flash art — Old North End Tattoos",
  "el-gringos-tacos": "Street-style tacos with salsa and guacamole — El Gringo's Tacos",
  "tequila-chilladas-bar": "Margarita, tequila, and michelada — Tequila Chillada's Bar",
  "trims-barbershop": "Gold clippers, scissors, and barber pole — Trims Barbershop",
};

function fileExists(publicUrlPath: string): boolean {
  try {
    const rel = publicUrlPath.replace(/^\//, "").replace(/\//g, path.sep);
    return fs.existsSync(path.join(process.cwd(), "public", rel));
  } catch {
    return false;
  }
}

/** Owner mockup photography — one image per business at `/images/tiles/{slug}.jpg`. */
export function getMockupTileMedia(slug: string): PublicMedia | null {
  if (!BUSINESS_SLUGS.includes(slug as BusinessSlug)) return null;
  const url = `/images/tiles/${slug}.jpg`;
  if (!fileExists(url)) return null;
  return {
    id: `mockup-tile-${slug}`,
    url,
    width: 1200,
    height: 1500,
    alt: TILE_ALTS[slug as BusinessSlug],
    usage: "tile",
    sortOrder: 0,
    focalX: 50,
    focalY: 50,
    logoFit: "cover",
  };
}

export function getMockupHeroMedia(slug: string): PublicMedia | null {
  const tile = getMockupTileMedia(slug);
  if (!tile) return null;
  return { ...tile, id: `mockup-hero-${slug}`, usage: "hero" };
}
