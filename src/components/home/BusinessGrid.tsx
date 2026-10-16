import { TileSlideshow } from "./TileSlideshow";

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
  const ordered = [...businesses].sort((a, b) => (a as { tileOrder?: number }).tileOrder! - (b as { tileOrder?: number }).tileOrder!);

  return (
    <div
      id="businesses"
      className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-[auto_auto_auto] md:gap-5"
    >
      {ordered.map((b, i) => {
        const layout =
          i === 0
            ? "md:col-span-7 md:row-span-2"
            : i === 1 || i === 2
              ? "md:col-span-5"
              : "md:col-span-6";
        return (
          <TileSlideshow
            key={b.slug}
            slug={b.slug}
            name={b.name}
            description={b.shortDescription}
            accent={b.accentColor}
            status={b.status}
            media={b.media}
            intervalMs={b.slideshowIntervalMs}
            autoplay={b.slideshowAutoplay}
            staggerIndex={i}
            featured={i === 0}
            className={layout}
          />
        );
      })}
    </div>
  );
}
