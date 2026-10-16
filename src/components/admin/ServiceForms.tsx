"use client";

import { useState, useTransition } from "react";
import { saveService } from "@/lib/actions/admin";
import { LocalImageField } from "@/components/admin/LocalImageField";
import { formatMoney } from "@/lib/format";

type Business = { _id: string; name: string };

type Service = {
  _id: string;
  businessId: string;
  name: string;
  description?: string;
  priceMode: string;
  priceMinor?: number | null;
  isPublished: boolean;
  imageUrl?: string;
};

export function ServiceCreateForm({ businesses }: { businesses: Business[] }) {
  const [imageUrl, setImageUrl] = useState("");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="mt-8 grid max-w-2xl gap-3 rounded border border-zinc-800 p-5"
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
          try {
            await saveService({
              businessId: String(fd.get("businessId")),
              name: String(fd.get("name")),
              description: String(fd.get("description")),
              priceMode: String(fd.get("priceMode")) as "fixed" | "starting" | "quote" | "hidden",
              priceMinor: fd.get("priceMinor") ? Number(fd.get("priceMinor")) : "",
              isPublished: fd.get("isPublished") === "on",
              imageUrl,
            });
            setImageUrl("");
            e.currentTarget.reset();
          } catch (err) {
            setError(err instanceof Error ? err.message : "Save failed");
          }
        });
      }}
    >
      <h2 className="font-medium">Add service</h2>
      {error && <p className="text-xs text-red-300">{error}</p>}
      <select name="businessId" required className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5">
        {businesses.map((b) => (
          <option key={b._id} value={b._id}>{b.name}</option>
        ))}
      </select>
      <input name="name" placeholder="Name" required className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5" />
      <textarea name="description" placeholder="Description" className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5" />
      <LocalImageField folder="products" value={imageUrl} onChange={setImageUrl} label="Service photo" />
      <select name="priceMode" className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5">
        <option value="quote">quote</option>
        <option value="fixed">fixed</option>
        <option value="starting">starting</option>
        <option value="hidden">hidden</option>
      </select>
      <input name="priceMinor" placeholder="Price in cents (e.g. 2500 = $25)" className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5" />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="isPublished" defaultChecked /> Published
      </label>
      <button type="submit" disabled={pending} className="rounded bg-amber-700 px-4 py-2 text-sm w-fit disabled:opacity-50">
        {pending ? "Saving…" : "Create"}
      </button>
    </form>
  );
}

export function ServiceEditRow({
  service,
  businessName,
}: {
  service: Service;
  businessName: string;
}) {
  const [imageUrl, setImageUrl] = useState(service.imageUrl ?? "");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <li className="rounded border border-zinc-800 p-4 space-y-3">
      <p className="text-sm text-zinc-400">{businessName}</p>
      <form
        className="grid gap-3 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          setError(null);
          const fd = new FormData(e.currentTarget);
          startTransition(async () => {
            try {
              await saveService({
                id: service._id,
                businessId: String(fd.get("businessId")),
                name: String(fd.get("name")),
                description: String(fd.get("description")),
                priceMode: String(fd.get("priceMode")) as "fixed" | "starting" | "quote" | "hidden",
                priceMinor: fd.get("priceMinor") ? Number(fd.get("priceMinor")) : "",
                isPublished: fd.get("isPublished") === "on",
                imageUrl,
              });
            } catch (err) {
              setError(err instanceof Error ? err.message : "Save failed");
            }
          });
        }}
      >
        {error && <p className="text-xs text-red-300 md:col-span-2">{error}</p>}
        <input type="hidden" name="businessId" value={service.businessId} />
        <input name="name" defaultValue={service.name} required className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5 md:col-span-2" />
        <textarea
          name="description"
          defaultValue={service.description ?? ""}
          className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5 md:col-span-2"
          rows={2}
        />
        <div className="md:col-span-2">
          <LocalImageField folder="products" value={imageUrl} onChange={setImageUrl} label="Service photo" />
        </div>
        <select name="priceMode" defaultValue={service.priceMode} className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5">
          <option value="quote">quote</option>
          <option value="fixed">fixed</option>
          <option value="starting">starting</option>
          <option value="hidden">hidden</option>
        </select>
        <input
          name="priceMinor"
          defaultValue={service.priceMinor ?? ""}
          placeholder="Cents"
          className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5"
        />
        <label className="flex items-center gap-2 text-sm md:col-span-2">
          <input type="checkbox" name="isPublished" defaultChecked={service.isPublished} /> Published
        </label>
        <p className="text-sm text-zinc-500 md:col-span-2">
          {formatMoney(service.priceMinor ?? null) ?? service.priceMode}
        </p>
        <button type="submit" disabled={pending} className="rounded bg-amber-700 px-4 py-2 text-sm w-fit md:col-span-2 disabled:opacity-50">
          {pending ? "Saving…" : "Save"}
        </button>
      </form>
    </li>
  );
}
