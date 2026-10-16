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
import { SITE_CONTAINER, SITE_SECTION_Y } from "@/lib/site-layout";

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
  const gallery = business.media.filter((m) => m.usage === "gallery");
  const supplement = getBusinessSupplement(business.slug);
  const email = business.contactEmail || settings.contactEmail;
  const phone = business.contactPhone || settings.contactPhone;
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
    { name: "placement", label: "Placement" },
    { name: "size", label: "Approximate size" },
    { name: "artist", label: "Preferred artist" },
    { name: "preferredDate", label: "Preferred date" },
  ];

  const djFields = [
    { name: "eventType", label: "Event type", required: true },
    { name: "eventDate", label: "Event date" },
    { name: "venue", label: "Venue / location", required: true },
    { name: "guestCount", label: "Estimated guest count" },
    {
      name: "service",
      label: "DJ, equipment, or both",
      options: ["DJ only", "Equipment rental only", "Both"],
    },
    { name: "equipment", label: "Equipment requirements", type: "long" },
    { name: "budget", label: "Budget range (optional)" },
    { name: "message", label: "Message", type: "long" },
  ];

  return (
    <div className="min-w-0 overflow-x-clip" style={{ ["--accent" as string]: business.accentColor }}>
      <section className="relative min-h-[58vh] overflow-hidden pt-24 sm:min-h-[65vh] sm:pt-28 md:min-h-[78vh]">
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
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-[var(--brass)]">
              {business.heroEyebrow}
            </p>
            <h1 className="mt-4 font-serif text-[clamp(2.25rem,9vw,5.5rem)] font-medium leading-[0.95] text-[var(--ivory)] sm:mt-5">
              {business.heroTitle || business.name}
            </h1>
            <p className="mt-5 max-w-2xl font-serif text-xl font-light italic text-[var(--ivory)]/75 md:text-2xl">
              {business.heroSubtitle}
            </p>
            {business.status === "coming_soon" && (
              <span className="mt-6 inline-block border border-[var(--brass)] px-3 py-1 text-xs uppercase tracking-widest text-[var(--brass)]">
                Coming soon
              </span>
            )}
          </Reveal>
        </div>
      </section>

      <section className={`${SITE_CONTAINER} ${SITE_SECTION_Y}`}>
        <Reveal>
          <div
            className="prose prose-invert max-w-3xl border-l-2 border-[var(--accent)]/40 pl-5 sm:pl-8 md:pl-10"
            dangerouslySetInnerHTML={{ __html: business.introHtml }}
          />
        </Reveal>
      </section>

      {supplement && <BusinessSupplementSections data={supplement} />}

      {business.services && business.services.length > 0 && (
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
                          <div>
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

      {gallery.length > 0 && (
        <section className={`${SITE_CONTAINER} ${SITE_SECTION_Y}`}>
          <SectionHeading label="Visuals" title="Gallery" />
          <div
            className={`mt-8 grid gap-4 ${
              gallery.length <= 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 md:grid-cols-4"
            }`}
          >
            {gallery.map((img, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden border border-white/[0.06] bg-[#121212] ${
                  gallery.length <= 2 ? "aspect-[4/3]" : "aspect-square"
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.alt || ""}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-[#9e2a3a]/0 transition group-hover:bg-[#9e2a3a]/10" />
              </div>
            ))}
          </div>
        </section>
      )}

      {business.testimonials && business.testimonials.length > 0 && (
        <section className={`border-t border-white/[0.06] bg-[#0c0c0c] ${SITE_SECTION_Y}`}>
          <div className={SITE_CONTAINER}>
            <SectionHeading label="Voices" title="Testimonials" />
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
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              label="Connect"
              title="Request / inquiry"
              description="Submit a request — not a confirmed booking. Our team will follow up."
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
              <a href={`mailto:${email}`} className="block text-[var(--brass)]">{email}</a>
              <a href={phoneHref(phone)} className="block text-[var(--brass)]">{phone}</a>
              {onProperty && (
                <a href={mapsDirectionsUrl(settings.address)} className="block text-[var(--ivory)]/70 underline">
                  Directions
                </a>
              )}
            </div>
          </div>
          <div className="border border-white/[0.08] bg-[#0c0c0c]/90 p-6 md:p-10">
          <InquiryForm
            type={inquiryType}
            businessSlug={business.slug}
            businessId={business.id}
            fields={
              business.template === "tattoo"
                ? tattooFields
                : business.template === "events"
                  ? djFields
                  : [{ name: "message", label: "Message", type: "long", required: true }]
            }
          />
          </div>
        </div>
      </section>

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
                    className="group inline-flex items-center gap-2 font-serif text-lg text-[var(--ivory)]/70 transition hover:text-[var(--ivory)]"
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
