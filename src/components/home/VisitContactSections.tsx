import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { ArrowUpRight, MapPin } from "@/components/icons/UiIcons";
import { mapsDirectionsUrl } from "@/lib/format";
import { SITE_CONTAINER, SITE_SECTION_Y_LOOSE } from "@/lib/site-layout";

export function VisitSection({ address }: { address: string }) {
  return (
    <section id="visit" className={`relative ${SITE_CONTAINER} ${SITE_SECTION_Y_LOOSE}`}>
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading
            label="Find us"
            title="Visit Inked & Infused"
            description="Pull up to 2125 N Weber St. — tattoos, tacos, tequila, trims, and good energy under one roof."
          />
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
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-[var(--brass)]">Address</p>
              <p className="mt-2 font-serif text-2xl text-[var(--ivory)]">{address}</p>
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
      <div className={`relative grid gap-10 lg:grid-cols-2 lg:gap-16 ${SITE_CONTAINER} ${SITE_SECTION_Y_LOOSE}`}>
        <Reveal>
          <SectionHeading
            label="Reach out"
            title="General inquiry"
            description="Questions about the destination or which business fits your plans? We’ll route your message to the right team."
          />
          <p className="mt-8 font-sans text-sm text-[var(--ivory)]/45">
            Organization contact:{" "}
            <a href={`mailto:${email}`} className="text-[var(--brass)] hover:underline">{email}</a>
            {" · "}
            <a href={`tel:${phone.replace(/\D/g, "")}`} className="text-[var(--brass)] hover:underline">{phone}</a>
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
          <div className="border border-white/[0.08] bg-[#0c0c0c]/80 p-6 backdrop-blur-sm md:p-10">
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
