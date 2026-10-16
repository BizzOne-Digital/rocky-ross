import Link from "next/link";
import { ArrowUpRight, DiamondStar } from "@/components/icons/UiIcons";
import { mapsDirectionsUrl, phoneHref } from "@/lib/format";
import { SITE_CONTAINER, SITE_SECTION_Y } from "@/lib/site-layout";

export function SiteFooter({
  brandName,
  destinationName,
  email,
  phone,
  address,
  businesses,
  tagline = "TATTOOS • TACOS • TEQUILA",
}: {
  brandName: string;
  destinationName: string;
  email: string;
  phone: string;
  address: string;
  businesses: { slug: string; name: string }[];
  tagline?: string;
}) {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/[0.08] bg-[#080808]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(158,42,58,0.22) 0%, transparent 55%), radial-gradient(circle at 90% 80%, rgba(183,155,103,0.12) 0%, transparent 40%)",
        }}
      />
      <div className="site-grain pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true" />

      {/* CTA band */}
      <div className="relative border-b border-white/[0.08]">
        <div className={`${SITE_CONTAINER} flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center md:gap-8 md:py-14`}>
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[var(--brass)]">Colorado Springs</p>
            <p className="mt-2 font-serif text-3xl text-[var(--ivory)] md:text-4xl">Plan your visit.</p>
            <p className="mt-2 max-w-md font-serif text-base italic text-[var(--ivory)]/55">
              Ink, flavor, pours, and cuts — one destination on N Weber St.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#businesses"
              className="inline-flex items-center gap-2 rounded-full bg-[#ebe6dc] px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1a1a1a] transition hover:bg-white"
            >
              Explore businesses
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <a
              href={mapsDirectionsUrl(address)}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--ivory)] transition hover:border-[var(--brass)] hover:text-[var(--brass)]"
            >
              Directions
            </a>
          </div>
        </div>
      </div>

      <div className={`relative grid gap-10 md:grid-cols-12 md:gap-10 ${SITE_CONTAINER} ${SITE_SECTION_Y}`}>
        <div className="md:col-span-5">
          <Link href="/" className="inline-block">
            <span className="font-serif text-3xl font-semibold tracking-wide text-[var(--ivory)] md:text-4xl">
              INKED <span className="text-[#9e2a3a]">&</span> INFUSED
            </span>
          </Link>
          <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.42em] text-[var(--ivory)]/45">
            {brandName}
          </p>
          <p className="mt-1 font-serif text-sm italic text-[var(--ivory)]/50">{destinationName}</p>
          <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.28em] text-[var(--brass)]/90">
            {tagline}
          </p>
          <p className="mt-6 max-w-sm font-serif text-lg leading-relaxed text-[var(--ivory)]/55">
            {address}
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.38em] text-[var(--brass)]">
            Our businesses
          </p>
          <ul className="mt-5 space-y-3">
            {businesses.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/${b.slug}`}
                  className="group flex items-center justify-between gap-3 font-serif text-lg text-[var(--ivory)]/80 transition hover:text-[var(--ivory)]"
                >
                  <span>{b.name}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 opacity-0 transition group-hover:opacity-100 text-[var(--brass)]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.38em] text-[var(--brass)]">
            Contact
          </p>
          <ul className="mt-5 space-y-4 font-sans text-sm">
            <li>
              <a
                href={`mailto:${email}`}
                className="text-[var(--ivory)]/75 transition hover:text-[var(--brass)]"
              >
                {email}
              </a>
            </li>
            <li>
              <a href={phoneHref(phone)} className="text-[var(--ivory)]/75 transition hover:text-[var(--brass)]">
                {phone}
              </a>
            </li>
            <li className="pt-2">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--ivory)]/50 transition hover:text-[var(--ivory)]"
              >
                General inquiry
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </li>
          </ul>
          <nav className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--ivory)]/35">
            <Link href="/" className="hover:text-[var(--ivory)]/70">The Hub</Link>
            <Link href="/about" className="hover:text-[var(--ivory)]/70">About</Link>
            <Link href="/about#visit" className="hover:text-[var(--ivory)]/70">Visit</Link>
            <Link href="/admin" className="hover:text-[var(--ivory)]/50">Admin</Link>
          </nav>
        </div>
      </div>

      {/* Decorative strip */}
      <div className="relative overflow-hidden border-t border-white/[0.06] py-8">
        <p
          className="select-none text-center font-serif text-[clamp(3rem,14vw,8rem)] font-medium leading-none tracking-tight text-[var(--ivory)]/[0.04]"
          aria-hidden="true"
        >
          INKED & INFUSED
        </p>
        <div className={`${SITE_CONTAINER} flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-4 font-sans text-[11px] tracking-wide text-[var(--ivory)]/40 md:justify-between`}>
          <span className="flex flex-wrap items-center justify-center gap-4">
            {businesses.map((b, i) => (
              <span key={b.slug} className="inline-flex items-center gap-4">
                {i > 0 && <DiamondStar className="h-1.5 w-1.5 text-[#9e2a3a]/80" />}
                <Link href={`/${b.slug}`} className="transition hover:text-[var(--ivory)]/70">
                  {b.name}
                </Link>
              </span>
            ))}
          </span>
          <span className="text-[10px] uppercase tracking-[0.28em]">© 2026 {brandName}</span>
        </div>
      </div>
    </footer>
  );
}
