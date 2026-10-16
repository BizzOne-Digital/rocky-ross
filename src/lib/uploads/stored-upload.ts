import { connectDb } from "@/lib/db";
import { StoredUpload } from "@/lib/models/StoredUpload";
import { parseStoredUploadUrl } from "./stored-upload-url";

export { parseStoredUploadUrl, isStoredUploadUrl, buildStoredUploadPublicUrl } from "./stored-upload-url";

export async function deleteStoredUploadByUrl(url: string | null | undefined): Promise<boolean> {
  if (!url) return false;
  const parsed = parseStoredUploadUrl(url);
  if (!parsed) return false;
  await connectDb();
  const result = await StoredUpload.deleteOne({ folder: parsed.folder, filename: parsed.filename });
  return result.deletedCount > 0;
}
