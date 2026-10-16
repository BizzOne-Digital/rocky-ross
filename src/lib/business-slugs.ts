export const BUSINESS_SLUGS = [
  "old-north-end-tattoos",
  "el-gringos-tacos",
  "tequila-chilladas-bar",
  "trims-barbershop",
  "ross-squad-djs-event-rentals",
] as const;

export type BusinessSlug = (typeof BUSINESS_SLUGS)[number];
