"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Mockup homepage has its own header/footer. */
const REFERENCE_CHROMELESS = ["/"];

export function SiteChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (REFERENCE_CHROMELESS.includes(pathname)) return null;
  return children;
}
