import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE_CONTAINER, SITE_SECTION_Y } from "@/lib/site-layout";

const KITCHEN_HOURS = [
  "Tuesday–Thursday: 4:00 PM – 8:30 PM",
  "Friday–Saturday: 4:00 PM – 9:00 PM",
  "Sunday & Monday: Closed (regular schedule)",
];

export function ElGringosPageSections({ orderUrl }: { orderUrl?: string }) {
  return (
    <>
      <section className={`border-y border-white/[0.06] bg-[#0c0c0c] ${SITE_SECTION_Y}`}>
        <div className={SITE_CONTAINER}>
          <Reveal>
            <SectionHeading label="Hours" title="Kitchen service" />
            <p className="mt-4 font-sans text-sm text-[var(--ivory)]/60">
              Kitchen closing is listed separately from bar closing. Special event food times are posted only when
              confirmed.
            </p>
            <ul className="mt-6 space-y-2 font-sans text-sm text-[var(--ivory)]/80">
              {KITCHEN_HOURS.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      <section className={`${SITE_CONTAINER} ${SITE_SECTION_Y}`}>
        <Reveal>
          <SectionHeading label="Recognition" title="Best Taqueria" />
          <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-[var(--ivory)]/75">
            El Gringo&apos;s Tacos earned <strong>2026 Gazette Best of the Springs Gold — Best Taqueria</strong>.
            Restaurant awards are listed separately from DJ or production awards.
          </p>
          {orderUrl ? (
            <a
              href={orderUrl}
              className="mt-8 inline-flex rounded-full border border-[var(--brass)] px-6 py-3 font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--brass)]"
              rel="noopener noreferrer"
              target="_blank"
            >
              Order food (verified link)
            </a>
          ) : (
            <p className="mt-6 text-sm text-[var(--ivory)]/50">
              Online ordering link will appear here once ElGringosTacos.com checkout URL is verified — not a
              placeholder.
            </p>
          )}
          <p className="mt-4 text-sm text-[var(--ivory)]/50">
            Current menu PDF and allergen wording will publish when final menu masters are supplied.
          </p>
          <p className="mt-4 text-sm text-[var(--ivory)]/70">
            Catering and group food inquiries: use the{" "}
            <a href="#inquiry" className="text-[var(--brass)] underline">contact form</a> below — not a confirmed order.
          </p>
        </Reveal>
      </section>
    </>
  );
}
