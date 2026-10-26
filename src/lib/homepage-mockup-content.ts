import type { BusinessSlug } from "@/lib/business-slugs";
import { HOMEPAGE_TILE_ORDER } from "@/lib/business-tile-copy";

export const HOMEPAGE_HERO_INTRO =
  "Yes, we do a lot, but I assure you, our talented teams bring so much professional passion and creative delivery to everything we offer.";

export const HOMEPAGE_SERVICE_CARDS_INTRO =
  "Simply click the service you're interested in for all details.";

export type HomepageHoursBlock = {
  slug: BusinessSlug;
  title: string;
  lines: string[];
  note?: string;
};

/** Hours mirrored from business pages — each business keeps its own schedule. */
export const HOMEPAGE_BUSINESS_HOURS: HomepageHoursBlock[] = [
  {
    slug: "old-north-end-tattoos",
    title: "Old North End Tattoos",
    lines: [
      "Monday–Thursday: 11:00 AM – 9:00 PM",
      "Friday–Saturday: 11:00 AM – 10:00 PM",
      "Sunday: 11:00 AM – 7:00 PM",
    ],
    note: "Hours may vary for weather and holidays; call ahead.",
  },
  {
    slug: "trims-barbershop",
    title: "TRIMS Barbershop",
    lines: ["Planned: Tuesday–Saturday 10:30 AM – 7:00 PM"],
    note: "Opening soon — watch this page for updates.",
  },
  {
    slug: "el-gringos-tacos",
    title: "El Gringo's Tacos (kitchen)",
    lines: [
      "Tuesday–Thursday: 4:00 PM – 8:30 PM",
      "Friday–Saturday: 4:00 PM – 9:00 PM",
      "Sunday & Monday: Closed (regular schedule)",
    ],
  },
  {
    slug: "tequila-chilladas-bar",
    title: "Tequila Chillada's Bar / City Sippers",
    lines: [
      "Tuesday–Thursday: 3:00 PM – 11:30 PM",
      "Friday–Saturday: 3:00 PM – 2:00 AM (following morning)",
      "Sunday & Monday: Closed except separately dated events",
    ],
    note: "Beer garden & cigar lounge — call ahead for cigar lounge availability.",
  },
  {
    slug: "ross-squad-djs-event-rentals",
    title: "DJ Rocky Ross / Ross Squad DJs",
    lines: ["Events & rentals by appointment"],
    note: "Call 719-321-7262 to discuss date, location, hours, and gear.",
  },
];

export type BusinessReviewLinks = {
  label: string;
  google: string;
  facebook: string;
  yelp: string;
};

const mapsSearch = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const yelpSearch = (name: string) =>
  `https://www.yelp.com/search?find_desc=${encodeURIComponent(name)}&find_loc=${encodeURIComponent("Colorado Springs, CO")}`;

/** Owner can replace with exact listing URLs when available. */
export const HOMEPAGE_REVIEW_LINKS: Record<BusinessSlug, BusinessReviewLinks> = {
  "old-north-end-tattoos": {
    label: "Old North End Tattoos",
    google: mapsSearch("Old North End Tattoos 2123 N Weber Colorado Springs"),
    facebook: "https://www.facebook.com/inkedandinfusedcos",
    yelp: yelpSearch("Old North End Tattoos"),
  },
  "trims-barbershop": {
    label: "TRIMS Barbershop",
    google: mapsSearch("TRIMS Barbershop Inked and Infused Colorado Springs"),
    facebook: "https://www.facebook.com/inkedandinfusedcos",
    yelp: yelpSearch("TRIMS Barbershop Colorado Springs"),
  },
  "el-gringos-tacos": {
    label: "El Gringo's Tacos",
    google: mapsSearch("El Gringo's Tacos 2125 N Weber Colorado Springs"),
    facebook: "https://www.facebook.com/inkedandinfusedcos",
    yelp: yelpSearch("El Gringo's Tacos Colorado Springs"),
  },
  "tequila-chilladas-bar": {
    label: "Tequila Chillada's / City Sippers",
    google: mapsSearch("Tequila Chillada's Bar Inked and Infused Colorado Springs"),
    facebook: "https://www.facebook.com/inkedandinfusedcos",
    yelp: yelpSearch("Tequila Chillada's Colorado Springs"),
  },
  "ross-squad-djs-event-rentals": {
    label: "DJ Rocky Ross / Ross Squad DJs",
    google: mapsSearch("Rocky Ross Productions Colorado Springs DJ"),
    facebook: "https://www.facebook.com/inkedandinfusedcos",
    yelp: yelpSearch("Rocky Ross DJ Colorado Springs"),
  },
};

export const HOMEPAGE_REVIEW_BUSINESS_ORDER = HOMEPAGE_TILE_ORDER;

export const HOMEPAGE_CAMPUS_FACEBOOK = "https://www.facebook.com/inkedandinfusedcos";

export const HOMEPAGE_VIP_SMS_EXAMPLE = "VIP Tacos Alex April 5";
