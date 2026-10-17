"use client";

import { motion, useReducedMotion } from "motion/react";
import { DiamondStar } from "@/components/icons/UiIcons";
import { HUB_CAMPUS_SERVICE_LINE } from "@/lib/hub-home-copy";
import { SITE_CONTAINER, SITE_HEADER_OFFSET } from "@/lib/site-layout";

function GoldRule({ className = "" }: { className?: string }) {
  return <span className={`inline-block h-px bg-[var(--brass)]/70 ${className}`} aria-hidden="true" />;
}

export function HubHeroSection({
  brandName,
}: {
  brandName: string;
  destinationName: string;
  address: string;
}) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-[var(--brass)]/20 bg-[#050608]">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-2.5 opacity-50 sm:w-4 md:w-5"
        aria-hidden="true"
        style={{
          background:
            "repeating-linear-gradient(180deg, #9e2a3a 0 6px, #1a6b6b 6px 12px, #c4a062 12px 18px, #f4f0e8 18px 24px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-2.5 opacity-50 sm:w-4 md:w-5"
        aria-hidden="true"
        style={{
          background:
            "repeating-linear-gradient(180deg, #9e2a3a 0 6px, #1a6b6b 6px 12px, #c4a062 12px 18px, #f4f0e8 18px 24px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 15%, rgba(45,180,170,0.35) 0%, transparent 55%), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(45,120,115,0.2) 0%, transparent 50%), linear-gradient(180deg, #0a1418 0%, #06080a 45%, #030304 100%)",
        }}
      />
      <div className="site-grain pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true" />

      <div className={`relative z-[1] ${SITE_CONTAINER} pb-8 ${SITE_HEADER_OFFSET} sm:pb-10 md:pb-12`}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <h1 className="font-serif text-[clamp(1.75rem,6vw,3.25rem)] font-medium leading-tight text-[var(--ivory)]">
            {brandName}
          </h1>
          <div className="mt-3 flex items-center justify-center gap-3 font-sans text-[9px] font-medium uppercase tracking-[0.28em] text-[var(--brass)] sm:text-[10px] sm:tracking-[0.38em]">
            <GoldRule className="w-8 sm:w-14" />
            <span>A.K.A. The Double R Group</span>
            <GoldRule className="w-8 sm:w-14" />
          </div>

          <div className="mt-10 flex items-center justify-center gap-3 sm:mt-12 sm:gap-4">
            <GoldRule className="hidden w-10 sm:block sm:w-16" />
            <DiamondStar className="h-2.5 w-2.5 shrink-0 text-[var(--brass)] sm:h-3 sm:w-3" />
            <p className="font-serif text-[clamp(1.75rem,7vw,3.5rem)] font-medium leading-none text-[var(--ivory)]">
              INKED <span className="text-[var(--hub-teal)]">&</span> INFUSED
            </p>
            <DiamondStar className="h-2.5 w-2.5 shrink-0 text-[var(--brass)] sm:h-3 sm:w-3" />
            <GoldRule className="hidden w-10 sm:block sm:w-16" />
          </div>

          <p className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--ivory)] sm:text-[11px] sm:tracking-[0.24em]">
            {HUB_CAMPUS_SERVICE_LINE.map((word, i) => (
              <span key={word} className="inline-flex items-center gap-2">
                {i > 0 && <span className="text-[var(--hub-teal)]" aria-hidden="true">•</span>}
                <span>{word}</span>
              </span>
            ))}
          </p>

          <p className="mt-6 font-serif text-[clamp(1.35rem,5vw,2.25rem)] font-medium uppercase leading-tight tracking-[0.06em] text-[var(--ivory)]">
            All Under One Roof
          </p>

          <div className="mx-auto mt-8 max-w-2xl border-y border-[var(--brass)]/45 py-5 sm:py-6">
            <p className="font-sans text-sm leading-relaxed text-[var(--brass)] md:text-[15px]">
              Yes, we do a lot—but we&apos;re so passionate about everything we do.
            </p>
            <p className="mt-2 font-sans text-sm leading-relaxed text-[var(--brass)] md:text-[15px]">
              Your support keeps small businesses like ours going. Thank you!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
