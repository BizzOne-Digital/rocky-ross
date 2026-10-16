import { connectDb } from "./db";
import { hasMongo } from "./env";
import { RateLimitBucket } from "./models/RateLimitBucket";

export async function consumeRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<{ allowed: boolean; retryAfterMs?: number }> {
  if (!hasMongo()) {
    return { allowed: true };
  }
  await connectDb();
  const now = new Date();
  const existing = await RateLimitBucket.findOne({ key });
  if (!existing || existing.resetAt <= now) {
    await RateLimitBucket.findOneAndUpdate(
      { key },
      { count: 1, resetAt: new Date(now.getTime() + windowMs) },
      { upsert: true },
    );
    return { allowed: true };
  }
  if (existing.count >= limit) {
    return { allowed: false, retryAfterMs: existing.resetAt.getTime() - now.getTime() };
  }
  existing.count += 1;
  await existing.save();
  return { allowed: true };
}
