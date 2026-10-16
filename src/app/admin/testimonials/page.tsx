import { requireAdminPage } from "@/lib/auth/guard";
import { connectDb } from "@/lib/db";
import { Testimonial } from "@/lib/models/Testimonial";
import { Business } from "@/lib/models/Business";
import { createTestimonial, updateTestimonialStatus } from "@/lib/actions/admin";

export default async function AdminTestimonialsPage() {
  await requireAdminPage();
  await connectDb();
  const [items, businesses] = await Promise.all([
    Testimonial.find().sort({ createdAt: -1 }).lean(),
    Business.find().lean(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Testimonials</h1>
      <p className="text-sm text-zinc-400">Only approved testimonials appear on the public site.</p>
      <form
        className="mt-8 max-w-xl space-y-3 rounded border border-zinc-800 p-5"
        action={async (fd) => {
          "use server";
          await createTestimonial({
            businessId: String(fd.get("businessId") || ""),
            customerName: String(fd.get("customerName")),
            quote: String(fd.get("quote")),
            rating: fd.get("rating") ? Number(fd.get("rating")) : undefined,
          });
        }}
      >
        <h2 className="font-medium">Add testimonial (pending until approved)</h2>
        <select name="businessId" className="w-full rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5">
          <option value="">Parent brand</option>
          {businesses.map((b) => (
            <option key={String(b._id)} value={String(b._id)}>{b.name}</option>
          ))}
        </select>
        <input name="customerName" required placeholder="Customer name" className="w-full rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5" />
        <textarea name="quote" required placeholder="Quote" className="w-full rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5" />
        <input name="rating" type="number" min={1} max={5} placeholder="Rating (optional)" className="w-full rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5" />
        <button type="submit" className="rounded bg-amber-700 px-4 py-2 text-sm">Save as pending</button>
      </form>
      <ul className="mt-10 space-y-4">
        {items.map((t) => (
          <li key={String(t._id)} className="rounded border border-zinc-800 p-4 text-sm">
            <p className="text-white">&ldquo;{t.quote}&rdquo; — {t.customerName}</p>
            <p className="mt-1 text-xs text-zinc-500">Status: {t.status}</p>
            <div className="mt-2 flex gap-2">
              {(["pending", "approved", "archived"] as const).map((status) => (
                <form key={status} action={async () => {
                  "use server";
                  await updateTestimonialStatus(String(t._id), status);
                }}>
                  <button type="submit" className="text-xs text-amber-300">{status}</button>
                </form>
              ))}
            </div>
          </li>
        ))}
        {items.length === 0 && <p className="text-zinc-500">No testimonials.</p>}
      </ul>
    </div>
  );
}
