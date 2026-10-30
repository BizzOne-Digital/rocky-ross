import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/icons/Arrow";
import { ArrowUpRight, DiamondStar } from "@/components/icons/UiIcons";
import type { BusinessTileCopy } from "@/lib/business-tile-copy";
import {
  BUSINESS_TILE_COPY,
  BUSINESS_TILE_PRIMARY_NAME,
  HOMEPAGE_TILE_ORDER,
} from "@/lib/business-tile-copy";
import type { BusinessSlug } from "@/lib/business-slugs";
import { mapsDirectionsUrl, phoneHref, smsHref } from "@/lib/format";
import { CAMPUS_LOGO_SRC } from "@/lib/constants";
import { HUB_CAMPUS_SERVICE_LINE } from "@/lib/hub-home-copy";
import {
  HOMEPAGE_MOCKUP,
  getMockupLogoImage,
  getMockupTileImage,
} from "@/lib/homepage-mockup-assets";
import { OWNER_CONTACTS } from "@/lib/owner-contacts";
import {
  HOMEPAGE_BUSINESS_HOURS,
  HOMEPAGE_CAMPUS_FACEBOOK,
  HOMEPAGE_HERO_INTRO,
  HOMEPAGE_SERVICE_CARDS_INTRO,
  HOMEPAGE_VIP_SMS_EXAMPLE,
} from "@/lib/homepage-mockup-content";
import { SITE_CONTAINER, SITE_PAGE_SHELL } from "@/lib/site-layout";
import { HomepageReviewsPicker } from "@/components/home/HomepageReviewsPicker";

const TILE_CATEGORY_ACCENT: Record<BusinessSlug, string> = {
  "ross-squad-djs-event-rentals": "text-[var(--hub-teal)]",
  "old-north-end-tattoos": "text-[var(--hub-teal)]",
  "el-gringos-tacos": "text-[#e85d4a]",
  "tequila-chilladas-bar": "text-[#e85d4a]",
  "trims-barbershop": "text-[var(--hub-teal)]",
};

function formatCategoryLine(slug: BusinessSlug, copy: BusinessTileCopy) {
  if (slug === "ross-squad-djs-event-rentals") return copy.headline;
  return `— ${copy.headline} —`;
}

const HERO_SERVICE_COLOR: Record<(typeof HUB_CAMPUS_SERVICE_LINE)[number], string> = {
  TRIMS: "text-[var(--hub-teal)]",
  TATTOOS: "text-[var(--ivory)]",
  TACOS: "text-[#e85d4a]",
  TEQUILA: "text-[#e8c547]",
  TUNES: "text-[#6eb5e8]",
};

function MockupGoldButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex max-w-full items-center justify-center gap-2 whitespace-normal border border-[var(--brass)] bg-black/50 px-3 py-2.5 text-center font-sans text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--ivory)] backdrop-blur-sm transition hover:bg-[var(--brass)]/15 sm:px-5 sm:text-[10px] sm:tracking-[0.22em] md:px-6 md:text-[11px] ${className}`}
    >
      {children}
    </Link>
  );
}

function MockupTealButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 border border-[var(--hub-teal)] bg-black/30 px-5 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--hub-teal)] backdrop-blur-sm transition hover:bg-[var(--hub-teal)]/10 sm:px-6 sm:text-[11px] ${className}`}
    >
      {children}
    </Link>
  );
}

/** SS2 teal smoke — shared behind Find your fun → footer */
function HomepageLowerSmokeBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <Image
        src={HOMEPAGE_MOCKUP.lowerSmokeBg}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
    </div>
  );
}

/** Full supplied artwork — no aggressive crop (garden, merch, campus banner). */
function MockupArtworkBand({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <section className={`relative z-10 w-full bg-black ${className}`}>
      <div className={`${SITE_CONTAINER} py-6 md:py-8`}>
        <div className="relative mx-auto w-full max-w-5xl overflow-hidden border border-[var(--brass)]/45 bg-black/80">
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={900}
            className="h-auto w-full object-contain object-center"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority={priority}
          />
        </div>
      </div>
    </section>
  );
}

function VisitSectionSmokeBg() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <Image
        src={HOMEPAGE_MOCKUP.lowerSmokeBg}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_45%,rgba(0,0,0,0.35),rgba(0,0,0,0.72))]"
      />
    </div>
  );
}

export function HomepageMockupView({ brandName }: { brandName: string }) {
  const vipBody = encodeURIComponent(HOMEPAGE_VIP_SMS_EXAMPLE);
  const vipSms = `${smsHref(OWNER_CONTACTS.vipSms.phone)}&body=${vipBody}`;

  return (
    <div className={`${SITE_PAGE_SHELL} bg-[#030304] text-[var(--ivory)]`}>
      {/* —— Hero (SS1 layout · SS2 collage bg + teal smoke) —— */}
      <section className="relative w-full overflow-hidden bg-black">
        <Image
          src={HOMEPAGE_MOCKUP.findFunBg}
          alt=""
          fill
          className="object-cover object-center opacity-85"
          priority
          sizes="100vw"
        />
        <Image
          src={HOMEPAGE_MOCKUP.heroBg}
          alt=""
          fill
          className="object-cover object-[62%_38%] sm:object-[68%_42%] md:object-[72%_45%]"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/75 via-[#061210]/55 to-black/85"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_38%,rgba(46,196,188,0.18),transparent_60%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-1/2 top-[42%] z-0 h-[min(52vw,22rem)] w-[min(52vw,22rem)] -translate-x-1/2 -translate-y-1/2 opacity-[0.14]"
          aria-hidden="true"
        >
          <div className="relative h-full w-full">
            <Image src={HOMEPAGE_MOCKUP.heroRrLogo} alt="" fill className="object-contain" sizes="320px" />
          </div>
        </div>

        <div className="relative z-[1]">
          <header className="border-b border-white/10 bg-black">
            <div className={`${SITE_CONTAINER} flex flex-wrap items-center justify-between gap-3 py-3 sm:gap-4`}>
              <Link href="/" className="flex min-w-0 items-center gap-3 sm:gap-4">
                <Image
                  src={CAMPUS_LOGO_SRC}
                  alt=""
                  width={120}
                  height={56}
                  className="h-10 w-auto max-w-[4.5rem] object-contain object-left sm:h-12 sm:max-w-[5.5rem]"
                  priority
                />
                <div className="min-w-0 text-left">
                  <p className="hero-gold-serif truncate font-serif text-base font-semibold leading-tight sm:text-lg md:text-xl">
                    {brandName}
                  </p>
                  <p className="mt-0.5 font-sans text-[8px] font-medium uppercase tracking-[0.28em] text-[var(--ivory)]/90 sm:text-[9px]">
                    A.K.A. The Double R Group
                  </p>
                </div>
              </Link>

              <nav
                className="hidden flex-1 flex-wrap items-center justify-center gap-x-6 gap-y-2 font-serif text-[13px] tracking-wide text-[var(--ivory)]/95 lg:flex xl:gap-x-8 xl:text-sm"
                aria-label="Primary"
              >
                <Link href="/#businesses" className="transition hover:text-[var(--hub-teal)]">Our Businesses</Link>
                <Link href="/tequila-chilladas-bar" className="transition hover:text-[var(--hub-teal)]">Trail Garden</Link>
                <span className="text-[var(--ivory)]/45">Merch</span>
                <Link href="/#hours" className="transition hover:text-[var(--hub-teal)]">Hours &amp; Location</Link>
              </nav>

              <Link
                href="/#contact"
                className="inline-flex shrink-0 items-center gap-1.5 border border-[var(--brass)] px-3 py-2 font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--ivory)] sm:text-[10px]"
              >
                Contact Rocky
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </header>

          <div className={`${SITE_CONTAINER} min-w-0 pb-8 pt-6 text-center sm:pb-10 sm:pt-8 md:pb-12`}>
            <div className="mx-auto min-w-0 max-w-3xl">
              <Image
                src={CAMPUS_LOGO_SRC}
                alt=""
                width={140}
                height={64}
                className="mx-auto h-12 w-auto max-w-[5.5rem] object-contain sm:h-14 sm:max-w-[6.5rem]"
                priority
              />
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--hub-teal)] sm:text-xs sm:tracking-[0.34em]">
                A.K.A. The Double R Group
              </p>
              <h1 className="hero-gold-serif mt-2 font-serif text-[clamp(1.85rem,5.5vw,3.25rem)] font-semibold leading-[1.05]">
                {brandName}
              </h1>
              <p className="hero-inked-title mt-2 break-words font-serif text-[clamp(1.75rem,6vw,4rem)] font-semibold uppercase leading-[0.98]">
                Inked <span className="text-[var(--hub-teal)]">&</span> Infused
              </p>
              <p className="mt-1 font-serif text-[clamp(1.1rem,3.2vw,2rem)] font-medium uppercase tracking-[0.14em] text-[var(--ivory)] sm:tracking-[0.22em] md:tracking-[0.3em]">
                Fun Hub
              </p>
              <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-sans text-[11px] font-bold uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.2em]">
                {HUB_CAMPUS_SERVICE_LINE.map((word, i) => (
                  <span key={word} className="inline-flex items-center gap-2">
                    {i > 0 && <span className="text-[var(--ivory)]">•</span>}
                    <span className={HERO_SERVICE_COLOR[word]}>{word}</span>
                  </span>
                ))}
              </p>
              <p className="mt-3 font-serif text-sm font-medium uppercase tracking-[0.22em] text-[var(--ivory)] sm:text-base sm:tracking-[0.28em]">
                All Under One Roof.
              </p>
              <p className="mx-auto mt-4 max-w-2xl font-serif text-base leading-relaxed text-[var(--ivory)]/95 sm:text-lg">
                {HOMEPAGE_HERO_INTRO}
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                <MockupGoldButton href="#businesses">
                  Explore our businesses
                  <ArrowIcon className="h-3.5 w-3.5" />
                </MockupGoldButton>
                <MockupTealButton href="#visit">
                  Plan your visit
                  <ArrowIcon className="h-3.5 w-3.5" />
                </MockupTealButton>
              </div>
            </div>
          </div>

          <nav
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-white/10 bg-black/80 px-4 py-3 font-serif text-xs text-[var(--ivory)]/90 lg:hidden"
            aria-label="Mobile"
          >
            <Link href="/#businesses">Our Businesses</Link>
            <Link href="/tequila-chilladas-bar">Trail Garden</Link>
            <Link href="/#hours">Hours &amp; Location</Link>
          </nav>
        </div>
      </section>

      {/* —— Find your fun → footer (shared SS2 smoke behind) —— */}
      <div className={`relative isolate ${SITE_PAGE_SHELL}`}>
        <HomepageLowerSmokeBackdrop />

        <section
          id="businesses"
          className="relative z-10 border-y border-[var(--brass)]/40 py-8 md:py-12"
        >
          <div className="pointer-events-none absolute inset-0 z-0 bg-black/35" aria-hidden="true" />
          <div className={`relative z-[1] ${SITE_CONTAINER}`}>
          <header className="text-center">
            <div className="mb-6 flex items-center justify-center gap-3" aria-hidden="true">
              <span className="h-px w-12 bg-[var(--brass)]/60 sm:w-20" />
              <DiamondStar className="h-2.5 w-2.5 text-[var(--brass)]" />
              <span className="h-px w-12 bg-[var(--brass)]/60 sm:w-20" />
            </div>
            <h2 className="font-serif text-[clamp(1.85rem,5vw,2.85rem)] font-medium leading-tight text-[var(--brass)]">
              Find your kind of fun.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl font-serif text-base leading-relaxed text-[var(--ivory)]/92 sm:text-lg">
              {HOMEPAGE_SERVICE_CARDS_INTRO}
            </p>
            <div className="mx-auto mt-6 flex items-center justify-center gap-3" aria-hidden="true">
              <span className="h-px w-16 bg-[var(--brass)]/50 sm:w-28" />
              <DiamondStar className="h-2 w-2 text-[var(--brass)]/80" />
              <span className="h-px w-16 bg-[var(--brass)]/50 sm:w-28" />
            </div>
          </header>

          <ul className="mt-6 grid w-full min-w-0 list-none grid-cols-1 gap-4 min-[520px]:grid-cols-2 min-[520px]:gap-4 lg:mt-8 lg:grid-cols-5 lg:items-stretch lg:gap-2.5 xl:gap-3.5">
            {HOMEPAGE_TILE_ORDER.map((slug) => {
              const copy = BUSINESS_TILE_COPY[slug];
              const name = BUSINESS_TILE_PRIMARY_NAME[slug];
              const tileSrc = getMockupTileImage(slug);
              const logoSrc = getMockupLogoImage(slug);
              return (
                <li key={slug} className="flex min-h-0">
                  <article className="flex h-full w-full flex-col border border-[var(--brass)]/55 bg-black/50 shadow-[inset_0_0_0_1px_rgba(46,196,188,0.08)]">
                    <div className="relative h-[10.5rem] w-full shrink-0 overflow-hidden sm:h-[11.5rem] lg:h-[9.75rem] xl:h-[10.25rem]">
                      <Image
                        src={tileSrc}
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="(max-width:1024px) 50vw, 20vw"
                      />
                    </div>
                    <div className="flex min-h-0 flex-1 flex-col items-center px-2 pb-3 pt-3 text-center sm:px-3 sm:pb-4 sm:pt-3.5">
                      <h3 className="font-serif text-base font-medium uppercase leading-tight tracking-wide text-[var(--brass)] sm:text-lg">
                        {name}
                      </h3>
                      <div className="mt-2 flex min-h-[4.5rem] w-full flex-col items-center justify-start gap-1.5 sm:min-h-[5rem]">
                        <p
                          className={`font-sans text-[11px] font-semibold uppercase tracking-[0.16em] sm:text-xs ${TILE_CATEGORY_ACCENT[slug]}`}
                        >
                          {formatCategoryLine(slug, copy)}
                        </p>
                        {copy.subheadline ? (
                          <p className="px-1 font-sans text-[10px] font-semibold uppercase leading-snug tracking-[0.12em] text-[var(--hub-teal)] sm:text-[11px]">
                            {copy.subheadline}
                          </p>
                        ) : (
                          <span className="block h-[0.65rem] sm:h-[0.75rem]" aria-hidden="true" />
                        )}
                        <p className="line-clamp-3 max-w-full text-[11px] uppercase leading-snug tracking-[0.08em] text-[var(--ivory)]/70 sm:text-xs">
                          {copy.bullets.replace(/·/g, " • ")}
                        </p>
                      </div>
                      <div className="relative mx-auto mt-2 h-[5rem] w-full max-w-[10.5rem] shrink-0 sm:mt-3 sm:h-[5.5rem] sm:max-w-[11.5rem]">
                        <Image src={logoSrc} alt="" fill className="object-contain object-center" sizes="184px" />
                      </div>
                      <Link
                        href={`/${slug}`}
                        className="mt-auto flex w-full max-w-none items-center justify-center gap-1.5 border border-[var(--brass)]/75 bg-black/35 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--brass)] transition hover:bg-[var(--brass)]/10 sm:text-xs sm:tracking-[0.2em]"
                      >
                        View details
                        <ArrowIcon className="h-3 w-3 shrink-0" />
                      </Link>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
          </div>
        </section>

        <MockupArtworkBand
          src={HOMEPAGE_MOCKUP.gardenPhoto}
          alt="City Sippers Trail Garden artwork"
        />
        <section className="relative z-10 border-b border-[var(--brass)]/30 bg-black/60 py-6 text-center">
          <div className={SITE_CONTAINER}>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[var(--hub-teal)] sm:text-sm">
              Pet &amp; family friendly · Walk-up movie theater · Along Shooks Run Trail
            </p>
            <MockupGoldButton href="/tequila-chilladas-bar" className="mt-5">
              Explore the garden <span aria-hidden="true">+</span>
            </MockupGoldButton>
          </div>
        </section>

        <section className="relative z-10 border-b border-[var(--brass)]/30 bg-black py-6 md:py-8">
          <div className={`${SITE_CONTAINER} text-center`}>
            <p className="font-serif text-[clamp(1.35rem,4.5vw,2.25rem)] font-medium text-[var(--brass)]">
              Take the fun with you.
            </p>
            <p className="mt-2 font-serif text-lg italic text-[var(--ivory)]/85">Shirts, tanks, hoodies &amp; patch hats.</p>
            <p className="mt-4 font-sans text-sm text-[var(--ivory)]/85">
              For all merchandise, sizes &amp; availability
            </p>
            <p className="mt-1 font-sans text-sm text-[var(--hub-teal)]">Ask about gift certificates, too.</p>
            <p className="mt-3 font-serif text-sm italic text-[var(--ivory)]/70">
              Text or call for availability — no online checkout on this site.
            </p>
            <a
              href={smsHref(OWNER_CONTACTS.ownerPhone)}
              className="mt-6 inline-flex max-w-full border border-[var(--brass)] bg-black/50 px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ivory)] sm:text-sm"
            >
              Text Rocky: {OWNER_CONTACTS.ownerPhoneDisplay}
            </a>
          </div>
          <MockupArtworkBand src={HOMEPAGE_MOCKUP.merchPhoto} alt="Merchandise shirts and hats artwork" className="!py-4" />
        </section>

        <MockupArtworkBand
          src={HOMEPAGE_MOCKUP.campusPhoto}
          alt="Inked and Infused campus welcome artwork"
        />
        <section className="relative z-10 border-b border-[var(--brass)]/25 bg-black/70 py-6 text-center">
          <div className={`${SITE_CONTAINER} max-w-3xl`}>
            <p className="font-serif text-xl text-[var(--brass)] sm:text-2xl">
              Good people. Great experiences. Everyone welcome.
            </p>
            <p className="mt-3 font-serif text-base italic text-[var(--ivory)]/90">
              Locally owned and built with heart. We welcome all walks of life.
            </p>
          </div>
        </section>

        {/* —— Plan visit · reviews · VIP · footer (SS2 smoke bg) —— */}
        <section id="visit" className="relative z-10 overflow-hidden border-t border-[var(--brass)]/20 bg-black">
          <VisitSectionSmokeBg />
          <div className={`relative z-[1] ${SITE_CONTAINER} pt-14 pb-0 md:pt-20`}>
          <header className="min-w-0 text-center">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--hub-teal)] sm:tracking-[0.32em] md:tracking-[0.4em]">
              Plan your visit
            </p>
            <h2 className="mt-3 font-serif text-[clamp(1.75rem,4.5vw,2.5rem)] font-medium text-[var(--brass)]">
              Come spend a little time with us.
            </h2>
          </header>

          <div className="mt-10 grid min-w-0 gap-6 md:grid-cols-2">
            <div className="min-w-0 border border-[var(--brass)]/60 bg-black/40 p-4 sm:p-6 md:p-8">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[var(--ivory)] sm:text-sm">
                Tattoos &amp; Trims
              </p>
              <p className="mt-4 font-sans text-base text-[var(--ivory)]/90">{OWNER_CONTACTS.tattooEntrance.address}</p>
              <a href={phoneHref(OWNER_CONTACTS.ownerPhone)} className="mt-3 block text-base text-[var(--hub-teal)]">
                {OWNER_CONTACTS.ownerPhoneDisplay}
              </a>
              <MockupGoldButton href={mapsDirectionsUrl(OWNER_CONTACTS.tattooEntrance.address)} className="mt-6">
                Get directions
              </MockupGoldButton>
            </div>
            <div className="min-w-0 border border-[var(--brass)]/60 bg-black/40 p-4 sm:p-6 md:p-8">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-[var(--ivory)] sm:text-sm sm:tracking-[0.2em]">
                Tacos · Bar · Beer garden &amp; cigar lounge
              </p>
              <p className="mt-4 font-sans text-base text-[var(--ivory)]/90">{OWNER_CONTACTS.campus.address}</p>
              <a href={phoneHref(OWNER_CONTACTS.campus.phone)} className="mt-3 block text-base text-[var(--hub-teal)]">
                {OWNER_CONTACTS.campus.phoneDisplay}
              </a>
              <MockupGoldButton href={mapsDirectionsUrl(OWNER_CONTACTS.campus.address)} className="mt-6">
                Get directions
              </MockupGoldButton>
            </div>
          </div>

          <p className="mt-8 text-center font-sans text-base text-[var(--ivory)]/80">
            DJ &amp; event rentals:{" "}
            <a href={phoneHref(OWNER_CONTACTS.ownerPhone)} className="text-[var(--hub-teal)]">
              {OWNER_CONTACTS.ownerPhoneDisplay}
            </a>
          </p>

          <div
            id="hours"
            className="mt-10 border border-[var(--brass)]/50 bg-black/45 p-5 sm:p-8"
          >
            <h3 className="text-center font-serif text-2xl text-[var(--brass)]">Business hours</h3>
            <p className="mt-2 text-center font-serif text-base italic text-[var(--ivory)]/85">
              Each business keeps its own hours.
            </p>
            <ul className="mt-8 space-y-8">
              {HOMEPAGE_BUSINESS_HOURS.map((block) => (
                <li key={block.slug} className="border-t border-[var(--brass)]/25 pt-6 first:border-t-0 first:pt-0">
                  <p className="font-sans text-sm font-bold uppercase tracking-[0.16em] text-[var(--hub-teal)]">
                    {block.title}
                  </p>
                  <ul className="mt-3 space-y-1.5 font-sans text-base text-[var(--ivory)]/88">
                    {block.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  {block.note ? (
                    <p className="mt-2 font-sans text-sm text-[var(--ivory)]/60">{block.note}</p>
                  ) : null}
                  <Link
                    href={`/${block.slug}`}
                    className="mt-3 inline-block font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brass)] hover:text-[var(--hub-teal)]"
                  >
                    Full details →
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 border-t border-[var(--brass)]/25 pt-14 text-center">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--hub-teal)] sm:tracking-[0.32em] md:tracking-[0.4em]">
              Your experience matters
            </p>
            <h3 className="mt-3 font-serif text-2xl text-[var(--brass)] md:text-3xl">Love what we do?</h3>
            <p className="mx-auto mt-3 max-w-lg font-serif text-base italic text-[var(--ivory)]/80">
              Share an honest review and help our local businesses grow.
            </p>
            <HomepageReviewsPicker />
          </div>

          <div id="contact" className="mt-16 border-t border-[var(--brass)]/25 pt-14 text-center">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--hub-teal)] sm:tracking-[0.32em] md:tracking-[0.4em]">
              Stay in the loop
            </p>
            <h3 className="mt-3 font-serif text-2xl text-[var(--brass)] md:text-3xl">Join the VIP list.</h3>
            <p className="mt-2 font-serif italic text-[var(--ivory)]/75">Occasional offers, event updates, and birthday surprises.</p>
            <a
              href={vipSms}
              className="mx-auto mt-8 flex w-full max-w-xl min-w-0 flex-col border border-[var(--brass)] bg-black/50 px-4 py-8 transition hover:bg-black/70 sm:px-6"
            >
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-[var(--ivory)]/70">Text VIP to</span>
              <span className="mt-2 break-all font-serif text-[clamp(1.5rem,7vw,2.25rem)] text-[var(--ivory)] md:text-4xl">{OWNER_CONTACTS.vipSms.phoneDisplay}</span>
            </a>
            <div className="mx-auto mt-4 max-w-lg space-y-2 text-sm text-[var(--ivory)]/65">
              <p>Include your interest, first name, and birthday month + day.</p>
              <p className="font-serif italic text-[var(--brass)]/90">
                Example: {HOMEPAGE_VIP_SMS_EXAMPLE}
              </p>
              <p className="text-xs text-[var(--ivory)]/50">
                No birth year needed. Msg &amp; data rates may apply. Reply STOP to opt out.
              </p>
            </div>
          </div>

          <footer className="relative mt-16 overflow-hidden border-t border-[var(--brass)]/25 pt-12 pb-3 sm:pb-4">
            <p className="text-center font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--hub-teal)] sm:tracking-[0.32em] md:tracking-[0.4em]">
              Follow the fun
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <MockupGoldButton href={HOMEPAGE_CAMPUS_FACEBOOK}>Facebook</MockupGoldButton>
              <MockupGoldButton href={OWNER_CONTACTS.campus.instagram}>Instagram</MockupGoldButton>
            </div>
            <p className="mt-4 text-center font-sans text-sm text-[var(--ivory)]/60">@inkedandinfusedcos</p>
            <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-[var(--ivory)]/55">
              <Link href="/#businesses" className="hover:text-[var(--brass)]">Our Businesses</Link>
              <span className="text-[var(--brass)]">|</span>
              <Link href="/#hours" className="hover:text-[var(--brass)]">Hours &amp; Locations</Link>
              <span className="text-[var(--brass)]">|</span>
              <Link href="/#contact" className="hover:text-[var(--brass)]">Contact</Link>
            </nav>
            <a
              href={`mailto:${OWNER_CONTACTS.campus.email}`}
              className="mt-4 block text-center text-sm text-[var(--ivory)]/70 hover:text-[var(--brass)]"
            >
              {OWNER_CONTACTS.campus.email}
            </a>
            <p className="mt-8 text-center font-serif text-2xl italic text-[var(--brass)] sm:pr-[min(14rem,36vw)] md:pr-56">
              Thank you for supporting local!
            </p>
            <div className="pointer-events-none absolute bottom-0 right-0 hidden h-52 w-52 opacity-100 sm:block md:h-64 md:w-64 lg:h-72 lg:w-72">
              <Image
                src={HOMEPAGE_MOCKUP.footerCollage}
                alt=""
                fill
                className="object-contain object-bottom-right"
                sizes="(max-width: 640px) 200px, 288px"
              />
            </div>
            <div className="relative mx-auto mt-6 h-44 w-full max-w-sm sm:hidden">
              <Image
                src={HOMEPAGE_MOCKUP.footerCollage}
                alt="Campus collage artwork"
                fill
                className="object-contain object-center"
                sizes="320px"
              />
            </div>
          </footer>
          </div>
        </section>
      </div>
    </div>
  );
}
