import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getAdminSession } from "@/lib/auth/session";
import { getCloudinaryConfig, isCloudinaryConfigured } from "@/lib/env";

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isCloudinaryConfigured()) {
    return NextResponse.json({ error: "Cloudinary not configured" }, { status: 503 });
  }
  const { folder } = await req.json().catch(() => ({ folder: "inked-infused" }));
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = { timestamp, folder: String(folder).slice(0, 80) };
  const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);
  return NextResponse.json({ signature, timestamp, apiKey, cloudName, folder: paramsToSign.folder });
}
