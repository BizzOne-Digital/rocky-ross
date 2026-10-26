"use client";

import { useState, type ReactNode } from "react";
import type { BusinessSlug } from "@/lib/business-slugs";
import {
  HOMEPAGE_REVIEW_BUSINESS_ORDER,
  HOMEPAGE_REVIEW_LINKS,
} from "@/lib/homepage-mockup-content";

function ReviewLinkButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex max-w-full items-center justify-center border border-[var(--brass)] bg-black/45 px-4 py-2.5 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ivory)] transition hover:bg-[var(--brass)]/15 sm:text-xs sm:tracking-[0.2em]"
    >
      {children}
    </a>
  );
}

export function HomepageReviewsPicker() {
  const [slug, setSlug] = useState<BusinessSlug>(HOMEPAGE_REVIEW_BUSINESS_ORDER[0]);
  const links = HOMEPAGE_REVIEW_LINKS[slug];

  return (
    <div className="mx-auto mt-8 max-w-xl min-w-0 text-left">
      <label htmlFor="review-business" className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[var(--hub-teal)]">
        Choose a business to review
      </label>
      <select
        id="review-business"
        value={slug}
        onChange={(e) => setSlug(e.target.value as BusinessSlug)}
        className="mt-2 w-full min-w-0 border border-[var(--brass)]/70 bg-black/60 px-3 py-3 font-sans text-sm text-[var(--ivory)]"
      >
        {HOMEPAGE_REVIEW_BUSINESS_ORDER.map((id) => (
          <option key={id} value={id}>
            {HOMEPAGE_REVIEW_LINKS[id].label}
          </option>
        ))}
      </select>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
        <ReviewLinkButton href={links.google}>Review on Google</ReviewLinkButton>
        <ReviewLinkButton href={links.facebook}>Recommend on Facebook</ReviewLinkButton>
        <ReviewLinkButton href={links.yelp}>Review on Yelp</ReviewLinkButton>
      </div>
    </div>
  );
}
