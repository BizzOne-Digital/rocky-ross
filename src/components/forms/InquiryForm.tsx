"use client";

import { useState, useTransition } from "react";
import { submitInquiry } from "@/lib/actions/inquiries";
import { Button } from "@/components/ui/Button";

type Fields = Record<string, string>;

export function InquiryForm({
  type,
  businessSlug,
  businessId,
  fields,
  submitLabel = "Send request",
}: {
  type: "general" | "tattoo" | "barber" | "dj_event" | "bar_event" | "food";
  businessSlug?: string;
  businessId?: string;
  fields: { name: string; label: string; type?: string; required?: boolean; options?: string[] }[];
  submitLabel?: string;
}) {
  const [pending, start] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        const fd = new FormData(e.currentTarget);
        const payload: Fields = {};
        fields.forEach((f) => {
          if (f.name !== "name" && f.name !== "email" && f.name !== "phone") {
            payload[f.name] = String(fd.get(f.name) ?? "");
          }
        });
        start(async () => {
          const res = await submitInquiry({
            type,
            businessSlug,
            businessId,
            name: String(fd.get("name") ?? ""),
            email: String(fd.get("email") ?? ""),
            phone: String(fd.get("phone") ?? ""),
            payload,
            honeypot: String(fd.get("company") ?? ""),
          });
          if (res.ok) {
            setMessage(res.message);
            e.currentTarget.reset();
          } else {
            setError(res.message);
          }
        });
      }}
    >
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-[var(--ivory)]/70">Name *</span>
          <input
            name="name"
            required
            maxLength={120}
            className="w-full border border-white/15 bg-transparent px-4 py-3 text-[var(--ivory)] focus:border-[var(--brass)] focus:outline-none"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-[var(--ivory)]/70">Email *</span>
          <input
            name="email"
            type="email"
            required
            maxLength={200}
            className="w-full border border-white/15 bg-transparent px-4 py-3 text-[var(--ivory)] focus:border-[var(--brass)] focus:outline-none"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1 block text-[var(--ivory)]/70">Phone</span>
        <input
          name="phone"
          type="tel"
          maxLength={40}
          className="w-full border border-white/15 bg-transparent px-4 py-3 text-[var(--ivory)] focus:border-[var(--brass)] focus:outline-none"
        />
      </label>
      {fields
        .filter((f) => !["name", "email", "phone"].includes(f.name))
        .map((f) => (
          <label key={f.name} className="block text-sm">
            <span className="mb-1 block text-[var(--ivory)]/70">
              {f.label}
              {f.required ? " *" : ""}
            </span>
            {f.options ? (
              <select
                name={f.name}
                required={f.required}
                className="w-full border border-white/15 bg-[var(--ink)] px-4 py-3 text-[var(--ivory)] focus:border-[var(--brass)] focus:outline-none"
              >
                <option value="">Select</option>
                {f.options.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            ) : (
              <textarea
                name={f.name}
                required={f.required}
                rows={f.type === "long" ? 4 : 2}
                maxLength={2000}
                className="w-full border border-white/15 bg-transparent px-4 py-3 text-[var(--ivory)] focus:border-[var(--brass)] focus:outline-none"
              />
            )}
          </label>
        ))}
      <p className="text-xs text-[var(--ivory)]/50">
        Submitting a request does not confirm an appointment or booking. Our team will follow up.
      </p>
      <Button type="submit" disabled={pending}>{pending ? "Sending…" : submitLabel}</Button>
      {message && <p className="text-sm text-[var(--brass)]" role="status">{message}</p>}
      {error && <p className="text-sm text-red-300" role="alert">{error}</p>}
    </form>
  );
}
