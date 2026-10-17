"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowIcon } from "@/components/icons/Arrow";
import { cn } from "@/lib/cn";
import type { PublicMedia } from "@/lib/data/public";

type SlideAsset = PublicMedia | { id: string; type: "typography" };

function TypographyPanel({
  name,
  accent,
  className,
}: {
  name: string;
  accent: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center overflow-hidden border border-white/10 p-6",
        className,
      )}
      style={{
        background: `linear-gradient(145deg, ${accent}22 0%, var(--ink) 55%, ${accent}33 100%)`,
      }}
    >
      <span className="text-center font-serif text-2xl leading-tight text-[var(--ivory)]">{name}</span>
    </div>
  );
}

export function TileSlideshow({
  slug,
  name,
  displayName,
  description,
  headline,
  bullets,
  ctaLabel,
  accent,
  status,
  slides: slidesProp,
  intervalMs,
  autoplay,
  staggerIndex,
  className,
}: {
  slug: string;
  name: string;
  displayName?: string;
  description: string;
  headline: string;
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
  const reduce = useReducedMotion();
  const tileRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);

  const slides: SlideAsset[] =
    slidesProp.length > 0 ? slidesProp.slice(0, 4) : [{ id: "typo", type: "typography" }];

  const isStatic = slides.length <= 1 || reduce || !autoplay;

  useEffect(() => {
    const el = tileRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (isStatic || !inView || paused) return;
    const startDelay = staggerIndex * 400;
    let timer: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      timer = setInterval(() => {
        if (document.hidden) return;
        setIndex((i) => (i + 1) % slides.length);
      }, intervalMs);
    }, startDelay);
    return () => {
      clearTimeout(timeout);
      if (timer) clearInterval(timer);
    };
  }, [inView, paused, isStatic, intervalMs, slides.length, staggerIndex]);

  const onVisibility = useCallback(() => {
    if (document.hidden) setPaused(true);
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [onVisibility]);

  const current = slides[index] ?? slides[0];
  const href = `/${slug}`;

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex min-h-full flex-col overflow-hidden border border-[var(--brass)]/25 bg-[#0c1012] shadow-lg transition duration-500 hover:border-[var(--brass)]/50 hover:shadow-[0_20px_60px_-24px_rgba(26,107,107,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hub-teal)]",
        className,
      )}
    >
      <article ref={tileRef} className="flex h-full flex-col">
        <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/4] lg:aspect-[4/5]">
          <AnimatePresence mode="wait">
            {"type" in current && current.type === "typography" ? (
              <motion.div
                key="typo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <TypographyPanel name={name} accent={accent} className="h-full" />
              </motion.div>
            ) : (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-[#0a0f10]"
              >
                <Image
                  src={(current as PublicMedia).url}
                  alt={(current as PublicMedia).alt || name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className={cn(
                    "transition duration-700 group-hover:scale-[1.03]",
                    (current as PublicMedia).usage === "logo" ? "object-contain p-8" : "object-cover",
                  )}
                  style={
                    (current as PublicMedia).usage === "logo"
                      ? undefined
                      : {
                          objectPosition: `${(current as PublicMedia).focalX}% ${(current as PublicMedia).focalY}%`,
                        }
                  }
                  unoptimized={(current as PublicMedia).url.startsWith("/api/uploads/")}
                />
                {(current as PublicMedia).usage !== "logo" && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/20 to-transparent" />
                    <div className="absolute inset-0 bg-[var(--hub-teal)]/0 transition duration-500 group-hover:bg-[var(--hub-teal)]/10" />
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {!isStatic && inView && (
            <button
              type="button"
              className="absolute bottom-2 right-2 z-20 border border-white/20 bg-[var(--ink)]/85 px-2.5 py-1 text-[9px] uppercase tracking-widest text-[var(--ivory)] backdrop-blur"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setPaused((p) => !p);
              }}
              aria-pressed={paused}
            >
              {paused ? "Play" : "Pause"}
            </button>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 border-t border-[var(--brass)]/20 p-4 md:p-5">
          <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
            <h2 className="min-w-0 flex-1 font-serif text-lg leading-tight text-[var(--ivory)] md:text-xl">
              {displayName ?? name}
            </h2>
            {displayName && name !== displayName && (
              <p className="shrink-0 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--hub-teal)] sm:tracking-[0.2em]">
                {name}
              </p>
            )}
            {status === "coming_soon" && (
              <span className="shrink-0 border border-[var(--brass)]/50 px-2 py-0.5 text-[9px] uppercase tracking-widest text-[var(--brass)]">
                Opening soon
              </span>
            )}
          </div>
          {headline && (
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--hub-teal)]">
              {headline}
            </p>
          )}
          {bullets && <p className="text-xs leading-relaxed text-[var(--ivory)]/65">{bullets}</p>}
          <p className="line-clamp-2 text-xs text-[var(--ivory)]/50">{description}</p>
          <span className="mt-auto inline-flex items-center gap-2 pt-2 font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--brass)] transition group-hover:gap-3">
            {ctaLabel} <ArrowIcon className="h-3.5 w-3.5" />
          </span>
        </div>
        <div
          className="pointer-events-none absolute left-0 top-0 h-0.5 w-0 bg-[var(--accent)] transition-all duration-500 group-hover:w-full"
          style={{ ["--accent" as string]: accent }}
        />
      </article>
    </Link>
  );
}
