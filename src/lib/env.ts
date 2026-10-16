function optional(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : undefined;
}

export function hasMongo(): boolean {
  return Boolean(optional("MONGODB_URI"));
}

export function getMongoUri(): string {
  const uri = optional("MONGODB_URI");
  if (!uri) throw new Error("MONGODB_URI is not configured");
  return uri;
}

export function getMongoDbName(): string {
  return optional("MONGODB_DB") ?? "inked_infused";
}

export function getAuthSecret(): string {
  const secret = optional("AUTH_SECRET");
  if (!secret) throw new Error("AUTH_SECRET is not configured");
  return secret;
}

export function getSiteUrl(): string {
  const url = optional("NEXT_PUBLIC_SITE_URL");
  if (process.env.NODE_ENV === "production" && url) return url.replace(/\/$/, "");
  if (url) return url.replace(/\/$/, "");
  return "http://localhost:3000";
}

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    optional("CLOUDINARY_CLOUD_NAME") &&
      optional("CLOUDINARY_API_KEY") &&
      optional("CLOUDINARY_API_SECRET"),
  );
}

export function getCloudinaryConfig() {
  const cloudName = optional("CLOUDINARY_CLOUD_NAME");
  const apiKey = optional("CLOUDINARY_API_KEY");
  const apiSecret = optional("CLOUDINARY_API_SECRET");
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary is not fully configured");
  }
  return { cloudName, apiKey, apiSecret };
}

export function isSmtpConfigured(): boolean {
  return Boolean(optional("SMTP_HOST") && optional("SMTP_USER") && optional("SMTP_PASS"));
}

export function getSmtpFrom(): string {
  return optional("SMTP_FROM") ?? optional("SMTP_USER") ?? BRAND_FALLBACK_FROM;
}

const BRAND_FALLBACK_FROM = "noreply@localhost";

export function getNotificationEmail(): string | undefined {
  return optional("NOTIFICATION_EMAIL");
}
