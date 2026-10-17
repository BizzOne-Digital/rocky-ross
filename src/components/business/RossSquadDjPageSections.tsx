"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DJ_ASSETS, DJ_CAREER_VIDEO_URL } from "@/lib/dj-page-assets";
import {
  DJ_AWARDS,
  DJ_LESSON_SKILLS,
  DJ_RENTAL_INQUIRY_CARDS,
} from "@/lib/dj-page-content";
import { OWNER_CONTACTS } from "@/lib/owner-contacts";
import { phoneHref } from "@/lib/format";
import { SITE_CONTAINER, SITE_SECTION_Y } from "@/lib/site-layout";

const BIO_STATS = [
  { label: "DJ experience", value: "30+ years" },
  { label: "World tours", value: "68" },
  { label: "Teaching", value: "25+ years" },
];

const SERVICE_BULLETS = [
  "DJ & MC — weddings, private, corporate & nightlife",
  "Event & music production · graphic design & promotion",
  "Equipment rentals · lessons · custom mixes",
  "VIP transport & portable cigar lounge inquiries",
];

function InquireRow({
  title,
  thumbSrc,
  thumbAlt,
}: {
  title: string;
  thumbSrc?: string;
  thumbAlt?: string;
}) {
  return (
    <Link
      href="#inquiry"
      className="group flex h-full min-h-[5.75rem] w-full min-w-0 items-center gap-2 border border-white/[0.1] bg-[#101010] px-3 py-3 transition hover:border-[var(--brass)]/45 hover:bg-[#141414] sm:gap-4 sm:px-5"
    >
      {thumbSrc ? (
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded border border-white/10 bg-white sm:h-14 sm:w-14">
          <Image src={thumbSrc} alt={thumbAlt ?? title} fill className="object-contain p-0.5" sizes="56px" />
        </div>
      ) : null}
      <span className="min-w-0 flex-1 font-sans text-sm leading-snug text-[var(--ivory)] line-clamp-2">
        {title}
      </span>
      <span className="w-[3.5rem] shrink-0 text-right text-[9px] uppercase tracking-[0.14em] text-[var(--brass)] group-hover:text-[var(--ivory)] sm:w-[4.25rem] sm:text-[10px] sm:tracking-[0.2em]">
        Inquire
      </span>
    </Link>
  );
}

function BioDetails({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-white/[0.08] bg-[#0c0c0c]">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left font-sans text-sm font-medium text-[var(--ivory)] transition hover:bg-white/[0.03] sm:gap-4 sm:px-5"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        <span className="text-[var(--brass)]">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="border-t border-white/[0.06] px-5 py-4 font-sans text-sm leading-relaxed text-[var(--ivory)]/75">
          {children}
        </div>
      )}
    </div>
  );
}

export function RossSquadDjPageSections() {
  return (
    <>
      <section className={`border-t border-white/[0.06] bg-[#0a0a0a] ${SITE_SECTION_Y}`}>
        <div className={SITE_CONTAINER}>
          <Reveal>
            <SectionHeading label="About" title="DJ Rocky Ross" />
            <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_200px] lg:items-start">
              <div className="space-y-8">
                <p className="max-w-3xl font-sans text-base leading-relaxed text-[var(--ivory)]/90 md:text-lg">
                  Award-winning DJ, turntablist and event producer known for versatile music selection, creative mixing
                  and technical scratching — from weddings and private celebrations to corporate events, festivals and
                  nightclubs.
                </p>
                <ul className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-3">
                  {BIO_STATS.map((s) => (
                    <li
                      key={s.label}
                      className="rounded border border-[var(--brass)]/30 bg-[var(--brass)]/5 px-4 py-3 text-center min-[400px]:text-center"
                    >
                      <p className="font-serif text-xl text-[var(--ivory)]">{s.value}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--ivory)]/50">{s.label}</p>
                    </li>
                  ))}
                </ul>
                <div className="space-y-3">
                  <BioDetails title="Television, touring & Asia" defaultOpen>
                    <p>
                      Television work includes MTV, VH1 and nearly 400 episodes of &ldquo;The 80s Talk Show&rdquo; with
                      Wang Zijian in China — DJ, MC, dancer and choreographer. More than five years touring across Asia
                      at television, festivals and live events.
                    </p>
                  </BioDetails>
                  <BioDetails title="Artists, DJs & collaborators">
                    <p>
                      Artists including Jennifer Lopez, Lionel Richie, Dr. Dre, PSY, The Roots, Kendrick Lamar, Mos Def,
                      Omarion, T-Pain, E-40, Lil Jon, LL Cool J and Nelly; DJs including DJ Vice, Diplo, Qbert, Ferry
                      Corsten, Morgan Page and Benny Benassi; plus numerous comedians, actors and public figures.
                    </p>
                  </BioDetails>
                  <BioDetails title="Brand partnerships">
                    <p>
                      Lamborghini, Calvin Klein, Nike, Maserati, Clarks, Adidas, Gap, TAG Heuer, TISSOT, H&amp;M,
                      Ferrari, Toyota, The North Face, Red Bull, Hennessy, Chivas, Heineken, Budweiser,
                      Ballantine&apos;s, Absolut and Dom Pérignon.
                    </p>
                  </BioDetails>
                </div>
                <p className="max-w-3xl font-sans text-sm leading-relaxed text-[var(--ivory)]/75">
                  Based in Colorado Springs, Rocky leads Ross Squad DJs — DJ and MC entertainment, event and music
                  production, equipment rentals, lessons, custom mixes and internship/mentorship, with packages tailored
                  to each client&apos;s vision.
                </p>
                <p className="text-xs text-[var(--ivory)]/45">
                  <a
                    href={DJ_CAREER_VIDEO_URL}
                    className="text-[var(--brass)] underline"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Historical career media (2015)
                  </a>
                  {" "}
                  — reference only, not the current lead portrait.
                </p>
              </div>
              <div className="flex flex-col items-center gap-6 lg:items-end">
                <div className="relative h-40 w-40 lg:h-48 lg:w-48">
                  <Image
                    src={DJ_ASSETS.crest}
                    alt="Rocky Ross personal brand crest"
                    fill
                    className="object-contain"
                    sizes="192px"
                  />
                </div>
                <div className="relative h-20 w-full max-w-[200px] opacity-90">
                  <Image
                    src={DJ_ASSETS.toursArt}
                    alt="Rocky Ross Tours artwork"
                    fill
                    className="object-contain object-center"
                    sizes="200px"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`border-y border-white/[0.06] bg-[#0c0c0c] ${SITE_SECTION_Y}`}>
        <div className={SITE_CONTAINER}>
          <Reveal>
            <SectionHeading label="Services" title="Entertainment & creative" />
            <ul className="mt-6 grid max-w-3xl gap-2 sm:grid-cols-2">
              {SERVICE_BULLETS.map((line) => (
                <li
                  key={line}
                  className="border-l-2 border-[var(--hub-teal)]/60 py-1 pl-3 font-sans text-sm text-[var(--ivory)]/80"
                >
                  {line}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 border-y border-white/[0.06] py-10 sm:gap-12 md:gap-14">
              <div className="relative h-[4.5rem] w-44 sm:h-20 sm:w-52">
                <Image
                  src={DJ_ASSETS.doubleRProductionz}
                  alt="Double-R Productionz"
                  fill
                  className="object-contain object-center"
                  sizes="208px"
                />
              </div>
              <div className="relative h-16 w-36 sm:h-[4.25rem] sm:w-44">
                <Image
                  src={DJ_ASSETS.cre8iveUnion}
                  alt="Cre8ive Union"
                  fill
                  className="object-contain object-center"
                  sizes="176px"
                />
              </div>
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 opacity-90">
                <Image
                  src={DJ_ASSETS.partyArt}
                  alt="Rocky Ross DJ sets and parties artwork"
                  fill
                  className="object-contain object-center"
                  sizes="96px"
                />
              </div>
            </div>

            <div className="mt-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-[var(--ivory)]">Rentals & enhancements</h3>
                  <p className="mt-2 max-w-xl text-sm text-[var(--ivory)]/55">
                    Inquire for availability — capacities, operators and permissions are confirmed per event.
                  </p>
                </div>
                <div className="relative h-12 w-12 shrink-0">
                  <Image
                    src={DJ_ASSETS.rossSquadRedLogo}
                    alt="Ross Squad DJs rentals"
                    fill
                    className="object-contain"
                    sizes="48px"
                  />
                </div>
              </div>
              <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:items-stretch">
                {DJ_RENTAL_INQUIRY_CARDS.map((card) => (
                  <li key={card.title} className="flex min-h-[5.75rem]">
                    <InquireRow
                      title={card.title}
                      thumbSrc={card.imageKey === "photoBooth360" ? DJ_ASSETS.photoBooth360 : undefined}
                      thumbAlt="360 photo booth rental"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`${SITE_CONTAINER} ${SITE_SECTION_Y}`}>
        <Reveal>
          <SectionHeading label="Instruction" title="DJ lessons" />
          <p className="mt-4 max-w-3xl font-sans text-sm leading-relaxed text-[var(--ivory)]/75">
            Hands-on instruction from beginner through advanced. Skills include {DJ_LESSON_SKILLS}
          </p>
          <p className="mt-4 max-w-3xl text-sm text-[var(--ivory)]/80">
            <strong>Introductory private lesson:</strong> $99 for one hour (owner-approved). Other packages are custom
            quoted.
          </p>
          <div className="relative mt-8 aspect-[16/7] max-w-4xl overflow-hidden rounded border border-white/[0.08] bg-[#121212]">
            <Image
              src={DJ_ASSETS.lessonCertificate}
              alt="Example DJ lesson gift certificate"
              fill
              className="object-contain"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
        </Reveal>
      </section>

      <section className={`border-y border-white/[0.06] bg-[#0c0c0c] ${SITE_SECTION_Y}`}>
        <div className={SITE_CONTAINER}>
          <Reveal>
            <SectionHeading label="Audio" title="Custom mixes & mixtapes" />
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--ivory)]/75">
              Personal and business mixes — any occasion, style or genre, mashups and remixes. Share energy, length and
              deadline for a custom quote.
            </p>
            <div className="relative mt-8 aspect-[16/7] max-w-4xl overflow-hidden rounded border border-white/[0.08] bg-[#121212]">
              <Image
                src={DJ_ASSETS.customMixCertificate}
                alt="Example custom mix gift certificate"
                fill
                className="object-contain"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`${SITE_CONTAINER} ${SITE_SECTION_Y}`}>
        <Reveal>
          <SectionHeading label="Studio" title="Music production" />
          <p className="mt-4 max-w-2xl text-sm text-[var(--ivory)]/75">
            Remixes and mashups tailored to your project — contact Rocky to discuss goals and a custom quote.
          </p>
        </Reveal>
      </section>

      <section className={`border-y border-white/[0.06] bg-[#0c0c0c] ${SITE_SECTION_Y}`}>
        <div className={SITE_CONTAINER}>
          <Reveal>
            <SectionHeading label="Program" title="DJ internship / mentorship" />
            <p className="mt-2 font-serif text-xl text-[var(--brass)]">Learn. Experience. Level up.</p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--ivory)]/75">
              Hands-on training and event production with Rocky — inquire about current availability (not a guaranteed
              open slot, employment, or fixed duration).
            </p>
          </Reveal>
        </div>
      </section>

      <section className={`${SITE_CONTAINER} ${SITE_SECTION_Y}`}>
        <Reveal>
          <SectionHeading label="Recognition" title="Awards" />
          <ul className="mt-6 space-y-3">
            {DJ_AWARDS.map((a) => (
              <li
                key={`${a.program}-${a.year}-${a.level}-${a.title}`}
                className="border-l-2 border-[var(--brass)]/50 pl-4 text-sm text-[var(--ivory)]/85"
              >
                <strong>{a.program}</strong>
                {a.year && ` · ${a.year}`}
                {a.level && ` · ${a.level}`}
                {a.title && ` — ${a.title}`}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm italic text-[var(--ivory)]/70">
            Plus many more awards and recognitions across different countries, cities and states.
          </p>
        </Reveal>
      </section>

      <section className={`border-t border-[var(--brass)]/25 bg-[#0e1412] ${SITE_SECTION_Y}`}>
        <div className={`${SITE_CONTAINER} text-center`}>
          <Reveal>
            <h2 className="text-balance font-serif text-2xl text-[var(--ivory)] sm:text-3xl">Custom event pricing</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[var(--ivory)]/70">
              Custom packages by date, location, hours, guest count and gear. An inquiry does not confirm a booking.
            </p>
            <div className="mt-8 flex w-full max-w-lg flex-col items-stretch gap-3 sm:mx-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
              <Link
                href="#inquiry"
                className="inline-flex justify-center rounded-full border border-[var(--brass)] bg-[var(--brass)]/10 px-6 py-3 text-center font-sans text-[10px] uppercase tracking-[0.18em] text-[var(--brass)] transition hover:bg-[var(--brass)]/20 sm:px-8 sm:text-[11px] sm:tracking-[0.22em]"
              >
                Build my event package
              </Link>
              <a
                href={phoneHref(OWNER_CONTACTS.ownerPhone)}
                className="text-center text-sm text-[var(--ivory)]/80 sm:text-left"
              >
                {OWNER_CONTACTS.ownerPhoneDisplay}
              </a>
              <a
                href={`mailto:${OWNER_CONTACTS.djEvents.email}`}
                className="break-all text-center text-sm text-[var(--brass)] sm:text-left"
              >
                {OWNER_CONTACTS.djEvents.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
