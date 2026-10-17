"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import {
  OLD_NORTH_END_AFTERCARE_IMAGE,
  OLD_NORTH_END_AFTERCARE_TEXT,
} from "@/lib/business-page-content/old-north-end-tattoos";
import { SITE_CONTAINER, SITE_SECTION_Y } from "@/lib/site-layout";

export function TattooAftercareSection() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const printSheet = useCallback(() => {
    const w = window.open(OLD_NORTH_END_AFTERCARE_IMAGE, "_blank", "noopener,noreferrer");
    w?.addEventListener("load", () => w.print());
  }, []);

  return (
    <section id="aftercare" className={`border-y border-white/[0.06] bg-[#0c0c0c] ${SITE_SECTION_Y}`}>
      <div className={SITE_CONTAINER}>
        <Reveal>
          <SectionHeading
            label="Healing"
            title="Tattoo aftercare"
            description={OLD_NORTH_END_AFTERCARE_TEXT.tagline}
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button type="button" variant="primary" onClick={() => setViewerOpen(true)}>
              View aftercare
            </Button>
            <a
              href={OLD_NORTH_END_AFTERCARE_IMAGE}
              download="Old-North-End-Tattoos-Aftercare-Letter.jpg"
              className="inline-flex items-center justify-center border border-[var(--ivory)]/25 px-6 py-3 text-sm font-medium uppercase tracking-wide text-[var(--ivory)] transition hover:border-[var(--brass)] hover:text-[var(--brass)]"
            >
              Save image
            </a>
            <Button type="button" variant="outline" onClick={printSheet}>
              Print letter
            </Button>
          </div>

          {viewerOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-[max(1rem,env(safe-area-inset-top,0px))_max(1rem,env(safe-area-inset-right,0px))_max(1rem,env(safe-area-inset-bottom,0px))_max(1rem,env(safe-area-inset-left,0px))]"
              role="dialog"
              aria-modal="true"
              aria-label="Aftercare letter full view"
            >
              <button
                type="button"
                className="absolute right-4 top-4 text-sm uppercase tracking-widest text-[var(--ivory)]"
                onClick={() => setViewerOpen(false)}
              >
                Close
              </button>
              <div className="relative max-h-[90vh] w-full max-w-[8.5in] bg-white">
                <Image
                  src={OLD_NORTH_END_AFTERCARE_IMAGE}
                  alt="Old North End Tattoos aftercare instructions letter"
                  width={850}
                  height={1100}
                  className="h-auto w-full object-contain"
                  priority
                />
              </div>
            </div>
          )}

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="font-serif text-xl text-[var(--ivory)]">Traditional aftercare</h3>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[var(--ivory)]/75">
                {OLD_NORTH_END_AFTERCARE_TEXT.traditional.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="font-serif text-xl text-[var(--ivory)]">Second skin aftercare</h3>
              <p className="mt-2 text-sm text-[var(--brass)]">{OLD_NORTH_END_AFTERCARE_TEXT.secondSkinNote}</p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[var(--ivory)]/75">
                {OLD_NORTH_END_AFTERCARE_TEXT.secondSkin.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="border border-white/[0.08] p-5">
              <h4 className="text-xs uppercase tracking-[0.3em] text-[var(--brass)]">What to expect</h4>
              <ul className="mt-3 space-y-2 text-sm text-[var(--ivory)]/75">
                {OLD_NORTH_END_AFTERCARE_TEXT.whatToExpect.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <div className="border border-[var(--accent)]/40 bg-[var(--accent)]/5 p-5">
              <h4 className="text-xs uppercase tracking-[0.3em] text-[var(--brass)]">Questions or infection?</h4>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ivory)]/85">
                {OLD_NORTH_END_AFTERCARE_TEXT.infection}
              </p>
              <p className="mt-3 text-sm font-medium text-[var(--ivory)]">{OLD_NORTH_END_AFTERCARE_TEXT.warningSigns}</p>
            </div>
          </div>

          <figure className="mx-auto mt-10 w-full max-w-[11rem] overflow-hidden border border-white/[0.1] bg-white sm:max-w-[13rem] md:max-w-[15rem]">
            <Image
              src={OLD_NORTH_END_AFTERCARE_IMAGE}
              alt="Old North End Tattoos LLC aftercare instructions — traditional and second skin care on letter-sized sheet"
              width={850}
              height={1100}
              className="h-auto w-full object-contain object-top"
            />
            <figcaption className="bg-[#101010] px-3 py-2 text-center text-[10px] leading-snug text-[var(--ivory)]/50">
              {OLD_NORTH_END_AFTERCARE_TEXT.footer} — tap View aftercare or Print for full US Letter size.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
