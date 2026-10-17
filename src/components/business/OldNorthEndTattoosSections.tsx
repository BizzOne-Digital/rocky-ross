import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { TattooAftercareSection } from "@/components/business/TattooAftercareSection";
import {
  OLD_NORTH_END_ADDRESS,
  OLD_NORTH_END_EMAIL,
  OLD_NORTH_END_HOURS,
  OLD_NORTH_END_PHONE_DISPLAY,
  OLD_NORTH_END_PHONE_RAW,
  OLD_NORTH_END_STYLES,
} from "@/lib/business-page-content/old-north-end-tattoos";
import { mapsDirectionsUrl, phoneHref, smsHref } from "@/lib/format";
import { SITE_CONTAINER, SITE_SECTION_Y } from "@/lib/site-layout";

type GalleryImage = { url: string; alt: string };

const TATTOO_VIP_SMS_BODY = encodeURIComponent(
  "VIP tattoo list - My name is [YOUR NAME] and my birthday is [MM/DD]",
);

export function OldNorthEndTattoosSections({ gallery }: { gallery: GalleryImage[] }) {
  const vipSms = `${smsHref(OLD_NORTH_END_PHONE_RAW)}&body=${TATTOO_VIP_SMS_BODY}`;

  return (
    <>
      <section className={`border-y border-white/[0.06] bg-[#0c0c0c] ${SITE_SECTION_Y}`}>
        <div className={SITE_CONTAINER}>
          <Reveal>
            <SectionHeading label="Ink" title="Styles & services" />
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--ivory)]/75">
              Across our team, we work in most major tattoo styles. A free consultation helps us match your idea with
              the right artist. We also offer coverups and help bring older tattoos back to life.
            </p>
            <ul className="mt-8 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
              {OLD_NORTH_END_STYLES.map((style) => (
                <li
                  key={style}
                  className="border border-white/[0.08] bg-[#101010] px-4 py-3 text-center font-sans text-sm text-[var(--ivory)]/85"
                >
                  {style}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className={`${SITE_CONTAINER} ${SITE_SECTION_Y}`}>
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <Reveal>
            <SectionHeading label="Start here" title="Have an idea?" />
            <p className="mt-6 font-sans text-sm leading-relaxed text-[var(--ivory)]/75 md:text-base">
              Bring your inspiration—we&apos;ll help develop a design that works for your placement, size, and skin.
            </p>
            <Button href="#inquiry" className="mt-8" variant="outline">
              Request a consultation
            </Button>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading label="How we work" title="Our approach" />
            <p className="mt-6 font-sans text-sm leading-relaxed text-[var(--ivory)]/75 md:text-base">
              We take pride in honest advice, thoughtful placement, and tattoos designed to age well. If something needs
              adjusting, we&apos;ll explain why.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="gallery" className={`border-t border-white/[0.06] bg-[#0a0a0a] ${SITE_SECTION_Y}`}>
        <div className={SITE_CONTAINER}>
          <Reveal>
            <SectionHeading label="Portfolio" title="Gallery" />
            {gallery.length > 0 ? (
              <div
                className={`mt-8 grid gap-4 ${
                  gallery.length <= 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 md:grid-cols-3"
                }`}
              >
                {gallery.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-[4/5] overflow-hidden border border-white/[0.08] bg-[#121212]"
                  >
                    <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="33vw" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-6 max-w-2xl text-sm text-[var(--ivory)]/55">
                Real tattoo work and shop photography will appear here when final gallery originals are confirmed in our
                handoff set. We are not using stock or generated tattoo images as substitutes.
              </p>
            )}
          </Reveal>
        </div>
      </section>

      <section className={`${SITE_CONTAINER} ${SITE_SECTION_Y}`}>
        <Reveal>
          <SectionHeading label="Shop culture" title="Experiences & events" />
          <ul className="mt-6 space-y-4 text-sm leading-relaxed text-[var(--ivory)]/75">
            <li>
              <strong className="text-[var(--ivory)]">Get What You Get gumball machine</strong> — surprise designs for
              guests who want a fun, spontaneous piece.
            </li>
            <li>
              <strong className="text-[var(--ivory)]">Good Luck Gong tradition</strong> — celebrate milestones with our
              shop ritual.
            </li>
            <li>
              <strong className="text-[var(--ivory)]">Tattoo parties & groups</strong> — contact us to plan a party;
              inquiries do not automatically reserve the shop.
            </li>
            <li>
              <strong className="text-[var(--ivory)]">Monthly discounted flash events</strong> — dates and details
              announced through our channels; no unapproved package prices on this site.
            </li>
          </ul>
          <div className="mt-10 rounded border border-[var(--brass)]/30 bg-[var(--brass)]/5 p-6">
            <p className="font-serif text-lg text-[var(--ivory)]">VIP text list (opt-in)</p>
            <p className="mt-2 text-sm text-[var(--ivory)]/70">
              Get flash drops and event news. Text us to opt in—submitting a consultation form does not enroll you
              automatically.
            </p>
            <a
              href={vipSms}
              className="mt-4 inline-flex text-sm font-medium text-[var(--brass)] underline"
            >
              Text {OLD_NORTH_END_PHONE_DISPLAY} to join the VIP list
            </a>
          </div>
        </Reveal>
      </section>

      <section className={`border-y border-white/[0.06] bg-[#0c0c0c] ${SITE_SECTION_Y}`}>
        <div className={SITE_CONTAINER}>
          <Reveal>
            <SectionHeading label="New clients" title="First tattoo & booking" />
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--ivory)]/75">
              First tattoo? We&apos;ll walk you through the process, answer your questions, and help you feel comfortable
              from consultation through aftercare.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--ivory)]/75">
              Walk-ins are welcome; appointments are recommended to reduce waiting and help match you with the right
              artist.
            </p>
            <p className="mt-6 border-l-2 border-[var(--accent)]/50 pl-4 text-sm text-[var(--ivory)]/80">
              <strong>Booking note:</strong> Submitting an inquiry doesn&apos;t reserve an appointment. We&apos;ll contact
              you to discuss your tattoo and confirm the details.
            </p>
          </Reveal>
        </div>
      </section>

      <TattooAftercareSection />
    </>
  );
}

export function OldNorthEndContactSection() {
  return (
      <section className={`${SITE_CONTAINER} ${SITE_SECTION_Y}`}>
        <Reveal>
          <SectionHeading label="Visit" title="Contact, hours & policies" />
          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <div className="space-y-3 text-sm text-[var(--ivory)]/80">
              <p className="font-serif text-lg text-[var(--ivory)]">Old North End Tattoos LLC</p>
              <p>{OLD_NORTH_END_ADDRESS}</p>
              <p>
                <a href={phoneHref(OLD_NORTH_END_PHONE_RAW)} className="text-[var(--brass)]">
                  Call / text {OLD_NORTH_END_PHONE_DISPLAY}
                </a>
              </p>
              <p>
                <a href={`mailto:${OLD_NORTH_END_EMAIL}`} className="text-[var(--brass)]">{OLD_NORTH_END_EMAIL}</a>
              </p>
              <a href={mapsDirectionsUrl(OLD_NORTH_END_ADDRESS)} className="inline-block text-[var(--ivory)]/70 underline">
                Map & directions
              </a>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.35em] text-[var(--brass)]">Tattoo shop hours</h3>
              <ul className="mt-4 space-y-2 text-sm text-[var(--ivory)]/75">
                {OLD_NORTH_END_HOURS.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-[var(--ivory)]/55">
                Hours may vary for weather and holidays; please call ahead. Restaurant and bar hours do not apply to the
                tattoo shop.
              </p>
            </div>
          </div>
          <div className="mt-10 space-y-6 border-t border-white/[0.06] pt-10 text-sm leading-relaxed text-[var(--ivory)]/75">
            <div>
              <h3 className="text-xs uppercase tracking-[0.35em] text-[var(--brass)]">Age policy (shop policy)</h3>
              <p className="mt-3">
                18+ with valid photo ID. Ages 16–17 require in-person written parent or legal-guardian consent, required
                identification and relationship documents, and the guardian present in the procedure area throughout the
                session.
              </p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.35em] text-[var(--brass)]">Safety</h3>
              <p className="mt-3">
                No alcohol before your tattoo — this is a safety rule. We do not promote alcohol in connection with tattoo
                services.
              </p>
            </div>
            <p className="text-xs text-[var(--ivory)]/45">
              Verified shop social links publish when supplied. Explore other Inked &amp; Infused businesses from the site
              menu.
            </p>
            <Link href="/" className="inline-block text-[var(--brass)] underline">
              Back to campus home
            </Link>
          </div>
        </Reveal>
      </section>
  );
}
