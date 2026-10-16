import Link from "next/link";
import { getAdminSession } from "@/lib/auth/session";

export const metadata = {
  robots: { index: false, follow: false },
};

/** Admin uses cookies/session — allow blocking render (not static PPR). */
export const instant = false;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  return (
    <div className="min-h-screen min-w-0 overflow-x-clip bg-zinc-950 text-zinc-100">
      {session && (
        <header className="border-b border-zinc-800 px-6 py-4">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
            <Link href="/admin" className="text-sm font-semibold tracking-wide uppercase text-amber-200/90">
              Rocky Ross Admin
            </Link>
            <nav className="flex flex-wrap gap-4 text-sm text-zinc-400">
              <Link href="/admin" className="hover:text-white">Dashboard</Link>
              <Link href="/admin/inquiries" className="hover:text-white">Inquiries</Link>
              <Link href="/admin/businesses" className="hover:text-white">Businesses</Link>
              <Link href="/admin/services" className="hover:text-white">Services</Link>
              <Link href="/admin/testimonials" className="hover:text-white">Testimonials</Link>
              <form action="/api/auth/logout" method="post">
                <button type="submit" className="hover:text-white">Logout</button>
              </form>
            </nav>
          </div>
        </header>
      )}
      <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
    </div>
  );
}
