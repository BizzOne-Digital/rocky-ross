/** Trimmed campus hub logo (header / footer). */
export const CAMPUS_LOGO_SRC = "/images/logos/inked-infused-campus-logo-trimmed.png";

export const BRAND = {
  parent: "Rocky Ross Productions",
  destination: "Inked & Infused",
  tagline: "TRIMS • TATTOOS • TACOS • TEQUILA • TUNES",
  address: {
    line1: "2125 N Weber St.",
    city: "Colorado Springs",
    state: "Colorado",
    full: "2125 N Weber St., Colorado Springs, CO 80907",
  },
  defaultEmail: "rockyrosscreations@gmail.com",
  defaultPhone: "+17193217262",
  timezone: "America/Denver",
} as const;

export const PALETTE = {
  ink: "#101010",
  ivory: "#F4F0E8",
  burgundy: "#782C40",
  brass: "#B79B67",
} as const;

export const RESERVED_SLUGS = new Set([
  "admin",
  "api",
  "about",
  "contact",
  "visit",
  "login",
  "logout",
  "_next",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
]);

export { BUSINESS_SLUGS, type BusinessSlug } from "./business-slugs";

/** Six public pages: landing hub + five businesses. */
export const CORE_PUBLIC_PAGES = [
  { path: "/", label: "Home" },
  { path: "/ross-squad-djs-event-rentals", label: "DJ & Events" },
  { path: "/old-north-end-tattoos", label: "Old North End Tattoos" },
  { path: "/trims-barbershop", label: "TRIMS Barbershop" },
  { path: "/el-gringos-tacos", label: "El Gringo's Tacos" },
  { path: "/tequila-chilladas-bar", label: "Tequila & City Sippers Trail Garden" },
] as const;

export const INQUIRY_STATUSES = [
  "new",
  "contacted",
  "awaiting_details",
  "confirmed",
  "completed",
  "cancelled",
] as const;
