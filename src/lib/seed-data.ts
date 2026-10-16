import { BRAND, PALETTE } from "./constants";

export type PreviewBusiness = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  template: "tattoo" | "food" | "bar" | "barber" | "events";
  accentColor: string;
  status: "published" | "coming_soon" | "open" | "draft";
  tileOrder: number;
  slideshowIntervalMs: number;
  slideshowAutoplay: boolean;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  introHtml: string;
  seoTitle: string;
  seoDescription: string;
};

export const PREVIEW_SETTINGS = {
  brandName: BRAND.parent,
  destinationName: BRAND.destination,
  tagline: BRAND.tagline,
  address: BRAND.address.full,
  contactEmail: BRAND.defaultEmail,
  contactPhone: BRAND.defaultPhone,
  homepageEyebrow: "ROCKY ROSS PRODUCTIONS PRESENTS",
  homepageHeadline: "TATTOOS. TACOS. TEQUILA.",
  homepageIntro:
    "Meet Inked & Infused — a Colorado Springs destination for ink, flavor, drinks, and fresh cuts, with DJ services and event rentals from Ross Squad.",
  seoDefaultTitle: `${BRAND.parent} | ${BRAND.destination}`,
  seoDefaultDescription:
    "Inked & Infused in Colorado Springs — tattoos, tacos, tequila, trims, and Ross Squad DJs & event rentals.",
  palette: PALETTE,
  recognitions: [] as { title: string; description: string; url: string; verified: boolean }[],
  social: { instagram: "", facebook: "", tiktok: "" },
  happyHourNote: "",
  menuPdfUrl: "",
};

export const PREVIEW_BUSINESSES: PreviewBusiness[] = [
  {
    id: "preview-tattoos",
    slug: "old-north-end-tattoos",
    name: "Old North End Tattoos",
    shortDescription: "Custom tattooing at Inked & Infused — consultation-first, walk-ins when available.",
    template: "tattoo",
    accentColor: "#8B3A4A",
    status: "open",
    tileOrder: 0,
    slideshowIntervalMs: 6000,
    slideshowAutoplay: true,
    heroEyebrow: "INKED & INFUSED",
    heroTitle: "Old North End Tattoos",
    heroSubtitle: "Custom work. Consultation requests welcome.",
    introHtml:
      "<p>Old North End Tattoos brings focused, custom tattooing to the Inked & Infused destination on N Weber St. in Colorado Springs. We work one client at a time with a consultation-first mindset — so your piece fits your skin, your story, and your comfort level.</p><p>Walk-ins are welcome when an artist has availability; otherwise, send a request with your idea, placement, and approximate size. Submitting the form starts a conversation — it does not lock in an appointment until our team confirms with you.</p><p>Whether you are planning your first tattoo or adding to a collection, expect honest guidance on timing, healing, and design. Hours and artist schedules on this page update when the shop publishes them in admin.</p>",
    seoTitle: "Old North End Tattoos | Inked & Infused",
    seoDescription: "Custom tattooing at Inked & Infused, Colorado Springs.",
  },
  {
    id: "preview-tacos",
    slug: "el-gringos-tacos",
    name: "El Gringo's Tacos",
    shortDescription: "Bold flavors and street-style tacos — the heart of the Inked & Infused experience.",
    template: "food",
    accentColor: "#C45C26",
    status: "open",
    tileOrder: 1,
    slideshowIntervalMs: 6500,
    slideshowAutoplay: true,
    heroEyebrow: "FLAVOR FORWARD",
    heroTitle: "El Gringo's Tacos",
    heroSubtitle: "Tacos worth the trip.",
    introHtml:
      "<p>El Gringo's Tacos is the flavor anchor of Inked & Infused — street-style tacos and bold plates meant for sharing, grabbing between appointments, or settling in after a night at the bar.</p><p>Our menu is organized by category so you can scan quickly: signatures, classics, and rotating specials when the kitchen marks them live. We do not publish placeholder prices — what you see here is what the team has confirmed.</p><p>Pull up to the same address as tattoos, tequila, and trims. Ask about sold-out items at the window; this page reflects real-time updates when staff enter them.</p>",
    seoTitle: "El Gringo's Tacos | Inked & Infused",
    seoDescription: "Tacos at Inked & Infused, Colorado Springs.",
  },
  {
    id: "preview-bar",
    slug: "tequila-chilladas-bar",
    name: "Tequila Chillada's Bar",
    shortDescription: "Tequila, cocktails, and the chillada energy — on-property at Inked & Infused.",
    template: "bar",
    accentColor: "#5C3D6E",
    status: "open",
    tileOrder: 2,
    slideshowIntervalMs: 7000,
    slideshowAutoplay: true,
    heroEyebrow: "POUR & STAY",
    heroTitle: "Tequila Chillada's Bar",
    heroSubtitle: "Tequila-led drinks and good nights.",
    introHtml:
      "<p>Tequila Chillada's Bar is the pour-and-stay corner of Inked & Infused — tequila-forward cocktails, chillada energy, and a social room that pairs naturally with tacos from El Gringo's.</p><p>Drink lists and features appear here category by category once the bar team publishes them. Happy hour notes and promotions show in the banner when verified — never guessed from a template.</p><p>Planning a private pour or on-property event? Use the inquiry form below. Valid ID required; we follow local service regulations and responsible hospitality.</p>",
    seoTitle: "Tequila Chillada's Bar | Inked & Infused",
    seoDescription: "Tequila and cocktails at Inked & Infused, Colorado Springs.",
  },
  {
    id: "preview-barber",
    slug: "trims-barbershop",
    name: "Trims Barbershop",
    shortDescription: "Sharp cuts and grooming — opening status managed in admin.",
    template: "barber",
    accentColor: "#4A5D4F",
    status: "coming_soon",
    tileOrder: 3,
    slideshowIntervalMs: 6200,
    slideshowAutoplay: true,
    heroEyebrow: "FRESH CUTS",
    heroTitle: "Trims Barbershop",
    heroSubtitle: "Grooming at Inked & Infused.",
    introHtml:
      "<p>Trims Barbershop is bringing classic barber craft to the Inked & Infused campus — sharp lines, clean fades, and grooming that matches the creative energy of the property.</p><p>We are preparing the chair experience now: services, barber profiles, and booking links will appear on this page the moment the team publishes them. We do not list fake opening dates or prices.</p><p>Already part of the destination? Watch here for status updates, or send a general question through the inquiry form and we will route it to the Trims crew.</p>",
    seoTitle: "Trims Barbershop | Inked & Infused",
    seoDescription: "Barbershop at Inked & Infused, Colorado Springs.",
  },
  {
    id: "preview-dj",
    slug: "ross-squad-djs-event-rentals",
    name: "Ross Squad DJs + Event EQ Rentals",
    shortDescription: "Weddings, private parties, corporate events, and nightlife — DJs and gear across Colorado.",
    template: "events",
    accentColor: "#B79B67",
    status: "open",
    tileOrder: 4,
    slideshowIntervalMs: 6800,
    slideshowAutoplay: true,
    heroEyebrow: "BEYOND THE PROPERTY",
    heroTitle: "Ross Squad DJs + Event EQ Rentals",
    heroSubtitle: "Sound, lighting, and DJs for your event — not only on-site.",
    introHtml:
      "<p>Ross Squad DJs + Event EQ Rentals is Rocky Ross Productions' events arm — weddings, private parties, corporate functions, and nightlife across Colorado Springs and beyond. Your venue is not limited to Inked & Infused; we travel with the rig.</p><p>Tell us your date, location, guest count, and whether you need a DJ, sound and lighting, or full production. Packages and rates display here only after they are confirmed in admin — inquiries start a conversation, not a hold on the calendar.</p><p>From intimate celebrations to high-energy dance floors, we bring personality, reliable gear, and the production muscle to match your night.</p>",
    seoTitle: "Ross Squad DJs & Event Rentals | Rocky Ross Productions",
    seoDescription: "DJ services and event equipment rentals from Rocky Ross Productions.",
  },
];
