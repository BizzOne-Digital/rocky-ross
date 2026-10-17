"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, MapPin } from "@/components/icons/UiIcons";
import { mapsDirectionsUrl } from "@/lib/format";
import { OWNER_CONTACTS } from "@/lib/owner-contacts";
import { HUB_CAMPUS_SERVICE_LINE } from "@/lib/hub-home-copy";
import { SITE_CONTAINER, SITE_HEADER_OFFSET } from "@/lib/site-layout";

export function HubHeroSection({
  address,
}: {
  brandName: string;
  destinationName: string;
  address: string;
}) {
  const reduce = useReducedMotion();
  const directionsUrl = mapsDirectionsUrl(address);

  return (
    <section className="relative overflow-hidden border-b border-white/[0.08] bg-[#0a1210]">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-3 opacity-40 md:w-5"
        aria-hidden="true"
        style={{
          background:
            "repeating-linear-gradient(180deg, #9e2a3a 0 8px, #1a6b6b 8px 16px, #c4a062 16px 24px, #f4f0e8 24px 32px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-3 opacity-40 md:w-5"
        aria-hidden="true"
        style={{
          background:
            "repeating-linear-gradient(180deg, #9e2a3a 0 8px, #1a6b6b 8px 16px, #c4a062 16px 24px, #f4f0e8 24px 32px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 85% 65% at 50% 0%, rgba(26,90,82,0.4) 0%, transparent 50%), linear-gradient(180deg, #0c1614 0%, #0a100e 50%, #080808 100%)",
        }}
      />
      <div className="site-grain pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden="true" />

      <div className={`relative ${SITE_CONTAINER} pb-6 ${SITE_HEADER_OFFSET} sm:pb-8 md:pb-8`}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="font-serif text-[clamp(2rem,7vw,3.75rem)] font-medium leading-tight text-[var(--ivory)]">
            Rocky Ross Productions
          </h1>
          <p className="mt-2 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--brass)] sm:text-xs sm:tracking-[0.32em] md:text-sm">
            A.K.A. The Double R Group
          </p>

          <p className="mt-8 text-balance font-serif text-[clamp(1.5rem,6.5vw,2.75rem)] font-medium leading-snug text-[var(--ivory)]">
            Inked <span className="text-[var(--hub-teal)]">&</span> Infused
            <span className="text-[var(--hub-teal)]"> — </span>
            All Under One Roof
          </p>

          <p className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--ivory)]/85 sm:text-[11px] sm:tracking-[0.22em] md:text-xs">
            {HUB_CAMPUS_SERVICE_LINE.map((word, i) => (
              <span key={word} className="inline-flex items-center gap-2">
                {i > 0 && <span className="text-[var(--hub-teal)]" aria-hidden="true">•</span>}
                <span>{word}</span>
              </span>
            ))}
          </p>

          <p className="mt-5 font-sans text-sm text-[var(--ivory)]/70">
            Select the service that interests you for its details.
          </p>

          <div className="mx-auto mt-8 max-w-xl border-y border-[var(--brass)]/35 py-6">
            <p className="font-sans text-sm leading-relaxed text-[var(--brass)]/95 md:text-base">
              Yes, we do a lot—but we&apos;re so passionate about everything we do.
            </p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--brass)]/95 md:text-base">
              Your support keeps small businesses like ours going. Thank you!
            </p>
          </div>

          <p className="mt-6 text-pretty font-sans text-sm leading-relaxed text-[var(--ivory)]/60">
            <span className="block sm:inline">{OWNER_CONTACTS.campus.address}</span>
            <span className="hidden sm:inline"> · </span>
            <span className="mt-1 block sm:mt-0 sm:inline">
              Colorado Springs locals, neighbors, and event clients welcome.
            </span>
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#businesses"
              className="inline-flex items-center gap-2 rounded-full bg-[#ebe6dc] px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1a1a1a] transition hover:bg-white"
            >
              Choose a service
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <a
              href={directionsUrl}
              className="inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--hub-teal)] transition hover:text-[var(--ivory)]"
            >
              <MapPin className="h-4 w-4" />
              Campus directions
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
