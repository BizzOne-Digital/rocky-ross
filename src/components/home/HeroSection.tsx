"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronDown, DiamondStar, MapPin } from "@/components/icons/UiIcons";
import { mapsDirectionsUrl } from "@/lib/format";
import { SITE_CONTAINER } from "@/lib/site-layout";

const BOTTOM_LABELS: Record<string, string> = {
  "old-north-end-tattoos": "Old North End Tattoos",
  "el-gringos-tacos": "El Gringo's Tacos",
  "tequila-chilladas-bar": "Tequila Chillada's",
  "trims-barbershop": "Trims Barbershop",
  "ross-squad-djs-event-rentals": "Ross Squad DJs",
};

export function HeroSection({
  businesses,
  address,
}: {
  businesses: { slug: string; name: string }[];
  address: string;
}) {
  const reduce = useReducedMotion();
  const shortAddress = "2125 N Weber St. · Colorado Springs";
  const directionsUrl = mapsDirectionsUrl(address);

  const container = reduce
    ? undefined
    : { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };
  const item = reduce
    ? undefined
    : {
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const } },
      };

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[72%_center] md:object-[78%_center]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#080808]/95 via-[#080808]/75 to-[#080808]/15 md:from-[#060606]/92 md:via-[#080808]/55 md:to-transparent"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/40" aria-hidden="true" />

      <div className={`relative flex min-h-[100svh] flex-col ${SITE_CONTAINER} pb-20 pt-[6.5rem] sm:pb-24 sm:pt-[7.25rem] md:pb-32 md:pt-[8.5rem]`}>
        <motion.div
          className="max-w-2xl"
          variants={container}
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "show"}
        >
          <motion.p
            variants={item}
            className="font-sans text-[11px] font-medium uppercase tracking-[0.38em] text-[var(--ivory)]/75"
          >
            Colorado Springs, CO
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-8 font-serif text-[clamp(3.25rem,11vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.02em] text-[#f3efe6]"
          >
            <span className="block">TATTOOS.</span>
            <span className="block">TACOS.</span>
            <span className="relative mt-1 block text-[#9e2a3a]">
              TEQUILA.
              <svg
                className="absolute -bottom-1 left-0 h-2 w-[min(100%,280px)] text-[#c4a062]"
                viewBox="0 0 280 8"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 5.5 C 40 2, 90 7, 140 4 S 220 1, 278 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-10 font-serif text-xl font-normal text-[#f3efe6]/95 md:text-[1.35rem]">
            One destination. Five distinct experiences.
          </motion.p>
          <motion.p variants={item} className="mt-3 max-w-md font-serif text-base font-light italic text-[#f3efe6]/65 md:text-lg">
            Discover Inked & Infused by Rocky Ross Productions.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/#businesses"
              className="inline-flex w-fit items-center gap-2.5 rounded-full bg-[#ebe6dc] px-7 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1c1c1c] transition hover:bg-white"
            >
              Explore the hub
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href={directionsUrl}
              className="inline-flex w-fit items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--ivory)]/85 underline decoration-[var(--ivory)]/35 underline-offset-[6px] transition hover:text-white hover:decoration-white/60"
            >
              <MapPin className="w-4 h-4 text-[var(--ivory)]/70" />
              Get directions
            </a>
          </motion.div>

          <motion.p variants={item} className="mt-14 font-sans text-[11px] tracking-wide text-[var(--ivory)]/40">
            {shortAddress}
          </motion.p>
        </motion.div>

        <div className="mt-auto flex flex-col gap-6 border-t border-white/[0.12] pt-6 md:flex-row md:items-end md:justify-between">
          <nav
            className="flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-[12px] font-light tracking-wide text-[var(--ivory)]/75 md:text-[13px]"
            aria-label="Businesses on property"
          >
            {businesses.map((b, i) => (
              <span key={b.slug} className="inline-flex items-center gap-4">
                {i > 0 && <DiamondStar className="w-2 h-2 shrink-0 text-[#9e2a3a]" />}
                <Link href={`/${b.slug}`} className="transition hover:text-white">
                  {BOTTOM_LABELS[b.slug] ?? b.name}
                </Link>
              </span>
            ))}
          </nav>

          <Link
            href="/#businesses"
            className="hidden items-center gap-3 self-end font-sans text-[10px] uppercase tracking-[0.35em] text-[var(--ivory)]/45 md:flex"
          >
            <span className="h-10 w-px bg-[var(--ivory)]/25" aria-hidden="true" />
            Scroll
            <ChevronDown className="w-4 h-4 animate-bounce motion-reduce:animate-none" />
          </Link>
        </div>
      </div>
    </section>
  );
}
