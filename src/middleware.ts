import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Secondary domains (e.g. Rocky Ross Productions) → primary canonical host (e.g. Inked & Infused).
 * Set CANONICAL_HOST=www.example.com and REDIRECT_HOSTS=other.com,www.other.com
 */
export function middleware(request: NextRequest) {
  const canonicalHost = process.env.CANONICAL_HOST?.trim().toLowerCase();
  if (!canonicalHost) return NextResponse.next();

  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  if (!host || host === canonicalHost) return NextResponse.next();

  const skipHosts = new Set(["localhost", "127.0.0.1"]);
  if (skipHosts.has(host)) return NextResponse.next();

  const redirectHosts = (process.env.REDIRECT_HOSTS ?? "")
    .split(",")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);

  if (redirectHosts.length > 0 && !redirectHosts.includes(host)) {
    return NextResponse.next();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const protocol = siteUrl?.startsWith("http://") ? "http" : "https";
  const target = new URL(request.nextUrl.pathname + request.nextUrl.search, `${protocol}://${canonicalHost}`);
  return NextResponse.redirect(target, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images/).*)"],
};
