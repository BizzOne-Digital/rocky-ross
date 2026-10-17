import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { ArrowUpRight, MapPin } from "@/components/icons/UiIcons";
import { mapsDirectionsUrl, phoneHref } from "@/lib/format";
import { OWNER_CONTACTS } from "@/lib/owner-contacts";
import { SITE_CONTAINER, SITE_SECTION_Y_LOOSE } from "@/lib/site-layout";

export function VisitSection({ address }: { address: string }) {
  const campus = OWNER_CONTACTS.campus;
  return (
    <section id="visit" className={`relative ${SITE_CONTAINER} ${SITE_SECTION_Y_LOOSE}`}>
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading
            label="Find us"
            title="Visit Inked & Infused"
            description="Campus restaurant, bar, beer garden and patios at 2125 N Weber St. Tattoo and TRIMS entrance at 2123 N Weber St."
          />
          <div className="mt-6 space-y-2 font-sans text-sm text-[var(--ivory)]/75">
            <p className="text-pretty">{campus.address}</p>
            <p className="break-words">
              <a href={phoneHref(campus.phone)} className="text-[var(--brass)]">
                {campus.phoneDisplay}
              </a>
              <span className="mx-1 hidden sm:inline">·</span>
              <a href={`mailto:${campus.email}`} className="block break-all text-[var(--brass)] sm:inline">
                {campus.email}
              </a>
            </p>
            <p className="text-[var(--ivory)]/50">
              Instagram{" "}
              <a
                href={campus.instagram}
                className="text-[var(--brass)] underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                @inkedandinfusedcos
              </a>
            </p>
          </div>
          <a
            href={mapsDirectionsUrl(address)}
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-[var(--brass)]/50 px-7 py-3.5 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--brass)] transition hover:bg-[var(--brass)]/10 hover:border-[var(--brass)]"
          >
            <MapPin className="h-4 w-4" />
            Open in Google Maps
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-[#121212]">
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage: "url(/images/hero-bg.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "70% center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/40" />
            <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8">
              <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-[var(--brass)] sm:tracking-[0.35em]">
                Campus address
              </p>
              <p className="mt-2 text-pretty font-serif text-xl text-[var(--ivory)] sm:text-2xl">{address}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ContactSection({
  email,
  phone,
}: {
  email: string;
  phone: string;
}) {
  return (
    <section id="contact" className="relative border-t border-white/[0.08]">
      <div
        className="absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 20% 100%, rgba(158,42,58,0.15) 0%, transparent 50%)",
        }}
      />
      <div className={`relative grid min-w-0 gap-10 lg:grid-cols-2 lg:gap-16 ${SITE_CONTAINER} ${SITE_SECTION_Y_LOOSE}`}>
        <Reveal>
          <SectionHeading
            label="Reach out"
            title="General inquiry"
            description="Questions about the campus or which business fits your plans? We route messages to the right team."
          />
          <p className="mt-8 font-sans text-sm text-[var(--ivory)]/45">
            Project / web:{" "}
            <a href={`mailto:${email}`} className="break-all text-[var(--brass)] hover:underline">{email}</a>
            <br />
            Campus call/text:{" "}
            <a href={phoneHref(phone)} className="text-[var(--brass)] hover:underline">
              {OWNER_CONTACTS.campus.phoneDisplay}
            </a>
            <span className="mx-1 hidden sm:inline">·</span>
            <span className="mt-1 block sm:mt-0 sm:inline">
              Owner:{" "}
              <a href={phoneHref(OWNER_CONTACTS.ownerPhone)} className="text-[var(--brass)] hover:underline">
                {OWNER_CONTACTS.ownerPhoneDisplay}
              </a>
            </span>
          </p>
          <Link
            href="/#businesses"
            className="mt-8 inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.22em] text-[var(--ivory)]/50 transition hover:text-[var(--ivory)]"
          >
            Or jump to a specific business
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="min-w-0 border border-white/[0.08] bg-[#0c0c0c]/80 p-4 backdrop-blur-sm sm:p-6 md:p-10">
            <InquiryForm
              type="general"
              fields={[{ name: "message", label: "How can we help?", type: "long", required: true }]}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
