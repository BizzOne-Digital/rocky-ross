import type { BusinessSlug } from "@/lib/business-slugs";

export type BusinessTileCopy = {
  tileTitle: string;
  headline: string;
  /** Optional teal subline (e.g. City Sippers on bar tile). */
  subheadline?: string;
  bullets: string;
  cta: string;
};

/** Homepage tile labels — DJ first; logo lives inside slideshow only. */
export const BUSINESS_TILE_COPY: Record<BusinessSlug, BusinessTileCopy> = {
  "ross-squad-djs-event-rentals": {
    tileTitle: "DJ & Events",
    headline: "Ross Squad DJs",
    bullets: "Weddings · Parties · Rentals",
    cta: "Request a quote",
  },
  "old-north-end-tattoos": {
    tileTitle: "Tattoos",
    headline: "TATTOOS",
    bullets: "Walk-ins · Consultations",
    cta: "Free consultation",
  },
  "el-gringos-tacos": {
    tileTitle: "Tacos",
    headline: "TACOS",
    bullets: "Menu · Order food",
    cta: "View menu",
  },
  "tequila-chilladas-bar": {
    tileTitle: "Tequila & Garden",
    headline: "BAR",
    subheadline: "City Sippers Trail Garden",
    bullets: "Drinks · Patio · Events",
    cta: "Explore",
  },
  "trims-barbershop": {
    tileTitle: "TRIMS",
    headline: "BARBERSHOP",
    bullets: "Opening soon · Haircuts · Fades · Beards",
    cta: "Learn more",
  },
};

/** Display order on homepage (DJ & Events first). */
/** Primary name on homepage tile (mockup hierarchy). */
export const BUSINESS_TILE_PRIMARY_NAME: Record<BusinessSlug, string> = {
  "ross-squad-djs-event-rentals": "DJ Rocky Ross",
  "old-north-end-tattoos": "Old North End",
  "el-gringos-tacos": "El Gringo's",
  "tequila-chilladas-bar": "Tequila Chillada's",
  "trims-barbershop": "TRIMS",
};

export const HOMEPAGE_TILE_ORDER: BusinessSlug[] = [
  "ross-squad-djs-event-rentals",
  "old-north-end-tattoos",
  "el-gringos-tacos",
  "tequila-chilladas-bar",
  "trims-barbershop",
];
