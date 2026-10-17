"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons/Arrow";
import { cn } from "@/lib/cn";
import type { PublicMedia } from "@/lib/data/public";

export function TileSlideshow({
  slug,
  name,
  displayName,
  headline,
  subheadline,
  bullets,
  ctaLabel,
  accent,
  status,
  slides: slidesProp,
  className,
}: {
  slug: string;
  name: string;
  displayName?: string;
  description: string;
  headline: string;
  subheadline?: string;
  bullets: string;
  ctaLabel: string;
  accent: string;
  status: string;
  slides: PublicMedia[];
  intervalMs: number;
  autoplay: boolean;
  staggerIndex: number;
  className?: string;
}) {
  const photo = slidesProp.find((s) => s.usage !== "logo") ?? slidesProp[0];
  const href = `/${slug}`;
  const primaryTitle = (displayName ?? name).toUpperCase();
  const headlineGold = headline ? `— ${headline.toUpperCase()} —` : "";

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex min-h-full flex-col overflow-hidden border border-[var(--brass)]/55 bg-[#080808] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.85)] transition duration-300 hover:border-[var(--brass)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hub-teal)]",
        className,
      )}
    >
      <article className="flex h-full flex-col">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0a0a0a] lg:aspect-[3/4]">
          {photo ? (
            <Image
              src={photo.url}
              alt={photo.alt || primaryTitle}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
              style={{
                objectPosition: `${photo.focalX}% ${photo.focalY}%`,
              }}
              unoptimized={photo.url.startsWith("/api/uploads/")}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(160deg, ${accent}33 0%, #080808 60%)`,
              }}
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-[#080808]/20" />
        </div>

        <div className="flex flex-1 flex-col items-center border-t border-[var(--brass)]/35 bg-[#080808] px-3 py-4 text-center sm:px-4 sm:py-5">
          <h2 className="font-serif text-base font-medium leading-tight tracking-wide text-[var(--ivory)] sm:text-lg">
            {primaryTitle}
          </h2>
          {headlineGold && (
            <p className="mt-1 font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--brass)] sm:text-[10px]">
              {headlineGold}
            </p>
          )}
          {subheadline && (
            <p className="mt-2 font-sans text-[9px] font-medium uppercase tracking-[0.2em] text-[var(--hub-teal)] sm:text-[10px]">
              {subheadline}
            </p>
          )}
          {status === "coming_soon" && (
            <p className="mt-2 font-sans text-[9px] font-semibold uppercase tracking-[0.24em] text-[var(--brass)]">
              Opening soon
            </p>
          )}
          {bullets && (
            <p className="mt-2 font-sans text-[9px] uppercase tracking-[0.14em] text-[var(--ivory)]/80 sm:text-[10px] sm:tracking-[0.18em]">
              {bullets.replace(/·/g, " • ")}
            </p>
          )}
          <span
            className="mt-4 inline-flex w-full max-w-[14rem] items-center justify-center gap-2 border border-[var(--brass)]/70 bg-[#0a0a0a] px-3 py-2.5 font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--ivory)] transition group-hover:border-[var(--brass)] group-hover:bg-[#121212] sm:text-[10px]"
          >
            {ctaLabel}
            <ArrowIcon className="h-3 w-3" />
          </span>
        </div>
      </article>
    </Link>
  );
}
