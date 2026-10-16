import { requireAdminPage } from "@/lib/auth/guard";
import { connectDb } from "@/lib/db";
import { MediaAsset } from "@/lib/models/MediaAsset";
import { Business } from "@/lib/models/Business";
import { isCloudinaryConfigured } from "@/lib/env";
import { MediaUploadPanel } from "@/components/admin/MediaUploadPanel";

export default async function AdminMediaPage() {
  await requireAdminPage();
  await connectDb();
  const [media, businesses] = await Promise.all([
    MediaAsset.find().sort({ createdAt: -1 }).limit(50).lean(),
    Business.find().lean(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Media</h1>
      {!isCloudinaryConfigured() ? (
        <p className="mt-4 rounded border border-amber-900/50 bg-amber-950/30 p-4 text-sm text-amber-200">
          Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your environment to enable uploads.
        </p>
      ) : (
        <MediaUploadPanel
          businesses={businesses.map((b) => ({ id: String(b._id), name: b.name }))}
        />
      )}
      <ul className="mt-10 grid gap-3 sm:grid-cols-2">
        {media.map((m) => (
          <li key={String(m._id)} className="rounded border border-zinc-800 p-3 text-xs">
            <p className="text-zinc-300">{m.usage} · {m.alt || "No alt"}</p>
            <p className="truncate text-zinc-500">{m.url}</p>
          </li>
        ))}
        {media.length === 0 && <p className="text-zinc-500">No media assets yet.</p>}
      </ul>
    </div>
  );
}
