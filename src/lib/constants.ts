export const BRAND = {
  parent: "Rocky Ross Productions",
  destination: "Inked & Infused",
  tagline: "TATTOOS • TACOS • TEQUILA",
  address: {
    line1: "2125 N Weber St.",
    city: "Colorado Springs",
    state: "Colorado",
    full: "2125 N Weber St., Colorado Springs, Colorado",
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

/** Seven core public routes: hub, destination about, and five businesses. */
export const CORE_PUBLIC_PAGES = [
  { path: "/", label: "The Hub" },
  { path: "/about", label: "About Inked & Infused" },
  { path: "/old-north-end-tattoos", label: "Old North End Tattoos" },
  { path: "/el-gringos-tacos", label: "El Gringo's Tacos" },
  { path: "/tequila-chilladas-bar", label: "Tequila Chillada's Bar" },
  { path: "/trims-barbershop", label: "Trims Barbershop" },
  { path: "/ross-squad-djs-event-rentals", label: "Ross Squad DJs + Event EQ Rentals" },
] as const;

export const INQUIRY_STATUSES = [
  "new",
  "contacted",
  "awaiting_details",
  "confirmed",
  "completed",
  "cancelled",
] as const;
