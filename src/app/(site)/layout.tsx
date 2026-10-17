import { Suspense } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getGlobalSettings, getPublishedBusinesses } from "@/lib/data/public";
import { PREVIEW_BUSINESSES, PREVIEW_SETTINGS } from "@/lib/seed-data";
import { sortBusinessesForNav } from "@/lib/sort-businesses-nav";

/** Header/footer load MongoDB — allow blocking render under PPR (Next.js 16). */
export const instant = false;

const previewNav = PREVIEW_BUSINESSES.map((b) => ({ slug: b.slug, name: b.name }));

async function SiteHeaderData() {
  const [settings, businesses] = await Promise.all([getGlobalSettings(), getPublishedBusinesses()]);
  const nav = sortBusinessesForNav(businesses).map((b) => ({ slug: b.slug, name: b.name }));
  return <SiteHeader businesses={nav} brandName={settings.brandName} />;
}

async function SiteFooterData() {
  const [settings, businesses] = await Promise.all([getGlobalSettings(), getPublishedBusinesses()]);
  const nav = sortBusinessesForNav(businesses).map((b) => ({ slug: b.slug, name: b.name }));
  return (
    <SiteFooter
      brandName={settings.brandName}
      destinationName={settings.destinationName}
      tagline={settings.tagline}
      email={settings.contactEmail}
      phone={settings.contactPhone}
      address={settings.address}
      businesses={nav}
      instagramUrl={settings.social?.instagram}
    />
  );
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense
        fallback={
          <SiteHeader businesses={previewNav} brandName={PREVIEW_SETTINGS.brandName} />
        }
      >
        <SiteHeaderData />
      </Suspense>
      <main className="flex-1 min-w-0 overflow-x-clip bg-[#030304] text-[var(--ivory)]">{children}</main>
      <Suspense
        fallback={
          <SiteFooter
            brandName={PREVIEW_SETTINGS.brandName}
            destinationName={PREVIEW_SETTINGS.destinationName}
            tagline={PREVIEW_SETTINGS.tagline}
            email={PREVIEW_SETTINGS.contactEmail}
            phone={PREVIEW_SETTINGS.contactPhone}
            address={PREVIEW_SETTINGS.address}
            businesses={previewNav}
          />
        }
      >
        <SiteFooterData />
      </Suspense>
    </>
  );
}
