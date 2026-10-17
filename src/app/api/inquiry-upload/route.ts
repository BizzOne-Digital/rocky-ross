import { randomBytes } from "crypto";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { hasMongo } from "@/lib/env";
import { StoredUpload } from "@/lib/models/StoredUpload";
import { consumeRateLimit } from "@/lib/rate-limit";
import { ALLOWED_UPLOAD_MIMES, MAX_UPLOAD_BYTES } from "@/lib/uploads/constants";
import { buildStoredUploadPublicUrl } from "@/lib/uploads/stored-upload";

const INQUIRY_FOLDER = "misc";

export async function POST(req: Request) {
  if (!hasMongo()) {
    return NextResponse.json({ error: "Uploads require database connection" }, { status: 503 });
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rate = await consumeRateLimit(`inquiry-upload:${ip}`, 12, 60 * 60 * 1000);
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many uploads. Try again later." }, { status: 429 });
  }

  const form = await req.formData();
  if (String(form.get("company") ?? "")) {
    return NextResponse.json({ url: "" });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const mimeType = file.type;
  const ext = ALLOWED_UPLOAD_MIMES[mimeType];
  if (!ext) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: "File exceeds 8MB limit" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `inquiry-${Date.now()}-${randomBytes(6).toString("hex")}.${ext}`;

  await connectDb();
  await StoredUpload.create({
    folder: INQUIRY_FOLDER,
    filename,
    mimeType,
    size: file.size,
    data: buffer,
  });

  return NextResponse.json({ url: buildStoredUploadPublicUrl(INQUIRY_FOLDER, filename) });
}
