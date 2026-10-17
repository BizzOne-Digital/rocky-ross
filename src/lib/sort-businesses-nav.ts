import { HOMEPAGE_TILE_ORDER } from "@/lib/business-tile-copy";

export function sortBusinessesForNav<T extends { slug: string }>(items: T[]): T[] {
  const rank = new Map<string, number>(HOMEPAGE_TILE_ORDER.map((slug, i) => [slug, i]));
  return [...items].sort((a, b) => (rank.get(a.slug) ?? 99) - (rank.get(b.slug) ?? 99));
}
