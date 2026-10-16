import { createHash, randomBytes } from "crypto";
import { connection } from "next/server";
import { cookies } from "next/headers";
import { connectDb } from "../db";
import { getAuthSecret, hasMongo } from "../env";
import { AdminUser } from "../models/AdminUser";
import { Session } from "../models/Session";

export const SESSION_COOKIE = "rrp_session";
const SESSION_DAYS = 7;

function hashToken(token: string): string {
  return createHash("sha256").update(`${token}:${getAuthSecret()}`).digest("hex");
}

export function generateSessionToken(): string {
  return randomBytes(32).toString("hex");
}

export async function createSession(userId: string): Promise<string> {
  await connectDb();
  const token = generateSessionToken();
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await Session.create({ userId, tokenHash, expiresAt });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
  return token;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token && hasMongo()) {
    try {
      await connectDb();
      await Session.deleteOne({ tokenHash: hashToken(token) });
    } catch {
      /* ignore */
    }
  }
  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export type AdminSession = {
  userId: string;
  email: string;
  name: string;
};

export async function getAdminSession(): Promise<AdminSession | null> {
  await connection();
  if (!hasMongo()) return null;
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    await connectDb();
    const tokenHash = hashToken(token);
    const now = new Date();
    const session = await Session.findOne({ tokenHash, expiresAt: { $gt: now } }).lean();
    if (!session) return null;
    const user = await AdminUser.findById(session.userId).lean();
    if (!user) return null;
    return {
      userId: String(user._id),
      email: user.email,
      name: user.name ?? "Administrator",
    };
  } catch {
    return null;
  }
}

export async function requireAdminSession(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}
