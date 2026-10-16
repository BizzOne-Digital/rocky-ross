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
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {label && (
        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.42em] text-[var(--brass)]">
          {label}
        </p>
      )}
      <h2 className="mt-3 font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.05] text-[var(--ivory)]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 font-serif text-lg font-light italic leading-relaxed text-[var(--ivory)]/65 md:text-xl">
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
