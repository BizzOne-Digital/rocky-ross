"use client";

import { useState } from "react";
import { registerMediaAsset } from "@/lib/actions/admin";

export function MediaUploadPanel({
  businesses,
}: {
  businesses: { id: string; name: string }[];
}) {
  const [status, setStatus] = useState<string | null>(null);

  return (
    <div className="mt-6 rounded border border-zinc-800 p-5">
      <h2 className="font-medium">Register upload</h2>
      <p className="mt-1 text-xs text-zinc-500">
        Upload via Cloudinary widget or dashboard, then register the returned public ID and secure URL here.
      </p>
      <form
        className="mt-4 grid gap-3 md:grid-cols-2"
        onSubmit={async (e) => {
          e.preventDefault();
          setStatus(null);
          const fd = new FormData(e.currentTarget);
          try {
            await registerMediaAsset({
              businessId: String(fd.get("businessId") || ""),
              usage: String(fd.get("usage")) as "logo" | "tile" | "hero" | "gallery",
              cloudinaryPublicId: String(fd.get("publicId")),
              url: String(fd.get("url")),
              width: Number(fd.get("width")),
              height: Number(fd.get("height")),
              alt: String(fd.get("alt")),
            });
            setStatus("Saved");
            e.currentTarget.reset();
          } catch {
            setStatus("Failed to save");
          }
        }}
      >
        <select name="businessId" className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5">
          <option value="">Brand / property</option>
          {businesses.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
        <select name="usage" className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5">
          <option value="tile">tile</option>
          <option value="logo">logo</option>
          <option value="hero">hero</option>
          <option value="gallery">gallery</option>
          <option value="property">property</option>
        </select>
        <input name="publicId" required placeholder="Cloudinary public ID" className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5 md:col-span-2" />
        <input name="url" required placeholder="HTTPS URL" className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5 md:col-span-2" />
        <input name="width" type="number" defaultValue={1200} placeholder="Width" className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5" />
        <input name="height" type="number" defaultValue={800} placeholder="Height" className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5" />
        <input name="alt" placeholder="Alt text" className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5 md:col-span-2" />
        <button type="submit" className="rounded bg-amber-700 px-4 py-2 text-sm w-fit">Register asset</button>
      </form>
      {status && <p className="mt-2 text-sm text-amber-200">{status}</p>}
    </div>
  );
}
