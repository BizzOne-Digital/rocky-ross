import { notFound, redirect } from "next/navigation";
import { BusinessPageView } from "@/components/business/BusinessPageView";
import { ReferenceSiteEmbed } from "@/components/reference/ReferenceSiteEmbed";
import { getGlobalSettings, getPublishedBusinesses, resolveBusinessSlug } from "@/lib/data/public";
import { getSiteUrl } from "@/lib/env";
import { BUSINESS_SLUGS } from "@/lib/constants";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

/** `params` + MongoDB content — allow blocking navigation (Next.js 16 PPR). */
export const instant = false;

export function generateStaticParams() {
  return BUSINESS_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await resolveBusinessSlug(slug);
  if (!resolved?.business) return {};
  const b = resolved.business;
  return {
    title: b.seoTitle || b.name,
    description: b.seoDescription || b.shortDescription,
    alternates: { canonical: `${getSiteUrl()}/${b.slug}` },
  };
}

export default async function BusinessSlugPage({ params }: Props) {
  const { slug } = await params;
  const resolved = await resolveBusinessSlug(slug);
  if (resolved?.redirect) redirect(`/${resolved.redirect}`);
  if (!resolved?.business) notFound();

  const settings = await getGlobalSettings();
  const all = await getPublishedBusinesses();

  if (resolved.business.slug === "ross-squad-djs-event-rentals") {
    return (
      <ReferenceSiteEmbed
        src="/dj-reference/index.html"
        title="DJ Rocky Ross — DJs, Events, Lessons & Custom Mixes"
      />
    );
  }

  return (
    <BusinessPageView
      business={resolved.business as Parameters<typeof BusinessPageView>[0]["business"]}
      allBusinesses={all.map((b) => ({ slug: b.slug, name: b.name }))}
      settings={{
        address: settings.address,
        contactEmail: settings.contactEmail,
        contactPhone: settings.contactPhone,
      }}
      happyHourNote={settings.happyHourNote}
    />
  );
}
