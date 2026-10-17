export function SectionHeading({
  label,
  title,
  description,
  align = "left",
}: {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto min-w-0 max-w-2xl text-center"
          : "min-w-0 max-w-2xl"
      }
    >
      {label && (
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--brass)] sm:text-[11px] sm:tracking-[0.42em]">
          {label}
        </p>
      )}
      <h2 className="mt-3 text-balance font-serif text-[clamp(1.875rem,7vw,3.75rem)] font-medium leading-[1.08] text-[var(--ivory)]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty font-serif text-base font-light italic leading-relaxed text-[var(--ivory)]/65 sm:text-lg md:text-xl">
          {description}
        </p>
      )}
      <div
        className={`mt-7 h-px w-28 bg-gradient-to-r from-[#9e2a3a] via-[var(--brass)] to-transparent ${
          align === "center" ? "mx-auto" : ""
        }`}
        aria-hidden="true"
      />
    </div>
  );
}
