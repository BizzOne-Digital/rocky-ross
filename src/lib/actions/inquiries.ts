"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { connectDb } from "../db";
import { hasMongo } from "../env";
import { sendNotificationEmail } from "../email";
import { consumeRateLimit } from "../rate-limit";
import { Inquiry } from "../models/Inquiry";
import { Business } from "../models/Business";

const schema = z.object({
  type: z.enum(["general", "tattoo", "barber", "dj_event", "bar_event", "food"]),
  businessSlug: z.string().optional(),
  businessId: z.string().optional(),
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional(),
  payload: z.record(z.string(), z.string()).optional(),
  honeypot: z.string().optional(),
});

export async function submitInquiry(input: z.infer<typeof schema>) {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Please check your entries and try again." };
  }
  if (parsed.data.honeypot) {
    return { ok: true, message: "Thank you — your request was received." };
  }
  if (!hasMongo()) {
    return {
      ok: false,
      message:
        "Preview mode: connect MongoDB to save inquiries. Your message was not stored.",
    };
  }

  const rate = await consumeRateLimit(`inquiry:${parsed.data.email}`, 8, 60 * 60 * 1000);
  if (!rate.allowed) {
    return { ok: false, message: "Too many requests. Please try again later." };
  }

  await connectDb();
  let businessId = parsed.data.businessId;
  if (!businessId && parsed.data.businessSlug) {
    const b = await Business.findOne({ slug: parsed.data.businessSlug }).lean();
    if (b) businessId = String(b._id);
  }

  const doc = await Inquiry.create({
    type: parsed.data.type,
    businessId,
    businessSlug: parsed.data.businessSlug,
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone ?? "",
    payload: parsed.data.payload ?? {},
    status: "new",
  });

  const emailResult = await sendNotificationEmail(
    `New ${parsed.data.type} inquiry — ${parsed.data.name}`,
    JSON.stringify(doc.toObject(), null, 2),
  );

  if (!emailResult.sent) {
    doc.emailSent = false;
    doc.emailError = emailResult.error ?? "unknown";
    await doc.save();
    revalidatePath("/admin/inquiries");
    return {
      ok: true,
      message:
        "Your request was received and saved. Email notification could not be sent — our team will still follow up.",
    };
  }

  doc.emailSent = true;
  await doc.save();
  revalidatePath("/admin/inquiries");
  return {
    ok: true,
    message: "Thank you — your request was received. This is not a confirmed booking.",
  };
}
