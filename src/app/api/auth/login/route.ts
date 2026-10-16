import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDb } from "@/lib/db";
import { hasMongo } from "@/lib/env";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { consumeRateLimit } from "@/lib/rate-limit";
import { AdminUser } from "@/lib/models/AdminUser";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(200),
});

export async function POST(req: Request) {
  if (!hasMongo()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rate = await consumeRateLimit(`login:${ip}`, 10, 15 * 60 * 1000);
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many attempts" }, { status: 429 });
  }

  await connectDb();
  const user = await AdminUser.findOne({ email: parsed.data.email.toLowerCase() });
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  await createSession(String(user._id));
  return NextResponse.json({ ok: true });
}
