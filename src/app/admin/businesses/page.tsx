import { requireAdminPage } from "@/lib/auth/guard";
import { connectDb } from "@/lib/db";
import { Business } from "@/lib/models/Business";
import { updateBusiness } from "@/lib/actions/admin";
import { introHtmlToPlainText, plainTextToIntroHtml } from "@/lib/intro-text";

export default async function AdminBusinessesPage() {
  await requireAdminPage();
  await connectDb();
  const businesses = await Business.find().sort({ tileOrder: 1 }).lean();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Businesses</h1>
      <p className="mt-2 text-sm text-zinc-400">Edit published content, slugs (redirects preserved), and tile order.</p>
      <div className="mt-8 space-y-10">
        {businesses.map((b) => (
          <form
            key={String(b._id)}
            className="rounded border border-zinc-800 p-5 space-y-3"
            action={async (fd) => {
              "use server";
              await updateBusiness({
                id: String(b._id),
                name: String(fd.get("name")),
                slug: String(fd.get("slug")),
                shortDescription: String(fd.get("shortDescription")),
                status: String(fd.get("status")) as "draft" | "published" | "coming_soon" | "open",
                accentColor: String(fd.get("accentColor")),
                heroTitle: String(fd.get("heroTitle")),
                heroSubtitle: String(fd.get("heroSubtitle")),
                introHtml: plainTextToIntroHtml(String(fd.get("introText") ?? "")),
                isPublished: fd.get("isPublished") === "on",
                tileOrder: Number(fd.get("tileOrder")),
                contactEmail: String(fd.get("contactEmail")),
                contactPhone: String(fd.get("contactPhone")),
                bookingUrl: String(fd.get("bookingUrl")),
              });
            }}
          >
            <h2 className="text-lg text-amber-200/90">{b.name}</h2>
            <div className="grid gap-3 md:grid-cols-2">
              <Field name="name" label="Name" defaultValue={b.name} />
              <Field name="slug" label="Slug (changing creates redirect)" defaultValue={b.slug} />
              <Field name="tileOrder" label="Homepage tile order" defaultValue={String(b.tileOrder)} />
              <label className="text-sm">
                Status
                <select name="status" defaultValue={b.status} className="mt-1 w-full rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5">
                  <option value="open">open</option>
                  <option value="coming_soon">coming_soon</option>
                  <option value="published">published</option>
                  <option value="draft">draft</option>
                </select>
              </label>
              <Field name="accentColor" label="Accent" defaultValue={b.accentColor} />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="isPublished" defaultChecked={b.isPublished} /> Published
              </label>
            </div>
            <Field name="shortDescription" label="Tile description" defaultValue={b.shortDescription} />
            <Field name="heroTitle" label="Hero title" defaultValue={b.heroTitle} />
            <Field name="heroSubtitle" label="Hero subtitle" defaultValue={b.heroSubtitle} />
            <label className="block text-sm">
              Intro text
              <span className="mt-0.5 block text-xs text-zinc-500">Write normally — leave a blank line between paragraphs.</span>
              <textarea
                name="introText"
                rows={6}
                defaultValue={introHtmlToPlainText(b.introHtml)}
                className="mt-1 w-full rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5 text-sm leading-relaxed"
              />
            </label>
            <div className="grid gap-3 md:grid-cols-3">
              <Field name="contactEmail" label="Business email" defaultValue={b.contactEmail} />
              <Field name="contactPhone" label="Business phone" defaultValue={b.contactPhone} />
              <Field name="bookingUrl" label="Booking URL" defaultValue={b.bookingUrl} />
            </div>
            <button type="submit" className="rounded bg-amber-700 px-4 py-2 text-sm">Save</button>
          </form>
        ))}
      </div>
    </div>
  );
}

function Field({ name, label, defaultValue }: { name: string; label: string; defaultValue: string }) {
  return (
    <label className="text-sm">
      {label}
      <input name={name} defaultValue={defaultValue} className="mt-1 w-full rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5" />
    </label>
  );
}
