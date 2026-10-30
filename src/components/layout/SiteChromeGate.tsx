"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Hides global header/footer on reference-built pages (landing + DJ). */
const REFERENCE_CHROMELESS = ["/", "/ross-squad-djs-event-rentals"];

export function SiteChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (REFERENCE_CHROMELESS.includes(pathname)) return null;
  return children;
}
