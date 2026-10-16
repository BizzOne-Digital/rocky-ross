"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { UploadFolder } from "@/lib/uploads/constants";
import { isStoredUploadUrl } from "@/lib/uploads/stored-upload-url";

type Toast = { type: "success" | "error"; message: string };

type Props = {
  folder: UploadFolder;
  value: string;
  onChange: (url: string) => void;
  label?: string;
};

async function deleteUploadUrl(url: string) {
  await fetch("/api/upload", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
}

export function LocalImageField({ folder, value, onChange, label = "Image" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (next: Toast) => {
    setToast(next);
    window.setTimeout(() => setToast(null), 4000);
  };

  const handleFile = async (file: File | null) => {
    if (!file) return;
    setUploading(true);
    setToast(null);
    const previous = value;

    try {
      const form = new FormData();
      form.append("file", file);
      form.append("folder", folder);

      const res = await fetch("/api/upload", { method: "POST", body: form });
      const json = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !json.url) {
        throw new Error(json.error ?? "Upload failed");
      }

      if (isStoredUploadUrl(previous) && previous !== json.url) {
        await deleteUploadUrl(previous).catch(() => undefined);
      }

      onChange(json.url);
      showToast({ type: "success", message: "Image uploaded" });
    } catch (err) {
      showToast({
        type: "error",
        message: err instanceof Error ? err.message : "Upload failed",
      });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemove = async () => {
    if (isStoredUploadUrl(value)) {
      setUploading(true);
      try {
        await deleteUploadUrl(value);
        showToast({ type: "success", message: "Image removed" });
      } catch {
        showToast({ type: "error", message: "Could not delete stored image" });
      } finally {
        setUploading(false);
      }
    }
    onChange("");
  };

  const previewSrc = value || null;

  return (
    <div className="space-y-2">
      <p className="text-sm text-zinc-300">{label}</p>
      {toast && (
        <p
          className={`rounded px-3 py-2 text-xs ${
            toast.type === "success"
              ? "bg-emerald-950 text-emerald-200 border border-emerald-800"
              : "bg-red-950 text-red-200 border border-red-800"
          }`}
          role="status"
        >
          {toast.message}
        </p>
      )}
      {previewSrc ? (
        <div className="flex flex-wrap items-start gap-4">
          <div className="relative h-24 w-32 overflow-hidden rounded border border-zinc-700 bg-zinc-900">
            <Image
              src={previewSrc}
              alt=""
              fill
              className="object-cover"
              sizes="128px"
              unoptimized={previewSrc.startsWith("/api/uploads/")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="rounded border border-zinc-600 px-3 py-1.5 text-xs hover:bg-zinc-800 disabled:opacity-50"
            >
              {uploading ? "Uploading…" : "Replace"}
            </button>
            <button
              type="button"
              disabled={uploading}
              onClick={handleRemove}
              className="rounded border border-zinc-700 px-3 py-1.5 text-xs text-red-300 hover:bg-zinc-900 disabled:opacity-50"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="rounded border border-dashed border-zinc-600 px-4 py-6 text-sm text-zinc-400 hover:border-zinc-500 hover:text-zinc-200 disabled:opacity-50"
        >
          {uploading ? "Uploading…" : "Choose image (PNG, JPEG, WebP, GIF — max 8MB)"}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}
