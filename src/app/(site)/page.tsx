import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getGlobalSettings } from "@/lib/data/public";
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

/** Owner landing reference — static HTML (iframe on `/` breaks layout on Vercel). */
export default function HomePage() {
  redirect("/landing-reference/index.html");
}
