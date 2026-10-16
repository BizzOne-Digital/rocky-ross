import type { UploadFolder } from "./constants";

export function parseStoredUploadUrl(url: string): { folder: UploadFolder; filename: string } | null {
  const match = url.match(/^\/api\/uploads\/([^/]+)\/([^/]+)$/);
  if (!match) return null;
  const folder = match[1];
  const filename = match[2];
  if (filename.includes("..") || filename.includes("/")) return null;
  return { folder: folder as UploadFolder, filename };
}

export function isStoredUploadUrl(url: string | null | undefined): boolean {
  return Boolean(url && url.startsWith("/api/uploads/"));
}

export function buildStoredUploadPublicUrl(folder: string, filename: string): string {
  return `/api/uploads/${folder}/${filename}`;
}
