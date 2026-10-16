import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { BusinessSupplement } from "@/lib/business-supplement";
import { SITE_CONTAINER, SITE_SECTION_Y } from "@/lib/site-layout";

export function BusinessSupplementSections({ data }: { data: BusinessSupplement }) {
  return (
    <section className={`border-y border-white/[0.06] bg-[#0c0c0c] ${SITE_SECTION_Y}`}>
      <div className={SITE_CONTAINER}>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading label="Highlights" title={data.highlights.title} />
            <ul className="mt-6 space-y-4">
              {data.highlights.items.map((item) => (
                <li key={item} className="flex gap-3 font-sans text-sm leading-relaxed text-[var(--ivory)]/70">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--brass)]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading label="Plan ahead" title={data.goodToKnow.title} />
            <ul className="mt-6 space-y-4">
              {data.goodToKnow.items.map((item) => (
                <li key={item} className="flex gap-3 font-sans text-sm leading-relaxed text-[var(--ivory)]/70">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#9e2a3a]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        {data.experience && (
          <Reveal delay={0.12}>
            <p className="mt-10 max-w-3xl border-t border-white/[0.08] pt-8 font-serif text-xl font-light italic leading-relaxed text-[var(--ivory)]/80 md:mt-16 md:pt-10 md:text-2xl">
              {data.experience}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
