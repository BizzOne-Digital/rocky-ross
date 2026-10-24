"use client";

import { motion, useReducedMotion } from "motion/react";

const WORDS = ["TATTOOS", "TACOS", "TEQUILA", "INKED", "INFUSED", "COLORADO SPRINGS"];

export function MarqueeStrip() {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div className="border-y border-white/10 py-4 text-center text-xs uppercase tracking-[0.5em] text-[var(--brass)]">
        {WORDS.join(" · ")}
      </div>
    );
  }
  return (
    <div className="relative w-full max-w-full overflow-hidden border-y border-white/10 py-5">
      <motion.div
        className="flex w-max gap-12 whitespace-nowrap font-serif text-2xl tracking-[0.35em] text-[var(--ivory)]/25 md:text-4xl"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {[...WORDS, ...WORDS, ...WORDS].map((w, i) => (
          <span key={`${w}-${i}`} className="text-[var(--brass)]/40">{w}</span>
        ))}
      </motion.div>
    </div>
  );
}
