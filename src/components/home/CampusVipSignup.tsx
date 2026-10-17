import { smsHref } from "@/lib/format";
import { OWNER_CONTACTS } from "@/lib/owner-contacts";
import { SITE_CONTAINER } from "@/lib/site-layout";

export function CampusVipSignup() {
  const body = encodeURIComponent("VIP - My name is [YOUR NAME] and my birthday is [MM/DD]");
  const sms = `${smsHref(OWNER_CONTACTS.vipSms.phone)}&body=${body}`;

  return (
    <section className="border-y border-[var(--brass)]/20 bg-[#0e1412]" aria-labelledby="vip-signup-title">
      <div className={`${SITE_CONTAINER} py-10 md:py-14`}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-[var(--hub-teal)]">Campus list</p>
          <h2 id="vip-signup-title" className="mt-3 text-balance font-serif text-2xl text-[var(--ivory)] sm:text-3xl md:text-4xl">
            Wanna be on the list?
          </h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-[var(--ivory)]/70">
            {OWNER_CONTACTS.vipSms.instruction} for parties, grand openings, live DJ events and more in Colorado
            Springs. This is separate from tattoo or DJ booking inquiries.
          </p>
          <a
            href={sms}
            className="mt-8 inline-flex flex-col items-center rounded-full border border-[var(--brass)]/50 bg-[#1a1f1e] px-8 py-4 transition hover:border-[var(--brass)]"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-[var(--brass)]">Text VIP</span>
            <span className="mt-1 font-serif text-2xl text-[var(--ivory)]">{OWNER_CONTACTS.vipSms.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
