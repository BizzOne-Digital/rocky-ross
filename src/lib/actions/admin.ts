"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { connectDb } from "../db";
import { requireAdminSession } from "../auth/session";
import { Business } from "../models/Business";
import { Service } from "../models/Service";
import { Testimonial } from "../models/Testimonial";
import { Inquiry } from "../models/Inquiry";
import { GlobalSettings } from "../models/GlobalSettings";
import { MediaAsset } from "../models/MediaAsset";
import { SlugRedirect } from "../models/SlugRedirect";
import { deleteStoredUploadByUrl, isStoredUploadUrl } from "../uploads/stored-upload";

export async function updateInquiryStatus(id: string, status: string, notes?: string) {
  await requireAdminSession();
  await connectDb();
  await Inquiry.findByIdAndUpdate(id, {
    status,
    ...(notes !== undefined ? { internalNotes: notes } : {}),
  });
  revalidatePath("/admin/inquiries");
}

export async function archiveInquiry(id: string) {
  await requireAdminSession();
  await connectDb();
  await Inquiry.findByIdAndUpdate(id, { archived: true });
  revalidatePath("/admin/inquiries");
}

const businessPatch = z.object({
  id: z.string(),
  name: z.string().min(1),
  slug: z.string().min(1),
  shortDescription: z.string(),
  status: z.enum(["draft", "published", "coming_soon", "open"]),
  accentColor: z.string(),
  heroTitle: z.string(),
  heroSubtitle: z.string(),
  introHtml: z.string(),
  isPublished: z.boolean(),
  tileOrder: z.coerce.number(),
  contactEmail: z.string(),
  contactPhone: z.string(),
  bookingUrl: z.string(),
});

export async function updateBusiness(input: z.infer<typeof businessPatch>) {
  await requireAdminSession();
  const data = businessPatch.parse(input);
  await connectDb();
  const existing = await Business.findById(data.id);
  if (!existing) throw new Error("Not found");
  if (existing.slug !== data.slug) {
    await SlugRedirect.findOneAndUpdate(
      { fromSlug: existing.slug },
      { toSlug: data.slug },
      { upsert: true },
    );
  }
  await Business.findByIdAndUpdate(data.id, {
    name: data.name,
    slug: data.slug,
    shortDescription: data.shortDescription,
    status: data.status,
    accentColor: data.accentColor,
    heroTitle: data.heroTitle,
    heroSubtitle: data.heroSubtitle,
    introHtml: data.introHtml,
    isPublished: data.isPublished,
    tileOrder: data.tileOrder,
    contactEmail: data.contactEmail,
    contactPhone: data.contactPhone,
    bookingUrl: data.bookingUrl,
  });
  revalidatePath("/");
  revalidatePath(`/${data.slug}`);
  revalidatePath("/admin/businesses");
  revalidateTag("businesses", "max");
  revalidateTag(`business-slug-${data.slug}`, "max");
  if (existing.slug !== data.slug) {
    revalidateTag(`business-slug-${existing.slug}`, "max");
  }
}

const servicePatch = z.object({
  id: z.string().optional(),
  businessId: z.string(),
  name: z.string(),
  description: z.string(),
  priceMode: z.enum(["fixed", "starting", "quote", "hidden"]),
  priceMinor: z.union([z.coerce.number(), z.literal("")]).optional(),
  isPublished: z.boolean(),
  imageUrl: z.string().optional().default(""),
});

export async function saveService(input: z.infer<typeof servicePatch>) {
  await requireAdminSession();
  const data = servicePatch.parse(input);
  await connectDb();
  const priceMinor =
    data.priceMinor === "" || data.priceMinor === undefined ? null : data.priceMinor;
  const imageUrl = data.imageUrl ?? "";

  if (data.id) {
    const existing = await Service.findById(data.id).lean();
    if (!existing) throw new Error("Not found");
    const prevUrl = existing.imageUrl ?? "";
    if (prevUrl && prevUrl !== imageUrl && isStoredUploadUrl(prevUrl)) {
      await deleteStoredUploadByUrl(prevUrl);
    }
    await Service.findByIdAndUpdate(data.id, {
      businessId: data.businessId,
      name: data.name,
      description: data.description,
      priceMode: data.priceMode,
      priceMinor,
      isPublished: data.isPublished,
      imageUrl,
    });
  } else {
    await Service.create({
      businessId: data.businessId,
      name: data.name,
      description: data.description,
      priceMode: data.priceMode,
      priceMinor,
      isPublished: data.isPublished,
      imageUrl,
    });
  }
  revalidatePath("/admin/services");
  revalidateTag("businesses", "max");
}

export async function updateTestimonialStatus(id: string, status: "pending" | "approved" | "archived") {
  await requireAdminSession();
  await connectDb();
  await Testimonial.findByIdAndUpdate(id, { status });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  revalidateTag("testimonials", "max");
  revalidateTag("businesses", "max");
}

const testimonialCreate = z.object({
  businessId: z.string().optional(),
  customerName: z.string(),
  quote: z.string(),
  rating: z.coerce.number().optional(),
});

export async function createTestimonial(input: z.infer<typeof testimonialCreate>) {
  await requireAdminSession();
  const data = testimonialCreate.parse(input);
  await connectDb();
  await Testimonial.create({
    ...data,
    businessId: data.businessId || null,
    status: "pending",
  });
  revalidatePath("/admin/testimonials");
}

const settingsPatch = z.object({
  homepageHeadline: z.string(),
  homepageIntro: z.string(),
  contactEmail: z.string(),
  contactPhone: z.string(),
  address: z.string(),
  happyHourNote: z.string(),
  seoDefaultTitle: z.string(),
  seoDefaultDescription: z.string(),
});

export async function updateGlobalSettings(input: z.infer<typeof settingsPatch>) {
  await requireAdminSession();
  const data = settingsPatch.parse(input);
  await connectDb();
  await GlobalSettings.findOneAndUpdate({ singleton: "main" }, data, { upsert: true });
  revalidatePath("/");
  revalidatePath("/admin/settings");
  revalidateTag("global-settings", "max");
}

const mediaCreate = z.object({
  businessId: z.string().optional(),
  usage: z.enum(["logo", "tile", "hero", "gallery", "property", "brand"]),
  cloudinaryPublicId: z.string(),
  url: z.string().url(),
  width: z.coerce.number(),
  height: z.coerce.number(),
  alt: z.string(),
});

export async function registerMediaAsset(input: z.infer<typeof mediaCreate>) {
  await requireAdminSession();
  const data = mediaCreate.parse(input);
  await connectDb();
  await MediaAsset.create({
    ...data,
    businessId: data.businessId || null,
    isPublished: true,
  });
  revalidatePath("/admin/media");
  revalidatePath("/");
  revalidateTag("businesses", "max");
}
