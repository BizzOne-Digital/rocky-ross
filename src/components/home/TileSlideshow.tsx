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
        "relative flex h-full w-full flex-col justify-between overflow-hidden border border-white/10 p-6 md:p-8",
        className,
      )}
      style={{
        background: `linear-gradient(145deg, ${accent}22 0%, var(--ink) 55%, ${accent}33 100%)`,
      }}
    >
      <svg className="absolute -right-8 -top-8 h-40 w-40 opacity-20" viewBox="0 0 200 200" aria-hidden="true">
        <path d="M0 100 Q50 0 100 100 T200 100 V200 H0Z" fill={accent} />
      </svg>
      <span className="font-serif text-4xl leading-none text-[var(--ivory)] md:text-5xl">{name.split(" ")[0]}</span>
      <span className="text-xs uppercase tracking-[0.4em] text-[var(--brass)]">{name}</span>
    </div>
  );
}

export function TileSlideshow({
  slug,
  name,
  description,
  accent,
  status,
  media,
  intervalMs,
  autoplay,
  staggerIndex,
  className,
  featured,
}: {
  slug: string;
  name: string;
  description: string;
  accent: string;
  status: string;
  media: PublicMedia[];
  intervalMs: number;
  autoplay: boolean;
  staggerIndex: number;
  className?: string;
  featured?: boolean;
}) {
  const reduce = useReducedMotion();
  const tileRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);

  const slides: SlideAsset[] =
    media.length > 0
      ? media.filter((m) => ["logo", "tile", "gallery", "hero"].includes(m.usage)).slice(0, 4)
      : [{ id: "typo", type: "typography" }];

  const isStatic = slides.length <= 1 || reduce || !autoplay;

  useEffect(() => {
    const el = tileRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
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

  return (
    <article
      ref={tileRef}
      className={cn(
        "group relative flex flex-col overflow-hidden border border-white/[0.1] bg-[#0c0c0c] shadow-[0_0_0_0_rgba(183,155,103,0)] transition duration-500 hover:border-white/20 hover:shadow-[0_24px_80px_-20px_rgba(158,42,58,0.35)] md:hover:-translate-y-1",
        featured && "md:row-span-2",
        className,
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:min-h-[280px] md:flex-1 lg:min-h-[320px]">
        <Link href={`/${slug}`} className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--brass)]">
          <span className="sr-only">Visit {name}</span>
        </Link>
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
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={(current as PublicMedia).url}
                alt={(current as PublicMedia).alt || name}
                fill
                sizes={featured ? "(max-width:768px) 100vw, 50vw" : "(max-width:768px) 100vw, 33vw"}
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
                style={{
                  objectPosition: `${(current as PublicMedia).focalX}% ${(current as PublicMedia).focalY}%`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/25 to-transparent" />
              <div className="absolute inset-0 bg-[#9e2a3a]/0 transition duration-500 group-hover:bg-[#9e2a3a]/10" />
            </motion.div>
          )}
        </AnimatePresence>

        {!isStatic && inView && (
          <button
            type="button"
            className="absolute bottom-3 right-3 z-20 border border-white/20 bg-[var(--ink)]/80 px-3 py-1.5 text-[10px] uppercase tracking-widest text-[var(--ivory)] backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--brass)]"
            onClick={(e) => {
              e.stopPropagation();
              setPaused((p) => !p);
            }}
            aria-pressed={paused}
          >
            {paused ? "Play" : "Pause"}
          </button>
        )}
      </div>

      <div className="relative z-20 flex flex-col gap-2 border-t border-white/10 p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/${slug}`} className="font-serif text-2xl leading-tight text-[var(--ivory)] transition hover:text-[var(--brass)] md:text-3xl">
            {name}
          </Link>
          {status === "coming_soon" && (
            <span className="shrink-0 border border-[var(--brass)]/40 px-2 py-0.5 text-[10px] uppercase tracking-widest text-[var(--brass)]">
              Coming soon
            </span>
          )}
        </div>
        <p className="text-sm leading-relaxed text-[var(--ivory)]/70">{description}</p>
        <Link
          href={`/${slug}`}
          className="mt-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[var(--brass)] transition group-hover:gap-3"
        >
          Enter <ArrowIcon className="w-4 h-4" />
        </Link>
      </div>
      <div className="pointer-events-none absolute left-0 top-0 h-1 w-0 bg-[var(--accent)] transition-all duration-500 group-hover:w-full" style={{ ["--accent" as string]: accent }} />
    </article>
  );
}
