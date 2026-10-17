"use client";

import { useState, useTransition } from "react";
import { submitInquiry } from "@/lib/actions/inquiries";
import { Button } from "@/components/ui/Button";

type Fields = Record<string, string>;

async function uploadReferenceFiles(files: FileList | null): Promise<string[]> {
  if (!files?.length) return [];
  const urls: string[] = [];
  const limit = Math.min(files.length, 3);
  for (let i = 0; i < limit; i++) {
    const file = files[i];
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/inquiry-upload", { method: "POST", body });
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      throw new Error(data.error ?? "Reference photo upload failed");
    }
    const data = (await res.json()) as { url?: string };
    if (data.url) urls.push(data.url);
  }
  return urls;
}

export function InquiryForm({
  type,
  businessSlug,
  businessId,
  fields,
  submitLabel = "Send request",
  allowReferenceUploads = false,
  bookingNote,
  phoneBeforeEmail = false,
}: {
  type: "general" | "tattoo" | "barber" | "dj_event" | "bar_event" | "food";
  businessSlug?: string;
  businessId?: string;
  fields: { name: string; label: string; type?: string; required?: boolean; options?: string[] }[];
  submitLabel?: string;
  allowReferenceUploads?: boolean;
  bookingNote?: string;
  phoneBeforeEmail?: boolean;
}) {
  const [pending, start] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="min-w-0 space-y-4"
      suppressHydrationWarning
      autoComplete="off"
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
          try {
            if (allowReferenceUploads) {
              const fileInput = e.currentTarget.elements.namedItem("referencePhotos") as HTMLInputElement | null;
              const refs = await uploadReferenceFiles(fileInput?.files ?? null);
              if (refs.length) payload.referencePhotoUrls = refs.join(", ");
            }
          } catch (uploadErr) {
            setError(uploadErr instanceof Error ? uploadErr.message : "Upload failed");
            return;
          }
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
      <label className="block text-sm">
        <span className="mb-1 block text-[var(--ivory)]/70">Name *</span>
        <input
          name="name"
          required
          maxLength={120}
          suppressHydrationWarning
          className="w-full border border-white/15 bg-transparent px-4 py-3 text-[var(--ivory)] focus:border-[var(--brass)] focus:outline-none"
        />
      </label>
      {phoneBeforeEmail ? (
        <>
          <label className="block text-sm">
            <span className="mb-1 block text-[var(--ivory)]/70">Phone *</span>
            <input
              name="phone"
              type="tel"
              required
              maxLength={40}
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
        </>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm md:col-span-1">
              <span className="mb-1 block text-[var(--ivory)]/70">Email *</span>
              <input
                name="email"
                type="email"
                required
                maxLength={200}
                className="w-full border border-white/15 bg-transparent px-4 py-3 text-[var(--ivory)] focus:border-[var(--brass)] focus:outline-none"
              />
            </label>
            <label className="block text-sm md:col-span-1">
              <span className="mb-1 block text-[var(--ivory)]/70">Phone</span>
              <input
                name="phone"
                type="tel"
                maxLength={40}
                className="w-full border border-white/15 bg-transparent px-4 py-3 text-[var(--ivory)] focus:border-[var(--brass)] focus:outline-none"
              />
            </label>
          </div>
        </>
      )}
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
      {allowReferenceUploads && (
        <label className="block text-sm">
          <span className="mb-1 block text-[var(--ivory)]/70">Reference photos (optional, up to 3)</span>
          <input
            type="file"
            name="referencePhotos"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            className="w-full text-sm text-[var(--ivory)]/70 file:mr-4 file:border-0 file:bg-[var(--brass)]/20 file:px-3 file:py-2 file:text-[var(--ivory)]"
          />
        </label>
      )}
      <p className="text-xs text-[var(--ivory)]/50">
        {bookingNote ??
          "Submitting a request does not confirm an appointment or booking. Our team will follow up."}
      </p>
      <Button type="submit" disabled={pending}>{pending ? "Sending…" : submitLabel}</Button>
      {message && <p className="text-sm text-[var(--brass)]" role="status">{message}</p>}
      {error && <p className="text-sm text-red-300" role="alert">{error}</p>}
    </form>
  );
}
