import { HomepageMockupView } from "@/components/home/HomepageMockupView";
import { getGlobalSettings } from "@/lib/data/public";
import { hasMongo } from "@/lib/env";
import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/env";

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

  return (
    <>
      {!hasMongo() && (
        <div className="bg-[var(--burgundy)] px-4 py-2 text-center text-xs uppercase tracking-widest text-[var(--ivory)]">
          Preview mode — connect MongoDB for live content & form storage
        </div>
      )}
      <HomepageMockupView brandName={settings.brandName} />
    </>
  );
}
