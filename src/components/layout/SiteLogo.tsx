import Image from "next/image";
import Link from "next/link";
import { CAMPUS_LOGO_SRC } from "@/lib/constants";
import { cn } from "@/lib/cn";

/** Inked & Infused campus oval — image only, no wordmark text. */
export function SiteLogo({
  className,
  imageClassName,
  priority = false,
}: {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brass)]",
        className,
      )}
      aria-label="Inked and Infused — home"
    >
      <Image
        src={CAMPUS_LOGO_SRC}
        alt=""
        width={480}
        height={220}
        priority={priority}
        className={cn("h-11 w-auto max-w-[min(52vw,13rem)] object-contain object-left md:h-14 md:max-w-[15rem]", imageClassName)}
      />
    </Link>
  );
}
