import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CampusVipSignup } from "@/components/home/CampusVipSignup";
import { SITE_CONTAINER, SITE_SECTION_Y } from "@/lib/site-layout";

const BAR_HOURS = [
  "Tuesday–Thursday: 3:00 PM – 11:30 PM",
  "Friday–Saturday: 3:00 PM – 2:00 AM (following morning)",
  "Sunday & Monday: Closed except separately dated events",
];

const PROGRAMMING = [
  "Selected Monday Industry Nights (dated): guest bartenders, 6 PM–close (~11 PM). 15% off regular-price drinks for qualifying industry workers; no stacking.",
  "Tuesday: $3 Gringo tacos & $7 classic margaritas (within kitchen/bar service hours); open mic/comedy per current schedule.",
  "Wednesday karaoke: 7–11 PM.",
  "Thursday poker: free to play; gift-certificate prizes; 4 PM signup / 5 PM start (host schedule).",
  "Field Trip Fridays & Saturdays: drink specials and open-format DJs — no invented performer or price lists.",
];

export function TequilaBarPageSections() {
  return (
    <>
      <section className={`border-y border-white/[0.06] bg-[#0c0c0c] ${SITE_SECTION_Y}`}>
        <div className={SITE_CONTAINER}>
          <Reveal>
            <SectionHeading
              label="Campus"
              title="Bar, garden & cigar lounge"
              description="Family-friendly hospitality before 9 PM. Bar, restaurant, garden, and all patios are 21+ after 9 PM. Pet-friendly patios only — not tattoo procedure areas. Call ahead for cigar-lounge availability."
            />
            <ul className="mt-8 space-y-2 font-sans text-sm text-[var(--ivory)]/80">
              {BAR_HOURS.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="mt-6 rounded border border-[var(--brass)]/30 bg-[var(--brass)]/5 px-4 py-3 text-sm text-[var(--ivory)]/75">
              <strong>Saturday, October 17, 2026 anniversary:</strong> 3 PM – 2 AM Sunday (dated event — not regular
              Saturday hours). No unconfirmed performers, prices, or giveaways on the public site.
            </p>
          </Reveal>
        </div>
      </section>
      <section className={`${SITE_CONTAINER} ${SITE_SECTION_Y}`}>
        <Reveal>
          <SectionHeading label="Weekly" title="Programming" />
          <ul className="mt-6 space-y-4 font-sans text-sm leading-relaxed text-[var(--ivory)]/75">
            {PROGRAMMING.map((item) => (
              <li key={item} className="border-l-2 border-[var(--hub-teal)]/50 pl-4">{item}</li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-[var(--ivory)]/50">
            Drink menu and tequila selection PDFs publish when current approved masters are received.
          </p>
        </Reveal>
      </section>
      <CampusVipSignup />
    </>
  );
}
