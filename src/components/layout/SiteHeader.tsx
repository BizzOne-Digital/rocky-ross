"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronDown, MenuLines, XMark } from "@/components/icons/UiIcons";
import { SITE_CONTAINER } from "@/lib/site-layout";
import { cn } from "@/lib/cn";

export type NavBusiness = { slug: string; name: string };

function Wordmark({ brandName }: { brandName: string }) {
  return (
    <Link
      href="/"
      className="group min-w-0 max-w-[calc(100%-3.5rem)] leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brass)]"
    >
      <span className="block truncate font-serif text-[1.1rem] font-semibold tracking-[0.04em] text-[var(--ivory)] sm:text-[1.35rem] sm:tracking-[0.06em] md:text-[1.65rem]">
        INKED <span className="text-[#9e2a3a]">&</span> INFUSED
      </span>
      <span className="mt-1 block truncate text-[8px] font-sans font-medium uppercase tracking-[0.32em] text-[var(--ivory)]/55 sm:mt-1.5 sm:text-[9px] sm:tracking-[0.42em] md:text-[10px]">
        {brandName}
      </span>
    </Link>
  );
}

type SiteHeaderProps = {
  businesses: NavBusiness[];
  brandName: string;
  destinationName?: string;
};

/** Remount on route change so the mobile drawer closes without an effect. */
export function SiteHeader(props: SiteHeaderProps) {
  const pathname = usePathname();
  return <SiteHeaderInner key={pathname} {...props} />;
}

function SiteHeaderInner({
  businesses,
  brandName,
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.classList.toggle("mobile-nav-open", open);
    return () => document.body.classList.remove("mobile-nav-open");
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 w-full border-b transition-all duration-500",
          scrolled
            ? "border-white/10 bg-[#0a0a0a]/85 backdrop-blur-md"
            : "border-white/[0.12] bg-transparent",
        )}
      >
        <div className={cn(SITE_CONTAINER, "flex items-center justify-between gap-3 py-3.5 md:gap-6 md:py-5")}>
          <Wordmark brandName={brandName} />

          <nav
            className="hidden items-center gap-10 font-sans text-[15px] font-light tracking-wide text-[var(--ivory)]/90 lg:flex"
            aria-label="Primary"
          >
            <Link href="/" className="transition hover:text-white">The Hub</Link>
            <Link href="/about" className="transition hover:text-white">About</Link>
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-1.5 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--brass)]"
                aria-haspopup="true"
              >
                Our Businesses
                <ChevronDown className="h-4 w-4 opacity-70" />
              </button>
              <div className="pointer-events-none absolute left-1/2 top-full z-50 min-w-[300px] -translate-x-1/2 pt-4 opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                <ul className="border border-white/10 bg-[#0c0c0c]/95 py-2 shadow-2xl backdrop-blur-md">
                  {businesses.map((b) => (
                    <li key={b.slug}>
                      <Link
                        href={`/${b.slug}`}
                        className="block px-5 py-2.5 text-sm text-[var(--ivory)]/85 transition hover:bg-white/5 hover:text-white"
                      >
                        {b.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link href="/about#visit" className="transition hover:text-white">Visit Us</Link>
          </nav>

          <Link
            href="/#contact"
            className="hidden items-center gap-2 rounded-full border border-[var(--ivory)]/55 px-5 py-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--ivory)] transition hover:border-white hover:bg-white/5 lg:inline-flex"
          >
            Get in touch
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-[var(--ivory)] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <XMark /> : <MenuLines />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-[60] bg-black/70 lg:hidden"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />
            <motion.aside
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="fixed inset-y-0 right-0 z-[70] flex w-[min(100%,20rem)] max-w-full flex-col border-l border-white/10 bg-[#0a0a0a] shadow-2xl lg:hidden"
              initial={reduce ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
                <span className="font-sans text-[10px] font-medium uppercase tracking-[0.35em] text-[var(--ivory)]/50">
                  Menu
                </span>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-[var(--ivory)]"
                  aria-label="Close menu"
                  onClick={close}
                >
                  <XMark />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-2" aria-label="Mobile">
                <Link href="/" onClick={close} className="block border-b border-white/5 py-3.5 text-[var(--ivory)]">
                  The Hub
                </Link>
                <Link href="/about" onClick={close} className="block border-b border-white/5 py-3.5 text-[var(--ivory)]">
                  About
                </Link>
                <p className="pt-4 text-[10px] uppercase tracking-[0.35em] text-[var(--ivory)]/45">Our Businesses</p>
                <ul>
                  {businesses.map((b) => (
                    <li key={b.slug}>
                      <Link
                        href={`/${b.slug}`}
                        onClick={close}
                        className="block border-b border-white/5 py-3.5 text-sm text-[var(--ivory)]/90"
                      >
                        {b.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-2.5 pb-6">
                  <Link
                    href="/about#visit"
                    onClick={close}
                    className="rounded-full border border-white/30 py-3 text-center text-xs uppercase tracking-widest"
                  >
                    Visit Us
                  </Link>
                  <Link
                    href="/#contact"
                    onClick={close}
                    className="rounded-full bg-[var(--ivory)] py-3 text-center text-xs uppercase tracking-widest text-[#1a1a1a]"
                  >
                    Get in touch
                  </Link>
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
