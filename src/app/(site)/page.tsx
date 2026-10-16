import { HeroSection } from "@/components/home/HeroSection";
import { BusinessGrid } from "@/components/home/BusinessGrid";
import { HomeExperienceSection } from "@/components/home/HomeExperienceSection";
import { VisitSection, ContactSection } from "@/components/home/VisitContactSections";
import { MarqueeStrip } from "@/components/home/MarqueeStrip";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getGlobalSettings, getPublishedBusinesses, getApprovedBrandTestimonials } from "@/lib/data/public";
import { hasMongo } from "@/lib/env";
import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/env";
import { SITE_CONTAINER, SITE_SECTION_Y, SITE_SECTION_Y_LOOSE } from "@/lib/site-layout";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getGlobalSettings();
  return {
    title: s.seoDefaultTitle,
    description: s.seoDefaultDescription,
    alternates: { canonical: getSiteUrl() },
    openGraph: {
      title: s.seoDefaultTitle,
      description: s.seoDefaultDescription,
      url: getSiteUrl(),
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
      <HeroSection
        businesses={businesses.map((b) => ({ slug: b.slug, name: b.name }))}
        address={settings.address}
      />
      <MarqueeStrip />
      <HomeExperienceSection />

      <section className={`${SITE_CONTAINER} ${SITE_SECTION_Y_LOOSE}`}>
        <Reveal>
          <SectionHeading
            label="Explore"
            title="Five businesses. One door."
            description="Tap a tile to dive into tattoos, tacos, tequila, trims, or Ross Squad events & rentals."
          />
        </Reveal>
        <div className="mt-8 md:mt-14">
          <BusinessGrid businesses={businesses} />
        </div>
      </section>

      {settings.recognitions.length > 0 && (
        <section className={`border-y border-white/[0.06] bg-[#0c0c0c] ${SITE_SECTION_Y}`}>
          <div className={SITE_CONTAINER}>
            <SectionHeading label="Verified" title="Recognition" />
            <ul className="mt-10 space-y-6">
              {settings.recognitions.map((r) => (
                <li
                  key={r.title}
                  className="border-l-2 border-[var(--brass)] pl-6 transition hover:border-[#9e2a3a]"
                >
                  <p className="font-serif text-xl text-[var(--ivory)]">{r.title}</p>
                  {r.description && (
                    <p className="mt-1 font-sans text-sm text-[var(--ivory)]/55">{r.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className={SITE_SECTION_Y}>
          <div className={SITE_CONTAINER}>
            <SectionHeading label="Voices" title="Testimonials" />
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {testimonials.map((t) => (
                <blockquote
                  key={String(t._id)}
                  className="relative border border-white/[0.08] bg-[#0c0c0c] p-8 transition hover:border-white/15"
                >
                  <span className="font-serif text-5xl leading-none text-[#9e2a3a]/30" aria-hidden="true">
                    &ldquo;
                  </span>
                  <p className="mt-2 font-serif text-lg leading-relaxed text-[var(--ivory)]/85">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-5 font-sans text-sm uppercase tracking-widest text-[var(--brass)]">
                    — {t.customerName}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      <VisitSection address={settings.address} />
      <ContactSection email={settings.contactEmail} phone={settings.contactPhone} />
    </>
  );
}
