import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE_CONTAINER, SITE_SECTION_Y_LOOSE } from "@/lib/site-layout";

const PILLARS = [
  {
    title: "Ink",
    body: "Custom tattooing with consultation-first requests — walk-ins when available.",
    accent: "#9e2a3a",
  },
  {
    title: "Flavor",
    body: "Street-style tacos and bold plates at the heart of the property.",
    accent: "#c45c26",
  },
  {
    title: "Spirit & style",
    body: "Tequila-led pours, fresh cuts, and Ross Squad DJs beyond the address.",
    accent: "#b79b67",
  },
];

export function HomeExperienceSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-[#0c0c0c]">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url(/images/hero-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[#080808]/88" aria-hidden="true" />
      <div className="site-grain pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />

      <div className={`relative ${SITE_CONTAINER} ${SITE_SECTION_Y_LOOSE}`}>
        <Reveal>
          <SectionHeading
            label="The destination"
            title="Inked & Infused"
            description="One address. Five experiences. Choose your vibe — ink, flavor, pours, fresh cuts, or bring Ross Squad to your event."
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:mt-16 md:grid-cols-3 md:gap-8">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <article
                className="group relative overflow-hidden border border-white/[0.08] bg-[#101010]/80 p-8 transition duration-500 hover:border-white/15 hover:bg-[#141414]"
              >
                <div
                  className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl transition group-hover:opacity-35"
                  style={{ background: p.accent }}
                  aria-hidden="true"
                />
                <span
                  className="font-serif text-5xl font-medium text-[var(--ivory)]/15 transition group-hover:text-[var(--ivory)]/25"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-serif text-2xl text-[var(--ivory)]">{p.title}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--ivory)]/60">{p.body}</p>
                <div
                  className="mt-6 h-0.5 w-0 bg-gradient-to-r from-[var(--brass)] to-transparent transition-all duration-500 group-hover:w-full"
                  style={{ ["--brass" as string]: p.accent }}
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
