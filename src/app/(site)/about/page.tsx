import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowUpRight, DiamondStar } from "@/components/icons/UiIcons";
import { getGlobalSettings, getPublishedBusinesses } from "@/lib/data/public";
import { mapsDirectionsUrl } from "@/lib/format";
import { BRAND } from "@/lib/constants";
import { getSiteUrl } from "@/lib/env";
import type { Metadata } from "next";
import { SITE_CONTAINER, SITE_SECTION_Y } from "@/lib/site-layout";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getGlobalSettings();
  return {
    title: `About ${s.destinationName}`,
    description: s.homepageIntro,
    alternates: { canonical: `${getSiteUrl()}/about` },
  };
}

export default async function AboutPage() {
  const settings = await getGlobalSettings();
  const businesses = await getPublishedBusinesses();

  return (
    <div className="min-w-0 overflow-x-clip">
      <section className="relative min-h-[48vh] overflow-hidden pt-24 sm:min-h-[55vh] sm:pt-28 md:pt-32">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[70%_center] opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/95 via-[#080808]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] to-transparent" />
        <div className={`relative ${SITE_CONTAINER} pb-10 md:pb-16`}>
          <Reveal>
            <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[var(--brass)]">
              {settings.brandName}
            </p>
            <h1 className="mt-4 font-serif text-[clamp(2.5rem,7vw,4.5rem)] font-medium leading-[1.02] text-[var(--ivory)]">
              About {settings.destinationName}
            </h1>
            <p className="mt-6 max-w-2xl font-serif text-xl font-light italic text-[var(--ivory)]/70">
              {settings.homepageIntro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className={`border-y border-white/[0.06] bg-[#0c0c0c] ${SITE_SECTION_Y}`}>
        <div className={SITE_CONTAINER}>
          <Reveal>
            <SectionHeading
              label="The concept"
              title={settings.tagline}
              description="A Colorado Springs destination where custom ink, bold flavors, tequila-led drinks, fresh cuts, and Ross Squad events live under one creative umbrella."
            />
          </Reveal>
          <div className="mt-8 grid gap-6 md:mt-14 md:grid-cols-3 md:gap-8">
            {[
              {
                title: "On property",
                text: "Tattoos, tacos, tequila, and trims at 2125 N Weber St. — explore each business for hours, menus, and requests.",
              },
              {
                title: "Beyond the door",
                text: "Ross Squad DJs and event equipment serve weddings, parties, and corporate events across the region — not only on-site.",
              },
              {
                title: "Rocky Ross Productions",
                text: `Parent brand behind ${settings.destinationName}. Organization contact is shared; each business can list its own details in admin.`,
              },
            ].map((card) => (
              <article
                key={card.title}
                className="border border-white/[0.08] bg-[#101010] p-8 transition hover:border-white/15"
              >
                <h3 className="font-serif text-2xl text-[var(--ivory)]">{card.title}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--ivory)]/60">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${SITE_CONTAINER} ${SITE_SECTION_Y}`}>
        <SectionHeading
          label="Choose your experience"
          title="Five businesses"
          description="Each has its own page with services, galleries, and inquiry forms."
        />
        <ul className="mt-8 space-y-3 md:mt-12 md:space-y-4">
          {businesses.map((b) => (
            <li key={b.slug}>
              <Link
                href={`/${b.slug}`}
                className="group flex flex-col gap-2 border border-white/[0.08] bg-[#0c0c0c] p-6 transition hover:border-[#9e2a3a]/40 md:flex-row md:items-center md:justify-between md:p-8"
              >
                <div>
                  <p className="font-serif text-2xl text-[var(--ivory)]">{b.name}</p>
                  <p className="mt-2 max-w-xl font-sans text-sm text-[var(--ivory)]/55">{b.shortDescription}</p>
                </div>
                <span className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.22em] text-[var(--brass)]">
                  View page
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="visit" className={`border-t border-white/[0.06] bg-[#0c0c0c] ${SITE_SECTION_Y}`}>
        <div className={SITE_CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <SectionHeading
              label="Location"
              title="Visit us"
              description={settings.address}
            />
            <div className="flex flex-col gap-4">
              <a
                href={mapsDirectionsUrl(settings.address)}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-[#ebe6dc] px-7 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1a1a1a]"
              >
                Get directions
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <p className="font-sans text-sm text-[var(--ivory)]/45">
                {BRAND.destination} · {settings.contactEmail}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-8 md:py-12">
        <div className={`${SITE_CONTAINER} flex flex-wrap items-center justify-center gap-3 font-sans text-[12px] text-[var(--ivory)]/50 md:gap-4`}>
          <Link href="/" className="hover:text-[var(--ivory)]">The Hub</Link>
          {businesses.map((b) => (
            <span key={b.slug} className="inline-flex items-center gap-4">
              <DiamondStar className="h-1.5 w-1.5 text-[#9e2a3a]" />
              <Link href={`/${b.slug}`} className="hover:text-[var(--ivory)]">{b.name}</Link>
            </span>
          ))}
          <DiamondStar className="h-1.5 w-1.5 text-[#9e2a3a]" />
          <Link href="/#contact" className="hover:text-[var(--ivory)]">Contact</Link>
        </div>
      </section>
    </div>
  );
}
