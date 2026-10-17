import type { MetadataRoute } from "next";
import { getPublishedBusinesses } from "@/lib/data/public";
import { getSiteUrl } from "@/lib/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const businesses = await getPublishedBusinesses();
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    ...businesses.map((b) => ({
      url: `${base}/${b.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
