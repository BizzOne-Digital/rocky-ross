import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BusinessContactActions } from "@/components/business/BusinessContactActions";
import { OWNER_CONTACTS } from "@/lib/owner-contacts";
import { SITE_CONTAINER, SITE_SECTION_Y } from "@/lib/site-layout";

const PLANNED_MENU = [
  "Kids' cuts $25 (age cutoff to be confirmed)",
  "Adult cuts $35",
  "Skin / razor fades $40",
  "Beard trim / shaping $15",
  "Mustache or eyebrow trim $5 with haircut, or $10 alone",
  "Hot-towel finish +$5",
  "Steam / hot-towel treatment +$10",
  "Brief neck / shoulder relaxation finish +$5",
  "Haircut + beard package $50",
  "Haircut, beard, eyebrows & hot towel/steam $60",
  "Same with relaxation finish $65",
];

export function TrimsPageSections() {
  return (
    <section className={`border-y border-white/[0.06] bg-[#0c0c0c] ${SITE_SECTION_Y}`}>
      <div className={SITE_CONTAINER}>
        <Reveal>
          <SectionHeading
            label="Status"
            title="Opening soon"
            description="Under construction and hiring. No fixed opening date, active appointment promises, or individual barber profiles for this launch."
          />
          <p className="mt-4 font-sans text-sm text-[var(--ivory)]/70">
            Planned hours: Tuesday–Saturday 10:30 AM – 7:00 PM. Booking buttons can be swapped for a future third-party
            link — no custom booking engine.
          </p>
          <BusinessContactActions
            phone={OWNER_CONTACTS.ownerPhone}
            phoneDisplay={OWNER_CONTACTS.ownerPhoneDisplay}
          />
          <SectionHeading label="Planned menu" title="Services & pricing" />
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {PLANNED_MENU.map((item) => (
              <li key={item} className="border border-white/[0.08] px-4 py-3 text-sm text-[var(--ivory)]/80">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-[var(--ivory)]/50">
            Confirm kids&apos; age cutoff and treatment availability before bookings go live. No coloring, dye, or salon
            services.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
