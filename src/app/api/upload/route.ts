import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { connectDb } from "@/lib/db";
import { hasMongo } from "@/lib/env";
import { StoredUpload } from "@/lib/models/StoredUpload";
import {
  ALLOWED_UPLOAD_MIMES,
  MAX_UPLOAD_BYTES,
  UPLOAD_FOLDERS,
  type UploadFolder,
} from "@/lib/uploads/constants";
import {
  buildStoredUploadPublicUrl,
  deleteStoredUploadByUrl,
} from "@/lib/uploads/stored-upload";

function isUploadFolder(value: string): value is UploadFolder {
  return (UPLOAD_FOLDERS as readonly string[]).includes(value);
}

export async function POST(req: Request) {
  if (!hasMongo()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const folderRaw = String(form.get("folder") ?? "");
  const file = form.get("file");

  if (!isUploadFolder(folderRaw)) {
    return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
  }
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
  const filename = `${Date.now()}-${randomBytes(8).toString("hex")}.${ext}`;

  await connectDb();
  try {
    await StoredUpload.create({
      folder: folderRaw,
      filename,
      mimeType,
      size: buffer.length,
      data: buffer,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to store upload" }, { status: 500 });
  }

  const url = buildStoredUploadPublicUrl(folderRaw, filename);
  return NextResponse.json({
    success: true,
    url,
    filename,
    size: buffer.length,
    folder: folderRaw,
  });
}

export async function DELETE(req: Request) {
  if (!hasMongo()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const url = typeof body?.url === "string" ? body.url : "";
  if (!url.startsWith("/api/uploads/")) {
    return NextResponse.json({ error: "Invalid upload URL" }, { status: 400 });
  }

  const deleted = await deleteStoredUploadByUrl(url);
  return NextResponse.json({ success: true, deleted });
}
