import { getDefaultTileMedia } from "@/lib/business-tile-images";
import type { PublicMedia } from "@/lib/types/public-media";
import { getMockupHeroMedia } from "@/lib/mockup-tile-images";

/** Gallery sections removed sitewide — no local gallery files injected. */
export function getLocalGalleryMedia(): PublicMedia[] {
  return [];
}

export function enrichBusinessMedia<T extends { slug: string; media: PublicMedia[] }>(business: T): T {
  let media = business.media.filter((m) => m.usage !== "gallery");

  const mockupHero = getMockupHeroMedia(business.slug);
  if (mockupHero) {
    media = media.filter((m) => m.usage !== "hero" && m.usage !== "tile");
    media = [mockupHero, ...media];
  } else {
    const hasBranding = media.some((m) => ["tile", "hero", "logo"].includes(m.usage));
    if (!hasBranding) {
      media = [...getDefaultTileMedia(business.slug), ...media];
    }
    if (!media.some((m) => m.usage === "hero")) {
      const src = media.find((m) => m.usage === "tile");
      if (src) {
        media = [{ ...src, id: `${src.id}-hero`, usage: "hero" }, ...media];
      }
    }
  }

  return { ...business, media };
}
