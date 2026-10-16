import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { hasMongo } from "@/lib/env";
import { StoredUpload } from "@/lib/models/StoredUpload";
import { UPLOAD_FOLDERS, type UploadFolder } from "@/lib/uploads/constants";

function safeFilename(filename: string): boolean {
  if (!filename || filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    return false;
  }
  return /^[a-zA-Z0-9._-]+$/.test(filename);
}

function isUploadFolder(value: string): value is UploadFolder {
  return (UPLOAD_FOLDERS as readonly string[]).includes(value);
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ folder: string; filename: string }> },
) {
  if (!hasMongo()) {
    return new NextResponse("Not found", { status: 404 });
  }

  const { folder, filename } = await ctx.params;
  if (!isUploadFolder(folder) || !safeFilename(filename)) {
    return new NextResponse("Bad request", { status: 400 });
  }

  await connectDb();
  const doc = await StoredUpload.findOne({ folder, filename })
    .select("mimeType size data")
    .lean();
  if (!doc?.data) {
    return new NextResponse("Not found", { status: 404 });
  }

  const body = Buffer.isBuffer(doc.data) ? doc.data : Buffer.from(doc.data as Uint8Array);

  return new NextResponse(new Uint8Array(body), {
    status: 200,
    headers: {
      "Content-Type": doc.mimeType,
      "Content-Length": String(doc.size ?? body.length),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
