import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "outline";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--accent)] text-[var(--ivory)] hover:brightness-110 shadow-[0_0_0_1px_rgba(244,240,232,0.12)]",
  ghost: "bg-transparent text-[var(--ivory)] hover:bg-white/5",
  outline:
    "border border-[var(--ivory)]/25 text-[var(--ivory)] hover:border-[var(--brass)] hover:text-[var(--brass)]",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  onClick,
  type = "button",
  disabled,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const base = cn(
    "inline-flex max-w-full items-center justify-center gap-2 px-5 py-3 text-center text-sm font-medium leading-snug tracking-wide uppercase whitespace-normal transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brass)] disabled:opacity-50 sm:px-6",
    variants[variant],
    className,
  );
  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={base} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
