"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Hides global header/footer on app routes that show owner reference HTML directly. */
const REFERENCE_CHROMELESS = [
  "/",
  "/ross-squad-djs-event-rentals",
  "/landing-reference/index.html",
  "/dj-reference/index.html",
];

export function SiteChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (REFERENCE_CHROMELESS.includes(pathname)) return null;
  return children;
}
