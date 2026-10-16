import { unstable_cache } from "next/cache";
import { connectDb } from "../db";
import { hasMongo } from "../env";
import { PREVIEW_BUSINESSES, PREVIEW_SETTINGS } from "../seed-data";
import { Business } from "../models/Business";
import { GlobalSettings } from "../models/GlobalSettings";
import { MediaAsset } from "../models/MediaAsset";
import { Service } from "../models/Service";
import { MenuCategory } from "../models/MenuCategory";
import { MenuItem } from "../models/MenuItem";
import { Testimonial } from "../models/Testimonial";
import { TeamMember } from "../models/TeamMember";
import { Event } from "../models/Event";
import { SlugRedirect } from "../models/SlugRedirect";
import { RESERVED_SLUGS } from "../constants";
import { enrichBusinessMedia } from "../business-gallery-local";

const CACHE_SECONDS = 3600;

import type { PublicMedia } from "../types/public-media";

export type { PublicMedia };

function mapMedia(m: {
  _id: unknown;
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  usage?: string;
  sortOrder?: number;
  focalX?: number;
  focalY?: number;
  logoFit?: string;
}): PublicMedia {
  return {
    id: String(m._id),
    url: m.url,
    width: m.width ?? 1200,
    height: m.height ?? 800,
    alt: m.alt ?? "",
    usage: m.usage ?? "gallery",
    sortOrder: m.sortOrder ?? 0,
    focalX: m.focalX ?? 50,
    focalY: m.focalY ?? 50,
    logoFit: m.logoFit ?? "contain",
  };
}

async function loadGlobalSettings() {
  await connectDb();
  const doc = await GlobalSettings.findOne({ singleton: "main" }).lean();
  if (!doc) return PREVIEW_SETTINGS;
  return {
    brandName: doc.brandName,
    destinationName: doc.destinationName,
    tagline: doc.tagline,
    address: doc.address,
    contactEmail: doc.contactEmail,
    contactPhone: doc.contactPhone,
    homepageEyebrow: doc.homepageEyebrow,
    homepageHeadline: doc.homepageHeadline,
    homepageIntro: doc.homepageIntro,
    seoDefaultTitle: doc.seoDefaultTitle,
    seoDefaultDescription: doc.seoDefaultDescription,
    palette: doc.palette,
    recognitions: (doc.recognitions ?? []).filter((r) => r.verified),
    social: doc.social,
    happyHourNote: doc.happyHourNote ?? "",
    menuPdfUrl: doc.menuPdfUrl ?? "",
  };
}

const getGlobalSettingsCached = unstable_cache(loadGlobalSettings, ["global-settings"], {
  tags: ["global-settings"],
  revalidate: CACHE_SECONDS,
});

export async function getGlobalSettings() {
  if (!hasMongo()) return PREVIEW_SETTINGS;
  return getGlobalSettingsCached();
}

async function loadPublishedBusinesses() {
  await connectDb();
  const businesses = await Business.find({ isPublished: true })
    .sort({ tileOrder: 1 })
    .lean();
  const ids = businesses.map((b) => b._id);
  const media = await MediaAsset.find({
    businessId: { $in: ids },
    isPublished: true,
    usage: { $in: ["logo", "tile", "hero", "gallery"] },
  })
    .sort({ sortOrder: 1 })
    .lean();
  return businesses.map((b) => ({
    id: String(b._id),
    slug: b.slug,
    name: b.name,
    shortDescription: b.shortDescription,
    template: b.template,
    accentColor: b.accentColor,
    status: b.status,
    tileOrder: b.tileOrder,
    slideshowIntervalMs: b.slideshowIntervalMs,
    slideshowAutoplay: b.slideshowAutoplay,
    heroEyebrow: b.heroEyebrow,
    heroTitle: b.heroTitle,
    heroSubtitle: b.heroSubtitle,
    introHtml: b.introHtml,
    seoTitle: b.seoTitle,
    seoDescription: b.seoDescription,
    contactEmail: b.contactEmail,
    contactPhone: b.contactPhone,
    bookingUrl: b.bookingUrl,
    social: b.social,
    hours: b.hours,
    hourNotes: b.hourNotes,
    media: media
      .filter((m) => String(m.businessId) === String(b._id))
      .map(mapMedia),
  })).map((b) => enrichBusinessMedia(b));
}

const getPublishedBusinessesCached = unstable_cache(loadPublishedBusinesses, ["published-businesses-v2"], {
  tags: ["businesses"],
  revalidate: CACHE_SECONDS,
});

export async function getPublishedBusinesses() {
  if (!hasMongo()) {
    return PREVIEW_BUSINESSES.map((b) =>
      enrichBusinessMedia({ ...b, media: [] as PublicMedia[] }),
    );
  }
  return getPublishedBusinessesCached();
}

async function loadBusinessSlug(slug: string) {
  await connectDb();
  const redirect = await SlugRedirect.findOne({ fromSlug: slug }).lean();
  if (redirect) {
    return { business: null, redirect: redirect.toSlug };
  }
  const b = await Business.findOne({ slug, isPublished: true }).lean();
  if (!b) return null;
  const media = await MediaAsset.find({
    businessId: b._id,
    isPublished: true,
  })
    .sort({ sortOrder: 1 })
    .lean();
  const [services, categories, items, testimonials, team, events] = await Promise.all([
    Service.find({ businessId: b._id, isPublished: true, archived: false })
      .sort({ sortOrder: 1 })
      .lean(),
    MenuCategory.find({ businessId: b._id, isPublished: true }).sort({ sortOrder: 1 }).lean(),
    MenuItem.find({ businessId: b._id, isPublished: true }).sort({ sortOrder: 1 }).lean(),
    Testimonial.find({ businessId: b._id, status: "approved" }).sort({ sortOrder: 1 }).lean(),
    TeamMember.find({ businessId: b._id, isPublished: true }).sort({ sortOrder: 1 }).lean(),
    Event.find({ businessId: b._id, isPublished: true }).sort({ startsAt: 1 }).lean(),
  ]);
  return {
    business: enrichBusinessMedia({
      id: String(b._id),
      slug: b.slug,
      name: b.name,
      shortDescription: b.shortDescription,
      template: b.template,
      accentColor: b.accentColor,
      status: b.status,
      heroEyebrow: b.heroEyebrow,
      heroTitle: b.heroTitle,
      heroSubtitle: b.heroSubtitle,
      introHtml: b.introHtml,
      seoTitle: b.seoTitle,
      seoDescription: b.seoDescription,
      contactEmail: b.contactEmail,
      contactPhone: b.contactPhone,
      bookingUrl: b.bookingUrl,
      social: b.social,
      hours: b.hours,
      hourNotes: b.hourNotes,
      media: media.map(mapMedia),
      services,
      categories,
      menuItems: items,
      testimonials,
      team,
      events,
    }),
    redirect: null,
  };
}

export async function resolveBusinessSlug(slug: string) {
  if (RESERVED_SLUGS.has(slug)) return null;
  if (!hasMongo()) {
    const preview = PREVIEW_BUSINESSES.find((b) => b.slug === slug);
    if (!preview) return null;
    return {
      business: enrichBusinessMedia({ ...preview, media: [] as PublicMedia[] }),
      redirect: null,
    };
  }
  const cached = unstable_cache(() => loadBusinessSlug(slug), ["business-slug", slug], {
    tags: ["businesses", `business-slug-${slug}`],
    revalidate: CACHE_SECONDS,
  });
  return cached();
}

async function loadBrandTestimonials() {
  await connectDb();
  return Testimonial.find({ businessId: null, status: "approved" })
    .sort({ sortOrder: 1 })
    .lean();
}

const getBrandTestimonialsCached = unstable_cache(loadBrandTestimonials, ["brand-testimonials"], {
  tags: ["testimonials"],
  revalidate: CACHE_SECONDS,
});

export async function getApprovedBrandTestimonials() {
  if (!hasMongo()) return [];
  return getBrandTestimonialsCached();
}
