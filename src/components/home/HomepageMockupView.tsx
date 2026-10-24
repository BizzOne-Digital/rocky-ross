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
import { SITE_CONTAINER, SITE_PAGE_SHELL } from "@/lib/site-layout";

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

function BgSection({
  id,
  image,
  className = "",
  children,
  overlay = "bg-black/50",
}: {
  id?: string;
  image: string;
  className?: string;
  children: ReactNode;
  overlay?: string;
}) {
  return (
    <section id={id} className={`relative overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Image src={image} alt="" fill className="object-cover" sizes="100vw" priority={false} />
      </div>
      <div className={`pointer-events-none absolute inset-0 z-[1] ${overlay}`} aria-hidden="true" />
      <div className="relative z-[2]">{children}</div>
    </section>
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
  const vipBody = encodeURIComponent("VIP - My name is [YOUR NAME] and my birthday is [MM/DD]");
  const vipSms = `${smsHref(OWNER_CONTACTS.vipSms.phone)}&body=${vipBody}`;

  return (
    <div className={`${SITE_PAGE_SHELL} bg-[#030304] text-[var(--ivory)]`}>
      {/* —— Hero (SS1 layout · SS2 collage bg + teal smoke) —— */}
      <section className="relative w-full min-h-[min(100svh,940px)] overflow-hidden bg-black">
        <Image
          src={HOMEPAGE_MOCKUP.findFunBg}
          alt=""
          fill
          className="object-cover object-center opacity-90"
          priority
          sizes="100vw"
        />
        <Image
          src={HOMEPAGE_MOCKUP.heroBg}
          alt=""
          fill
          className="object-cover object-[72%_50%] sm:object-[78%_45%]"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#061210]/95 via-[#081816]/55 to-black/15"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_70%_at_18%_42%,rgba(46,196,188,0.22),transparent_55%)]"
          aria-hidden="true"
        />

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
                <Link href="/#visit" className="transition hover:text-[var(--hub-teal)]">Hours &amp; Location</Link>
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

          <div className={`${SITE_CONTAINER} grid min-w-0 gap-8 pb-14 pt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-6 lg:pb-16 lg:pt-12`}>
            <div className="min-w-0 max-w-[34rem]">
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--hub-teal)] sm:text-[11px] sm:tracking-[0.32em] md:tracking-[0.38em]">
                A.K.A. The Double R Group
              </p>
              <h1 className="hero-gold-serif mt-2 font-serif text-[clamp(2.25rem,6.5vw,3.75rem)] font-semibold leading-[1.02]">
                {brandName}
              </h1>
              <p
                className="hero-inked-title mt-3 break-words font-serif text-[clamp(2rem,7.5vw,4.75rem)] font-semibold uppercase leading-[0.95]"
              >
                Inked <span className="text-[var(--hub-teal)]">&</span> Infused
              </p>
              <p className="mt-1 font-serif text-[clamp(1.2rem,3.8vw,2.35rem)] font-medium uppercase tracking-[0.12em] text-[var(--ivory)] sm:tracking-[0.22em] md:tracking-[0.35em]">
                Fun Hub
              </p>
              <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-[10px] font-bold uppercase tracking-[0.22em] sm:text-[11px]">
                {HUB_CAMPUS_SERVICE_LINE.map((word, i) => (
                  <span key={word} className="inline-flex items-center gap-2">
                    {i > 0 && <span className="text-[var(--ivory)]">•</span>}
                    <span className={HERO_SERVICE_COLOR[word]}>{word}</span>
                  </span>
                ))}
              </p>
              <p className="mt-4 font-serif text-sm font-medium uppercase tracking-[0.32em] text-[var(--ivory)] sm:text-base">
                All Under One Roof.
              </p>
              <p className="mt-4 font-serif text-lg leading-relaxed text-[var(--ivory)] sm:text-xl">
                Professional passion. Creative delivery. Good times.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
            <div className="hidden min-h-[320px] lg:block" aria-hidden="true" />
          </div>

          <nav
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-white/10 bg-black/80 px-4 py-3 font-serif text-xs text-[var(--ivory)]/90 lg:hidden"
            aria-label="Mobile"
          >
            <Link href="/#businesses">Our Businesses</Link>
            <Link href="/tequila-chilladas-bar">Trail Garden</Link>
            <Link href="/#visit">Hours &amp; Location</Link>
          </nav>
        </div>
      </section>

      {/* —— Find your fun → footer (shared SS2 smoke behind) —— */}
      <div className={`relative isolate ${SITE_PAGE_SHELL}`}>
        <HomepageLowerSmokeBackdrop />

        <section
          id="businesses"
          className="relative z-10 border-y border-[var(--brass)]/25 py-12 md:py-16"
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
            <p className="mt-3 font-sans text-[10px] font-medium uppercase tracking-[0.38em] text-[var(--ivory)]/90 sm:text-[11px]">
              Choose a business to explore.
            </p>
            <div className="mx-auto mt-6 flex items-center justify-center gap-3" aria-hidden="true">
              <span className="h-px w-16 bg-[var(--brass)]/50 sm:w-28" />
              <DiamondStar className="h-2 w-2 text-[var(--brass)]/80" />
              <span className="h-px w-16 bg-[var(--brass)]/50 sm:w-28" />
            </div>
          </header>

          <ul className="mt-8 grid w-full min-w-0 list-none grid-cols-1 gap-5 min-[520px]:grid-cols-2 min-[520px]:gap-4 lg:mt-10 lg:grid-cols-5 lg:items-stretch lg:gap-2.5 xl:gap-3.5">
            {HOMEPAGE_TILE_ORDER.map((slug) => {
              const copy = BUSINESS_TILE_COPY[slug];
              const name = BUSINESS_TILE_PRIMARY_NAME[slug];
              const tileSrc = getMockupTileImage(slug);
              const logoSrc = getMockupLogoImage(slug);
              return (
                <li key={slug} className="flex min-h-0">
                  <article className="flex h-full w-full flex-col border border-[var(--brass)]/70 bg-black/55">
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
                      <h3 className="font-serif text-[13px] font-medium uppercase leading-tight tracking-wide text-[var(--brass)] sm:text-sm lg:text-[13px]">
                        {name}
                      </h3>
                      <div className="mt-2 flex min-h-[4.25rem] w-full flex-col items-center justify-start gap-1 sm:min-h-[4.5rem]">
                        <p
                          className={`font-sans text-[9px] font-semibold uppercase tracking-[0.2em] sm:text-[10px] ${TILE_CATEGORY_ACCENT[slug]}`}
                        >
                          {formatCategoryLine(slug, copy)}
                        </p>
                        {copy.subheadline ? (
                          <p className="font-sans text-[8px] font-semibold uppercase tracking-[0.16em] text-[var(--hub-teal)] sm:text-[9px]">
                            {copy.subheadline}
                          </p>
                        ) : (
                          <span className="block h-[0.65rem] sm:h-[0.75rem]" aria-hidden="true" />
                        )}
                        <p className="line-clamp-2 min-h-[2rem] max-w-full text-[8px] uppercase leading-snug tracking-[0.1em] text-[var(--ivory)]/55 sm:text-[9px]">
                          {copy.bullets.replace(/·/g, " • ")}
                        </p>
                      </div>
                      <div className="relative mx-auto mt-2 h-[5rem] w-full max-w-[10.5rem] shrink-0 sm:mt-3 sm:h-[5.5rem] sm:max-w-[11.5rem]">
                        <Image src={logoSrc} alt="" fill className="object-contain object-center" sizes="184px" />
                      </div>
                      <Link
                        href={`/${slug}`}
                        className="mt-auto flex w-full max-w-none items-center justify-center gap-1.5 border border-[var(--brass)]/85 bg-black/30 py-2 font-sans text-[8px] font-semibold uppercase tracking-[0.2em] text-[var(--brass)] transition hover:bg-[var(--brass)]/10 sm:text-[9px]"
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

        {/* —— City Sippers / Garden (SS14 + copy) —— */}
        <BgSection image={HOMEPAGE_MOCKUP.gardenPhoto} className="relative z-10 min-h-[320px] md:min-h-[420px]" overlay="bg-black/35">
        <div className="flex min-h-[320px] flex-col items-center justify-center px-4 py-14 text-center md:min-h-[420px]">
          <p className="font-serif text-[clamp(1.25rem,4vw,2rem)] font-medium uppercase tracking-[0.12em] text-[var(--ivory)] drop-shadow-lg">
            City Sippers Trail Garden
          </p>
          <p className="mt-4 max-w-3xl font-sans text-[10px] font-semibold uppercase leading-relaxed tracking-[0.22em] text-[var(--ivory)]/95 sm:text-[11px]">
            Pet &amp; family friendly · Walk-up movie theater · Along Shooks Run Trail
          </p>
          <MockupGoldButton href="/tequila-chilladas-bar" className="mt-8">
            Explore the garden <span aria-hidden="true">+</span>
          </MockupGoldButton>
        </div>
        </BgSection>

        {/* —— Merch (SS15 + copy) —— */}
        <BgSection image={HOMEPAGE_MOCKUP.merchPhoto} className="relative z-10 min-h-[300px] md:min-h-[380px]" overlay="bg-black/55">
        <div className="flex min-h-[300px] flex-col items-center justify-center px-4 py-12 text-center md:min-h-[380px]">
          <p className="font-serif text-[clamp(1.35rem,4.5vw,2.25rem)] font-medium text-[var(--brass)]">
            Take the fun with you.
          </p>
          <p className="mt-2 font-serif text-lg italic text-[var(--ivory)]/85">A few favorites. More to come.</p>
          <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.28em] text-[var(--ivory)]/80">
            Shirts, tanks, hoodies &amp; patch hats.
          </p>
          <a
            href={smsHref(OWNER_CONTACTS.ownerPhone)}
            className="mt-8 inline-flex border border-[var(--brass)] bg-black/50 px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--ivory)]"
          >
            Text Rocky: {OWNER_CONTACTS.ownerPhoneDisplay}
          </a>
        </div>
        </BgSection>

        {/* —— Good people (SS18 + copy) —— */}
        <BgSection image={HOMEPAGE_MOCKUP.campusPhoto} className="relative z-10 min-h-[280px] md:min-h-[360px]" overlay="bg-gradient-to-t from-black/80 via-black/45 to-black/30">
        <div className="flex min-h-[280px] flex-col items-center justify-end px-4 pb-12 pt-16 text-center md:min-h-[360px] md:pb-16">
          <p className="max-w-3xl font-serif text-[clamp(1.35rem,4vw,2.1rem)] font-medium leading-snug text-[var(--brass)]">
            Good people. Great experiences. Everyone welcome.
          </p>
          <p className="mt-4 max-w-2xl font-serif text-base italic leading-relaxed text-[var(--ivory)]/90 md:text-lg">
            Locally owned and built with heart. We welcome all walks of life.
          </p>
        </div>
        </BgSection>

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
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--ivory)]">
                Tattoos &amp; Trims
              </p>
              <p className="mt-4 font-sans text-sm text-[var(--ivory)]/85">{OWNER_CONTACTS.tattooEntrance.address}</p>
              <a href={phoneHref(OWNER_CONTACTS.ownerPhone)} className="mt-3 block text-sm text-[var(--hub-teal)]">
                {OWNER_CONTACTS.ownerPhoneDisplay}
              </a>
              <MockupGoldButton href={mapsDirectionsUrl(OWNER_CONTACTS.tattooEntrance.address)} className="mt-6">
                Get directions
              </MockupGoldButton>
            </div>
            <div className="min-w-0 border border-[var(--brass)]/60 bg-black/40 p-4 sm:p-6 md:p-8">
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--ivory)] sm:text-[11px] sm:tracking-[0.25em]">
                Tacos · Bar · Beer garden &amp; cigar lounge
              </p>
              <p className="mt-4 font-sans text-sm text-[var(--ivory)]/85">{OWNER_CONTACTS.campus.address}</p>
              <a href={phoneHref(OWNER_CONTACTS.campus.phone)} className="mt-3 block text-sm text-[var(--hub-teal)]">
                {OWNER_CONTACTS.campus.phoneDisplay}
              </a>
              <MockupGoldButton href={mapsDirectionsUrl(OWNER_CONTACTS.campus.address)} className="mt-6">
                Get directions
              </MockupGoldButton>
            </div>
          </div>

          <p className="mt-8 text-center font-sans text-sm text-[var(--ivory)]/75">
            DJ &amp; event rentals:{" "}
            <a href={phoneHref(OWNER_CONTACTS.ownerPhone)} className="text-[var(--hub-teal)]">
              {OWNER_CONTACTS.ownerPhoneDisplay}
            </a>
          </p>
          <div className="mt-4 flex justify-center">
            <MockupGoldButton href="/#businesses">View business hours</MockupGoldButton>
          </div>

          <div className="mt-16 border-t border-[var(--brass)]/25 pt-14 text-center">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--hub-teal)] sm:tracking-[0.32em] md:tracking-[0.4em]">
              Your experience matters
            </p>
            <h3 className="mt-3 font-serif text-2xl text-[var(--brass)] md:text-3xl">Love what we do?</h3>
            <p className="mx-auto mt-3 max-w-lg font-serif text-base italic text-[var(--ivory)]/80">
              Share an honest review and help our local businesses grow.
            </p>
            <div className="mt-8 flex w-full min-w-0 flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
              <MockupGoldButton className="w-full sm:w-auto" href="https://www.google.com/search?q=Inked+and+Infused+Colorado+Springs">Review on Google</MockupGoldButton>
              <MockupGoldButton className="w-full sm:w-auto" href="https://www.facebook.com/">Recommend on Facebook</MockupGoldButton>
            </div>
          </div>

          <div id="contact" className="mt-16 border-t border-[var(--brass)]/25 pt-14 text-center">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--hub-teal)] sm:tracking-[0.32em] md:tracking-[0.4em]">
              Plan the scoop
            </p>
            <h3 className="mt-3 font-serif text-2xl text-[var(--brass)] md:text-3xl">Join the VIP list.</h3>
            <p className="mt-2 font-serif italic text-[var(--ivory)]/75">Occasional offers, event updates, and birthday surprises.</p>
            <a
              href={vipSms}
              className="mx-auto mt-8 flex w-full max-w-xl min-w-0 flex-col border border-[var(--brass)] bg-black/50 px-4 py-8 transition hover:bg-black/70 sm:px-6"
            >
              <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[var(--ivory)]/70 sm:tracking-[0.3em]">Text VIP to</span>
              <span className="mt-2 break-all font-serif text-[clamp(1.5rem,7vw,2.25rem)] text-[var(--ivory)] md:text-4xl">{OWNER_CONTACTS.vipSms.phoneDisplay}</span>
            </a>
            <p className="mx-auto mt-4 max-w-md text-xs text-[var(--ivory)]/45">
              Include your name and birthday. Msg &amp; data rates may apply.
            </p>
          </div>

          <footer className="relative mt-16 overflow-hidden border-t border-[var(--brass)]/25 pt-12 pb-3 sm:pb-4">
            <p className="text-center font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--hub-teal)] sm:tracking-[0.32em] md:tracking-[0.4em]">
              Follow the fun
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <MockupGoldButton href="https://www.facebook.com/">Facebook</MockupGoldButton>
              <MockupGoldButton href={OWNER_CONTACTS.campus.instagram}>Instagram</MockupGoldButton>
            </div>
            <p className="mt-4 text-center font-sans text-sm text-[var(--ivory)]/60">@inkedandinfusedcos</p>
            <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-[var(--ivory)]/55">
              <Link href="/#businesses" className="hover:text-[var(--brass)]">Our Businesses</Link>
              <span className="text-[var(--brass)]">|</span>
              <Link href="/#visit" className="hover:text-[var(--brass)]">Hours &amp; Locations</Link>
              <span className="text-[var(--brass)]">|</span>
              <Link href="/#contact" className="hover:text-[var(--brass)]">Contact</Link>
            </nav>
            <a
              href={`mailto:${OWNER_CONTACTS.campus.email}`}
              className="mt-4 block text-center text-sm text-[var(--ivory)]/70 hover:text-[var(--brass)]"
            >
              {OWNER_CONTACTS.campus.email}
            </a>
            <p className="mt-8 text-center font-serif text-2xl italic text-[var(--brass)]">Thank you for supporting local!</p>
            <div className="pointer-events-none absolute bottom-0 right-0 hidden h-40 w-[min(12rem,38vw)] max-w-[38vw] opacity-95 sm:block md:h-48 md:w-48 lg:h-56 lg:w-56">
              <Image
                src={HOMEPAGE_MOCKUP.footerCollage}
                alt=""
                fill
                className="object-contain object-bottom-right"
                sizes="256px"
              />
            </div>
            <div className="relative mx-auto mt-4 h-32 w-32 sm:hidden">
              <Image src={HOMEPAGE_MOCKUP.footerCollage} alt="" fill className="object-contain" sizes="160px" />
            </div>
          </footer>
          </div>
        </section>
      </div>
    </div>
  );
}
