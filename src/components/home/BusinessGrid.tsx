import { TileSlideshow } from "./TileSlideshow";
import { getTileSlideshowMedia } from "@/lib/business-tile-slides";
import {
  BUSINESS_TILE_COPY,
  BUSINESS_TILE_PRIMARY_NAME,
  HOMEPAGE_TILE_ORDER,
} from "@/lib/business-tile-copy";
import type { BusinessSlug } from "@/lib/business-slugs";

type Business = {
  slug: string;
  name: string;
  shortDescription: string;
  accentColor: string;
  status: string;
  slideshowIntervalMs: number;
  slideshowAutoplay: boolean;
  media: import("@/lib/data/public").PublicMedia[];
};

export function BusinessGrid({ businesses }: { businesses: Business[] }) {
  const bySlug = new Map(businesses.map((b) => [b.slug, b]));

  return (
    <div
      id="businesses"
      className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5 lg:gap-3 xl:gap-4"
    >
      {HOMEPAGE_TILE_ORDER.map((slug, i) => {
        const b = bySlug.get(slug);
        if (!b) return null;
        const slides = getTileSlideshowMedia(b.slug, b.media);
        const copy = BUSINESS_TILE_COPY[slug as BusinessSlug];
        return (
          <TileSlideshow
            key={b.slug}
            slug={b.slug}
            name={copy.tileTitle}
            displayName={BUSINESS_TILE_PRIMARY_NAME[slug as BusinessSlug]}
            description={b.shortDescription}
            headline={copy.headline}
            subheadline={copy.subheadline}
            bullets={copy.bullets}
            ctaLabel={copy.cta}
            accent={b.accentColor}
            status={b.status}
            slides={slides}
            intervalMs={b.slideshowIntervalMs}
            autoplay={b.slideshowAutoplay}
            staggerIndex={i}
          />
        );
      })}
    </div>
  );
}
