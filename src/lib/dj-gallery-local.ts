import fs from "fs";
import path from "path";
import type { PublicMedia } from "@/lib/types/public-media";
import { DJ_ASSETS } from "@/lib/dj-page-assets";

const DJ_SLUG = "ross-squad-djs-event-rentals";

function fileExists(publicUrlPath: string): boolean {
  try {
    const rel = publicUrlPath.replace(/^\//, "").replace(/\//g, path.sep);
    return fs.existsSync(path.join(process.cwd(), "public", rel));
  } catch {
    return false;
  }
}

const GALLERY_ORDER: { url: string; alt: string }[] = [
  {
    url: DJ_ASSETS.gallery5238,
    alt: "DJ Rocky Ross mixing at a live event beside illuminated Rocky Ross logo signage",
  },
  {
    url: DJ_ASSETS.gallery5182,
    alt: "DJ Rocky Ross performing at the turntables in a nightclub setting",
  },
  {
    url: DJ_ASSETS.gallery5376,
    alt: "DJ Rocky Ross at a professional controller setup with Ross Squad branding",
  },
];

export function getDjLocalGalleryMedia(): PublicMedia[] {
  return GALLERY_ORDER.filter((g) => fileExists(g.url)).map((g, i) => ({
    id: `local-dj-gallery-${i}`,
    url: g.url,
    width: 1600,
    height: 1200,
    alt: g.alt,
    usage: "gallery",
    sortOrder: i,
    focalX: 50,
    focalY: 45,
    logoFit: "cover",
  }));
}

export function getDjLocalHeroMedia(): PublicMedia | null {
  const first = GALLERY_ORDER[0];
  if (!first || !fileExists(first.url)) return null;
  return {
    id: "local-dj-hero",
    url: first.url,
    width: 1600,
    height: 1200,
    alt: first.alt,
    usage: "hero",
    sortOrder: -2,
    focalX: 50,
    focalY: 40,
    logoFit: "cover",
  };
}

export function isDjBusinessSlug(slug: string): boolean {
  return slug === DJ_SLUG;
}
