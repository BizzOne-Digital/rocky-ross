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
  contactEmail: "rockyrosscreations@gmail.com",
  contactPhone: "+17196944266",
  homepageEyebrow: "ROCKY ROSS PRODUCTIONS PRESENTS",
  homepageHeadline: "TATTOOS. TACOS. TEQUILA.",
  homepageIntro:
    "Inked & Infused at 2125 N Weber St., Colorado Springs — tattoos, tacos, tequila, trims, and Ross Squad DJs & event rentals under one roof.",
  seoDefaultTitle: `${BRAND.parent} | ${BRAND.destination}`,
  seoDefaultDescription:
    "Inked & Infused in Colorado Springs — tattoos, tacos, tequila, trims, and Ross Squad DJs & event rentals.",
  palette: PALETTE,
  recognitions: [] as { title: string; description: string; url: string; verified: boolean }[],
  social: {
    instagram: "https://www.instagram.com/inkedandinfusedcos",
    facebook: "",
    tiktok: "",
  },
  happyHourNote: "",
  menuPdfUrl: "",
};

export const PREVIEW_BUSINESSES: PreviewBusiness[] = [
  {
    id: "preview-tattoos",
    slug: "old-north-end-tattoos",
    name: "Old North End Tattoos LLC",
    shortDescription: "Free consultations, walk-ins welcome, and appointments — custom tattooing at Inked & Infused.",
    template: "tattoo",
    accentColor: "#8B3A4A",
    status: "open",
    tileOrder: 1,
    slideshowIntervalMs: 6000,
    slideshowAutoplay: true,
    heroEyebrow: "OLD NORTH END TATTOOS LLC",
    heroTitle: "Old North End Tattoos LLC",
    heroSubtitle:
      "Free consultations • Walk-ins welcome • Appointments available",
    introHtml:
      '<p>Welcome to Old North End Tattoos—a clean, friendly, professional shop with a humble, open-minded team. We welcome people from all walks of life into a safe, judgment-free space. We care about great tattoos, memorable experiences, and making you feel comfortable from your first conversation through aftercare.</p><p>We&apos;re part of <strong>Inked &amp; Infused</strong>: tattoos, trims, tacos, tequila, and more—all under one roof. Family-friendly campus spaces and pet-friendly patios are available elsewhere on the property; pets do not belong in tattoo procedure areas.</p><p>The bar, restaurant, beer garden and patios are <strong>21+ after 9 PM</strong>.</p>',
    seoTitle: "Old North End Tattoos LLC | Inked & Infused",
    seoDescription:
      "Old North End Tattoos LLC at Inked & Infused — free consultations, walk-ins, appointments. Call 719 321 7262.",
  },
  {
    id: "preview-tacos",
    slug: "el-gringos-tacos",
    name: "El Gringo's Tacos",
    shortDescription: "Food menu, photos, hours, specials, and restaurant information on property.",
    template: "food",
    accentColor: "#C45C26",
    status: "open",
    tileOrder: 2,
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
    name: "Tequila Chillada's Bar / City Sippers Trail Garden",
    shortDescription:
      "Bar, garden, pet-friendly patios, cigar lounge (call ahead), drinks, entertainment, and campus events.",
    template: "bar",
    accentColor: "#5C3D6E",
    status: "open",
    tileOrder: 3,
    slideshowIntervalMs: 7000,
    slideshowAutoplay: true,
    heroEyebrow: "POUR & STAY",
    heroTitle: "Tequila Chillada's Bar / City Sippers Trail Garden",
    heroSubtitle: "Tequila-led drinks and good nights.",
    introHtml:
      "<p>Tequila Chillada&apos;s Bar and City Sippers Trail Garden at Inked &amp; Infused — tequila-forward cocktails, pet-friendly patios, and the cigar lounge (call ahead for availability). Family-friendly hospitality before 9 PM; bar, restaurant, garden and all patios are 21+ after 9 PM.</p><p>Weekly programming, drink menus and tequila selections publish here when current approved masters are on file — not placeholder prices or invented schedules.</p><p>Private events, group inquiries and campus VIP updates: use the inquiry form or voluntary VIP text opt-in on this page. Valid ID required for alcohol service.</p>",
    seoTitle: "Tequila Chillada's Bar | Inked & Infused",
    seoDescription: "Tequila and cocktails at Inked & Infused, Colorado Springs.",
  },
  {
    id: "preview-barber",
    slug: "trims-barbershop",
    name: "Trims Barbershop",
    shortDescription: "Haircuts, barber info, hours, pricing, booking, and contact — opening status in admin.",
    template: "barber",
    accentColor: "#4A5D4F",
    status: "coming_soon",
    tileOrder: 4,
    slideshowIntervalMs: 6200,
    slideshowAutoplay: true,
    heroEyebrow: "FRESH CUTS",
    heroTitle: "TRIMS Barbershop",
    heroSubtitle: "Grooming at Inked & Infused.",
    introHtml:
      "<p>Trims Barbershop is bringing classic barber craft to the Inked & Infused campus — sharp lines, clean fades, and grooming that matches the creative energy of the property.</p><p>We are preparing the chair experience now: services, barber profiles, and booking links will appear on this page the moment the team publishes them. We do not list fake opening dates or prices.</p><p>Already part of the destination? Watch here for status updates, or send a general question through the inquiry form and we will route it to the Trims crew.</p>",
    seoTitle: "Trims Barbershop | Inked & Infused",
    seoDescription: "Barbershop at Inked & Infused, Colorado Springs.",
  },
  {
    id: "preview-dj",
    slug: "ross-squad-djs-event-rentals",
    name: "DJ Rocky Ross / Ross Squad DJs",
    shortDescription:
      "Award-winning DJ & MC entertainment, event production, rentals, lessons, custom mixes and mentorship — Colorado Springs and beyond.",
    template: "events",
    accentColor: "#B79B67",
    status: "open",
    tileOrder: 0,
    slideshowIntervalMs: 6800,
    slideshowAutoplay: true,
    heroEyebrow: "DJ ROCKY ROSS · ROSS SQUAD DJS",
    heroTitle: "DJ Rocky Ross",
    heroSubtitle:
      "Award-winning entertainment. Over 30 years of DJ experience. Music for your crowd. Production for your vision.",
    introHtml:
      "<p>From weddings and private celebrations to corporate events and nightlife, we bring the music, sound, lighting and creative support together around your event.</p><p><strong>One team. A custom event package.</strong></p>",
    seoTitle: "DJ Rocky Ross & Ross Squad DJs | Rocky Ross Productions",
    seoDescription:
      "Award-winning DJ, MC, event production and equipment rentals in Colorado Springs. Custom packages for weddings, corporate and nightlife.",
  },
];
