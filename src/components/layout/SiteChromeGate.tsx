"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Hides global header/footer on the mockup homepage (`/`). */
export function SiteChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return children;
}
