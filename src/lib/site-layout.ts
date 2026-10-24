/** Shared layout classes — tight on phone, roomier on desktop; prevents horizontal bleed. */
export const SITE_CONTAINER =
  "mx-auto w-full min-w-0 max-w-[1400px] pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] md:pl-[max(2.5rem,env(safe-area-inset-left,0px))] md:pr-[max(2.5rem,env(safe-area-inset-right,0px))] lg:pl-[max(3.5rem,env(safe-area-inset-left,0px))] lg:pr-[max(3.5rem,env(safe-area-inset-right,0px))]";

/** Wrap page roots so nothing forces horizontal scroll on phones. */
export const SITE_PAGE_SHELL = "w-full min-w-0 max-w-full overflow-x-clip";

/** Fixed header clearance + notch (use on first section below SiteHeader). */
export const SITE_HEADER_OFFSET =
  "pt-[max(5.25rem,calc(4.75rem+env(safe-area-inset-top,0px)))] sm:pt-[max(6rem,calc(5.25rem+env(safe-area-inset-top,0px)))] md:pt-[max(7rem,calc(6rem+env(safe-area-inset-top,0px)))]";

export const SITE_SECTION_Y = "py-12 md:py-16 lg:py-20";

export const SITE_SECTION_Y_LOOSE = "py-14 md:py-20 lg:py-24";
