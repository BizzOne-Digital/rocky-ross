import { HubHeroSection } from "@/components/home/HubHeroSection";
import { BusinessGrid } from "@/components/home/BusinessGrid";
import { VisitSection, ContactSection } from "@/components/home/VisitContactSections";
import { CampusVipSignup } from "@/components/home/CampusVipSignup";
import { DiamondStar } from "@/components/icons/UiIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getGlobalSettings, getPublishedBusinesses, getApprovedBrandTestimonials } from "@/lib/data/public";
import { hasMongo } from "@/lib/env";
import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/env";
import { SITE_CONTAINER, SITE_SECTION_Y } from "@/lib/site-layout";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getGlobalSettings();
  const canonical = getSiteUrl();
  return {
    title: s.seoDefaultTitle,
    description: s.seoDefaultDescription,
    alternates: { canonical },
    openGraph: {
      title: s.seoDefaultTitle,
      description: s.seoDefaultDescription,
      url: canonical,
    },
  };
}

export default async function HomePage() {
  const settings = await getGlobalSettings();
  const businesses = await getPublishedBusinesses();
  const testimonials = await getApprovedBrandTestimonials();

  return (
    <>
      {!hasMongo() && (
        <div className="bg-[var(--burgundy)] px-4 py-2 text-center text-xs uppercase tracking-widest text-[var(--ivory)]">
          Preview mode — connect MongoDB for live content & form storage
        </div>
      )}
      <HubHeroSection
        brandName={settings.brandName}
        destinationName={settings.destinationName}
        address={settings.address}
      />

      <section
        id="businesses"
        className={`${SITE_CONTAINER} border-b border-[var(--brass)]/15 bg-[#030304] pb-10 pt-4 md:pb-14 md:pt-6`}
        aria-label="Choose a service"
      >
        <BusinessGrid businesses={businesses} />
        <p className="mt-10 flex justify-center text-[var(--brass)]" aria-hidden="true">
          <DiamondStar className="h-3 w-3" />
        </p>
      </section>

      {testimonials.length > 0 && (
        <section className={`border-t border-white/[0.06] bg-[#0c0c0c] ${SITE_SECTION_Y}`}>
          <div className={SITE_CONTAINER}>
            <SectionHeading label="Voices" title="Testimonials" />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {testimonials.map((t) => (
                <blockquote
                  key={String(t._id)}
                  className="border border-white/[0.08] bg-[#101010] p-6 md:p-8"
                >
                  <p className="font-serif text-lg leading-relaxed text-[var(--ivory)]/85">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-4 font-sans text-sm uppercase tracking-widest text-[var(--brass)]">
                    — {t.customerName}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      <CampusVipSignup />
      <VisitSection address={settings.address} />
      <ContactSection email={settings.contactEmail} phone={settings.contactPhone} />
    </>
  );
}
