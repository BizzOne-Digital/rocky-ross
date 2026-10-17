import fs from "fs";
import path from "path";
import type { PublicMedia } from "@/lib/types/public-media";
import { BUSINESS_SLUGS } from "@/lib/business-slugs";
import { getMockupTileMedia } from "@/lib/mockup-tile-images";

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

/** Homepage tiles: single owner mockup photo per business (no rotating gallery). */
export function getTileSlideshowMedia(slug: string, media: PublicMedia[]): PublicMedia[] {
  const mockup = getMockupTileMedia(slug);
  if (mockup) return [mockup];

  const fromDb = media.filter((m) => ["tile", "hero"].includes(m.usage));
  const photo = fromDb.find((m) => m.usage === "tile") ?? fromDb.find((m) => m.usage === "hero");
  if (photo) return [photo];

  const logo = getLocalLogoMedia(slug);
  return logo ? [logo] : [];
}
