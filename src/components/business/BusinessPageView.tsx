import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowUpRight } from "@/components/icons/UiIcons";
import { formatMoney, formatServicePrice, mapsDirectionsUrl, phoneHref } from "@/lib/format";
import { BRAND } from "@/lib/constants";
import { hasDisplayableServiceImage, resolvePublicImageUrl } from "@/lib/uploads/resolve-public-image";
import { getBusinessSupplement } from "@/lib/business-supplement";
import { BusinessSupplementSections } from "@/components/business/BusinessSupplement";
import { OldNorthEndContactSection, OldNorthEndTattoosSections } from "@/components/business/OldNorthEndTattoosSections";
import { ElGringosPageSections } from "@/components/business/ElGringosPageSections";
import { TequilaBarPageSections } from "@/components/business/TequilaBarPageSections";
import { TrimsPageSections } from "@/components/business/TrimsPageSections";
import { RossSquadDjPageSections } from "@/components/business/RossSquadDjPageSections";
import { DJ_ASSETS } from "@/lib/dj-page-assets";
import { DJ_INQUIRY_SERVICE_OPTIONS } from "@/lib/dj-page-content";
import { isDjBusinessSlug } from "@/lib/dj-gallery-local";
import { OWNER_CONTACTS } from "@/lib/owner-contacts";
import { BusinessContactActions } from "@/components/business/BusinessContactActions";
import {
  OLD_NORTH_END_EMAIL,
  OLD_NORTH_END_PHONE_DISPLAY,
  OLD_NORTH_END_PHONE_RAW,
} from "@/lib/business-page-content/old-north-end-tattoos";
import { getLocalLogoMedia } from "@/lib/business-tile-slides";
import { SITE_CONTAINER, SITE_HEADER_OFFSET, SITE_SECTION_Y } from "@/lib/site-layout";

type BusinessData = {
  id: string;
  slug: string;
  name: string;
  template: string;
  accentColor: string;
  status: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  introHtml: string;
  contactEmail?: string;
  contactPhone?: string;
  bookingUrl?: string;
  social?: Record<string, string>;
  hourNotes?: string;
  media: { url: string; alt: string; usage: string; width: number; height: number }[];
  services?: Array<{
    name: string;
    description?: string;
    imageUrl?: string;
    priceMode: string;
    priceMinor?: number | null;
    currency?: string;
  }>;
  categories?: Array<{ _id: unknown; name: string }>;
  menuItems?: Array<{
    categoryId: unknown;
    name: string;
    description?: string;
    priceMinor?: number | null;
    soldOut?: boolean;
    isSpecial?: boolean;
  }>;
  testimonials?: Array<{ customerName: string; quote: string; rating?: number | null }>;
  team?: Array<{ name: string; role?: string; bio?: string }>;
  events?: Array<{ title: string; description?: string; startsAt?: Date | null }>;
};

export function BusinessPageView({
  business,
  allBusinesses,
  settings,
  happyHourNote,
}: {
  business: BusinessData;
  allBusinesses: { slug: string; name: string }[];
  settings: { address: string; contactEmail: string; contactPhone: string };
  happyHourNote?: string;
}) {
  const heroImage = business.media.find((m) => m.usage === "hero") ?? business.media[0];
  const isOldNorthEnd = business.slug === "old-north-end-tattoos";
  const isDj = isDjBusinessSlug(business.slug);
  const shopLogo = isOldNorthEnd
    ? getLocalLogoMedia(business.slug)
    : isDj
      ? { url: DJ_ASSETS.eventsLogo, usage: "logo" as const }
      : null;
  const supplement = isOldNorthEnd || isDj ? null : getBusinessSupplement(business.slug);
  const email = isOldNorthEnd
    ? OLD_NORTH_END_EMAIL
    : isDj
      ? OWNER_CONTACTS.djEvents.email
      : business.contactEmail || settings.contactEmail;
  const phone = isOldNorthEnd
    ? business.contactPhone || OLD_NORTH_END_PHONE_RAW
    : isDj
      ? OWNER_CONTACTS.ownerPhone
      : business.contactPhone || settings.contactPhone;
  const phoneDisplay = isOldNorthEnd
    ? OLD_NORTH_END_PHONE_DISPLAY
    : isDj
      ? OWNER_CONTACTS.ownerPhoneDisplay
      : undefined;
  const onProperty = business.template !== "events";

  const inquiryType =
    business.template === "tattoo"
      ? "tattoo"
      : business.template === "barber"
        ? "barber"
        : business.template === "events"
          ? "dj_event"
          : business.template === "bar"
            ? "bar_event"
            : "food";

  const tattooFields = [
    { name: "idea", label: "Tattoo idea", type: "long", required: true },
    { name: "placement", label: "Placement", required: true },
    { name: "size", label: "Approximate size" },
    { name: "preferredDate", label: "Preferred date" },
    { name: "artist", label: "Preferred artist (optional)" },
    { name: "notes", label: "Notes", type: "long" },
  ];
  const tattooBookingNote =
    "Booking note: Submitting this inquiry does not reserve an appointment. We will contact you to discuss your tattoo and confirm details. This is not a confirmed reservation or checkout.";

  const foodFields = [
    {
      name: "inquiryType",
      label: "Inquiry type",
      required: true,
      options: ["Menu / hours", "Order food", "Catering / group event", "Other"],
    },
    { name: "preferredDate", label: "Preferred date" },
    { name: "guestCount", label: "Guest count (if catering/group)" },
    { name: "message", label: "Notes", type: "long", required: true },
  ];

  const barFields = [
    {
      name: "inquiryType",
      label: "Inquiry type",
      required: true,
      options: ["Private / group event", "Cigar lounge", "General bar question", "VIP list opt-in question"],
    },
    { name: "preferredDate", label: "Preferred date" },
    { name: "eventHours", label: "Event hours" },
    { name: "guestCount", label: "Guest count" },
    { name: "message", label: "Notes", type: "long", required: true },
  ];

  const djFields = [
    {
      name: "requestedService",
      label: "Requested service",
      required: true,
      options: DJ_INQUIRY_SERVICE_OPTIONS,
    },
    { name: "eventDate", label: "Event date" },
    { name: "venue", label: "Location", required: true },
    { name: "eventHours", label: "Event hours" },
    { name: "guestCount", label: "Guest count" },
    { name: "notes", label: "Notes", type: "long", required: true },
    { name: "budget", label: "Budget (optional — not a quoted rate)" },
  ];

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-clip" style={{ ["--accent" as string]: business.accentColor }}>
      <section
        className={`relative min-h-[52vh] overflow-hidden sm:min-h-[65vh] md:min-h-[78vh] ${SITE_HEADER_OFFSET}`}
      >
        {heroImage ? (
          <Image
            src={heroImage.url}
            alt={heroImage.alt || business.name}
            fill
            priority
            className="object-cover opacity-45"
            sizes="100vw"
          />
        ) : (
          <>
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage: "url(/images/hero-bg.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "75% center",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${business.accentColor}55, transparent 60%)`,
              }}
            />
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/95 via-[#080808]/70 to-[#080808]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-transparent to-[#080808]/50" />
        <div className="site-grain pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />
        <div className={`relative ${SITE_CONTAINER} pb-12 md:pb-20`}>
          <Reveal>
            {shopLogo && (
              <div className={`relative mb-6 ${isDj ? "h-16 w-56 sm:h-20 sm:w-64" : "h-20 w-44 sm:h-24 sm:w-52"}`}>
                <Image
                  src={shopLogo.url}
                  alt={isDj ? "Rocky Ross Events logo" : "Old North End Tattoos LLC logo"}
                  fill
                  className="object-contain object-left"
                  sizes="200px"
                  priority
                />
              </div>
            )}
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--brass)] sm:text-[11px] sm:tracking-[0.4em]">
              {business.heroEyebrow}
            </p>
            <h1 className="mt-4 break-words font-serif text-[clamp(1.875rem,8.5vw,5.5rem)] font-medium leading-[0.98] text-[var(--ivory)] sm:mt-5">
              {business.heroTitle || business.name}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty font-sans text-xs font-medium uppercase tracking-[0.1em] text-[var(--ivory)]/85 sm:text-sm sm:tracking-[0.12em] md:text-base">
              {business.heroSubtitle}
            </p>
            {isOldNorthEnd && (
              <p className="mt-4 max-w-2xl font-serif text-xl font-light italic text-[var(--ivory)]/80 md:text-2xl">
                Great tattoos. Great experiences. A place you&apos;ll want to return to.
              </p>
            )}
            {isOldNorthEnd && (
              <BusinessContactActions
                phone={phone}
                phoneDisplay={phoneDisplay}
              />
            )}
            {business.status === "coming_soon" && (
              <span className="mt-6 inline-block border border-[var(--brass)] px-3 py-1 text-xs uppercase tracking-widest text-[var(--brass)]">
                Coming soon
              </span>
            )}
          </Reveal>
        </div>
      </section>

      {!isDj && (
        <section id="about" className={`${SITE_CONTAINER} ${SITE_SECTION_Y}`}>
          <Reveal>
            {isOldNorthEnd && (
              <div className="mb-8">
                <SectionHeading label="Welcome" title="The shop experience" />
              </div>
            )}
            {!isOldNorthEnd && <SectionHeading label="About" title={business.name} />}
            <div
              className="prose prose-invert max-w-3xl border-l-2 border-[var(--accent)]/40 pl-5 sm:pl-8 md:pl-10"
              dangerouslySetInnerHTML={{ __html: business.introHtml }}
            />
          </Reveal>
        </section>
      )}

      {isDj && (
        <section id="about" className={`${SITE_CONTAINER} pb-8 pt-4 md:pb-10`}>
          <Reveal>
            <div
              className="mx-auto max-w-3xl border-l-2 border-[var(--brass)]/50 py-1 pl-5 sm:pl-8"
            >
              <div
                className="font-sans text-sm leading-relaxed text-[var(--ivory)]/80 md:text-base"
                dangerouslySetInnerHTML={{ __html: business.introHtml }}
              />
            </div>
          </Reveal>
        </section>
      )}

      {supplement && <BusinessSupplementSections data={supplement} />}

      {isOldNorthEnd && (
        <OldNorthEndTattoosSections />
      )}

      {business.slug === "el-gringos-tacos" && (
        <ElGringosPageSections orderUrl={process.env.NEXT_PUBLIC_EL_GRINGOS_ORDER_URL} />
      )}
      {business.slug === "tequila-chilladas-bar" && <TequilaBarPageSections />}
      {business.slug === "trims-barbershop" && <TrimsPageSections />}
      {isDj && <RossSquadDjPageSections />}

      {business.services && business.services.length > 0 && !isDj && (
        <section className={`border-y border-white/[0.06] bg-[#0c0c0c] ${SITE_SECTION_Y}`}>
          <div className={SITE_CONTAINER}>
            <Reveal>
              <SectionHeading label="Offerings" title="Services" />
              <ul className="mt-4 divide-y divide-white/[0.08]">
                {business.services.map((s) => {
                  const showImage = hasDisplayableServiceImage(s.imageUrl);
                  const imageSrc = showImage ? resolvePublicImageUrl(s.imageUrl) : null;
                  return (
                  <li
                    key={s.name}
                    className="group flex flex-col gap-4 py-6 transition hover:bg-white/[0.02] md:flex-row md:items-center md:justify-between md:gap-6 md:px-4"
                  >
                    <div className="flex items-start gap-4">
                      {imageSrc && (
                        <div className="relative h-20 w-28 shrink-0 overflow-hidden border border-white/[0.08] bg-[#121212]">
                          <Image
                            src={imageSrc}
                            alt={s.name}
                            fill
                            className="object-cover"
                            sizes="112px"
                            unoptimized={imageSrc.startsWith("/api/uploads/")}
                          />
                        </div>
                      )}
                      <div>
                        <p className="text-lg text-[var(--ivory)]">{s.name}</p>
                        {s.description && <p className="text-sm text-[var(--ivory)]/60">{s.description}</p>}
                      </div>
                    </div>
                    <p className="font-serif text-xl text-[var(--brass)] md:text-right">{formatServicePrice(s)}</p>
                  </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {business.categories && business.categories.length > 0 && (
        <section className={`${SITE_CONTAINER} ${SITE_SECTION_Y}`}>
          <Reveal>
            <SectionHeading label="Taste" title="Menu" />
            <div className="mt-8 space-y-10">
              {business.categories.map((cat) => (
                <div key={String(cat._id)}>
                  <h3 className="text-xs uppercase tracking-[0.35em] text-[var(--brass)]">{cat.name}</h3>
                  <ul className="mt-4 space-y-3">
                    {(business.menuItems ?? [])
                      .filter((i) => String(i.categoryId) === String(cat._id))
                      .map((item) => (
                        <li key={item.name} className="flex justify-between gap-4 border-b border-white/5 pb-3">
                          <div className="min-w-0 flex-1">
                            <p className="text-[var(--ivory)]">
                              {item.name}
                              {item.soldOut && (
                                <span className="ml-2 text-xs uppercase text-[var(--brass)]">Sold out</span>
                              )}
                              {item.isSpecial && (
                                <span className="ml-2 text-xs uppercase text-[var(--accent)]">Special</span>
                              )}
                            </p>
                            {item.description && (
                              <p className="text-sm text-[var(--ivory)]/55">{item.description}</p>
                            )}
                          </div>
                          <p className="shrink-0 text-[var(--brass)]">
                            {formatMoney(item.priceMinor ?? null) ?? ""}
                          </p>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {business.template === "bar" && happyHourNote && (
        <section className="mx-auto max-w-7xl px-4 pb-8 md:px-8">
          <p className="border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-6 py-4 text-sm text-[var(--ivory)]/80">
            {happyHourNote}
          </p>
        </section>
      )}

      {business.team && business.team.length > 0 && (
        <section className={`${SITE_CONTAINER} ${SITE_SECTION_Y}`}>
          <SectionHeading label="People" title="Team" />
          <div className="mt-4 grid gap-6 md:grid-cols-3">
            {business.team.map((m) => (
              <article
                key={m.name}
                className="border border-white/[0.08] bg-[#0c0c0c] p-8 transition hover:border-white/15"
              >
                <p className="text-xl text-[var(--ivory)]">{m.name}</p>
                {m.role && <p className="text-xs uppercase tracking-widest text-[var(--brass)]">{m.role}</p>}
                {m.bio && <p className="mt-3 text-sm text-[var(--ivory)]/65">{m.bio}</p>}
              </article>
            ))}
          </div>
        </section>
      )}

      {business.testimonials && business.testimonials.length > 0 && (
        <section id="reviews" className={`border-t border-white/[0.06] bg-[#0c0c0c] ${SITE_SECTION_Y}`}>
          <div className={SITE_CONTAINER}>
            <SectionHeading label="Voices" title="Reviews" />
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {business.testimonials.map((t) => (
                <blockquote
                  key={t.customerName + t.quote.slice(0, 20)}
                  className="border border-white/[0.08] bg-[#101010] p-8"
                >
                  <p className="text-[var(--ivory)]/80">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-4 text-sm text-[var(--brass)]">— {t.customerName}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={`${SITE_CONTAINER} ${SITE_SECTION_Y}`} id="inquiry">
        <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <SectionHeading
              label="Connect"
              title={isDj ? "Build my event package" : "Request / inquiry"}
              description={
                isDj
                  ? "Share date, location, hours, guest count and service needs. Submitting does not confirm availability or a booking."
                  : "Submit a request — not a confirmed booking. Our team will follow up."
              }
            />
            {business.bookingUrl && (
              <Button href={business.bookingUrl} className="mt-6" variant="outline">
                External booking link
              </Button>
            )}
            {onProperty && (
              <p className="mt-6 text-sm text-[var(--ivory)]/60">
                {BRAND.destination} · {settings.address}
              </p>
            )}
            <div className="mt-4 space-y-2 text-sm">
              <a href={`mailto:${email}`} className="block break-all text-[var(--brass)]">{email}</a>
              <a href={phoneHref(phone)} className="block break-all text-[var(--brass)]">{phone}</a>
              {onProperty && (
                <a href={mapsDirectionsUrl(settings.address)} className="block text-[var(--ivory)]/70 underline">
                  Directions
                </a>
              )}
            </div>
          </div>
          <div className="min-w-0 border border-white/[0.08] bg-[#0c0c0c]/90 p-4 sm:p-6 md:p-10">
          <InquiryForm
            type={inquiryType}
            businessSlug={business.slug}
            businessId={business.id}
            submitLabel={isDj ? "Build my event package" : isOldNorthEnd ? "Request consultation" : undefined}
            allowReferenceUploads={isOldNorthEnd}
            phoneBeforeEmail={isOldNorthEnd}
            bookingNote={isOldNorthEnd ? tattooBookingNote : undefined}
            fields={
              business.template === "tattoo"
                ? tattooFields
                : business.template === "events"
                  ? djFields
                  : business.template === "food"
                    ? foodFields
                    : business.template === "bar"
                      ? barFields
                      : business.template === "barber"
                        ? [{ name: "message", label: "Message", type: "long", required: true }]
                        : [{ name: "message", label: "Message", type: "long", required: true }]
            }
          />
          </div>
        </div>
      </section>

      {isOldNorthEnd && <OldNorthEndContactSection />}

      <section className="border-t border-white/[0.06] py-10 md:py-16">
        <div className={SITE_CONTAINER}>
          <p className="font-sans text-[11px] uppercase tracking-[0.38em] text-[var(--brass)]">
            More at Inked & Infused
          </p>
          <ul className="mt-6 flex flex-wrap gap-4">
            {allBusinesses
              .filter((b) => b.slug !== business.slug)
              .map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/${b.slug}`}
                    className="group inline-flex max-w-full items-start gap-2 break-words font-serif text-base text-[var(--ivory)]/70 transition hover:text-[var(--ivory)] sm:text-lg"
                  >
                    {b.name}
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
