import type { BusinessSlug } from "@/lib/business-slugs";
import { HOMEPAGE_TILE_ORDER } from "@/lib/business-tile-copy";

const BASE = "/images/homepage-mockup";

export const HOMEPAGE_MOCKUP = {
  heroBg: `${BASE}/ss-02-hero-bg.jpg`,
  /** Teal smoke vignette (owner SS2) — Find your fun + lower page sections */
  findFunBg: `${BASE}/ss-03-find-fun-bg.jpg`,
  lowerSmokeBg: `${BASE}/ss-03-find-fun-bg.jpg`,
  gardenPhoto: `${BASE}/ss-14-garden.jpg`,
  merchPhoto: `${BASE}/ss-15-merch.jpg`,
  lowerTexture: `${BASE}/ss-17-lower-texture.png`,
  sectionBg: `${BASE}/ss-16-section-bg.jpg`,
  campusPhoto: `${BASE}/ss-18-campus.jpg`,
  footerCollage: `${BASE}/ss-19-footer-collage.png`,
  /** Faint hero watermark (RR) */
  heroRrLogo: "/images/dj/Rocky-Ross-Crest.jpg",
} as const;

const TILE_BY_SLUG: Record<BusinessSlug, string> = {
  "ross-squad-djs-event-rentals": `${BASE}/ss-04-dj.jpg`,
  "old-north-end-tattoos": `${BASE}/ss-05-tattoo.jpg`,
  "el-gringos-tacos": `${BASE}/ss-06-tacos.jpg`,
  "tequila-chilladas-bar": `${BASE}/ss-07-bar.jpg`,
  "trims-barbershop": `${BASE}/ss-08-trims.jpg`,
};

const LOGO_BY_SLUG: Record<BusinessSlug, string> = {
  "ross-squad-djs-event-rentals": `${BASE}/ss-09-logo-dj.png`,
  "old-north-end-tattoos": `${BASE}/ss-10-logo-tattoo.png`,
  "el-gringos-tacos": `${BASE}/ss-11-logo-tacos.png`,
  "tequila-chilladas-bar": `${BASE}/ss-12-logo-bar.png`,
  "trims-barbershop": `${BASE}/ss-13-logo-trims.png`,
};

export function getMockupTileImage(slug: BusinessSlug) {
  return TILE_BY_SLUG[slug];
}

export function getMockupLogoImage(slug: BusinessSlug) {
  return LOGO_BY_SLUG[slug];
}

export const MOCKUP_TILE_SLUGS = HOMEPAGE_TILE_ORDER;
