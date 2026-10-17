import type { PublicMedia } from "@/lib/types/public-media";
import { getMockupHeroMedia, getMockupTileMedia } from "@/lib/mockup-tile-images";

const DJ_SLUG = "ross-squad-djs-event-rentals";

export function getDjLocalGalleryMedia(): PublicMedia[] {
  return [];
}

export function getDjLocalHeroMedia(): PublicMedia | null {
  return getMockupHeroMedia(DJ_SLUG) ?? getMockupTileMedia(DJ_SLUG);
}

export function isDjBusinessSlug(slug: string): boolean {
  return slug === DJ_SLUG;
}
