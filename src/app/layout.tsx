import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { getGlobalSettings } from "@/lib/data/public";
import { getSiteUrl } from "@/lib/env";

const serif = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const sans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata(): Promise<Metadata> {
  const s = await getGlobalSettings();
  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: s.seoDefaultTitle,
      template: `%s | ${s.destinationName}`,
    },
    description: s.seoDefaultDescription,
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} h-full overflow-x-clip`}>
      <body className="flex min-h-full min-w-0 flex-col overflow-x-clip font-sans antialiased">{children}</body>
    </html>
  );
}
