import { requireAdminPage } from "@/lib/auth/guard";
import { connectDb } from "@/lib/db";
import { GlobalSettings } from "@/lib/models/GlobalSettings";
import { updateGlobalSettings } from "@/lib/actions/admin";
import { PREVIEW_SETTINGS } from "@/lib/seed-data";

export default async function AdminSettingsPage() {
  await requireAdminPage();
  await connectDb();
  const doc = await GlobalSettings.findOne({ singleton: "main" }).lean();
  const s = doc ?? PREVIEW_SETTINGS;

  return (
    <div>
      <h1 className="text-2xl font-semibold">Global settings</h1>
      <form
        className="mt-8 max-w-2xl space-y-4"
        action={async (fd) => {
          "use server";
          await updateGlobalSettings({
            homepageHeadline: String(fd.get("homepageHeadline")),
            homepageIntro: String(fd.get("homepageIntro")),
            contactEmail: String(fd.get("contactEmail")),
            contactPhone: String(fd.get("contactPhone")),
            address: String(fd.get("address")),
            happyHourNote: String(fd.get("happyHourNote")),
            seoDefaultTitle: String(fd.get("seoDefaultTitle")),
            seoDefaultDescription: String(fd.get("seoDefaultDescription")),
          });
        }}
      >
        <Field name="homepageHeadline" label="Homepage headline" defaultValue={s.homepageHeadline} />
        <Textarea name="homepageIntro" label="Homepage intro" defaultValue={s.homepageIntro} />
        <Field name="address" label="Address" defaultValue={s.address} />
        <Field name="contactEmail" label="Main contact email" defaultValue={s.contactEmail} />
        <Field name="contactPhone" label="Main contact phone" defaultValue={s.contactPhone} />
        <Textarea name="happyHourNote" label="Happy hour note (bar)" defaultValue={(s as { happyHourNote?: string }).happyHourNote ?? ""} />
        <Field name="seoDefaultTitle" label="SEO title" defaultValue={s.seoDefaultTitle} />
        <Textarea name="seoDefaultDescription" label="SEO description" defaultValue={s.seoDefaultDescription} />
        <button type="submit" className="rounded bg-amber-700 px-4 py-2 text-sm">Save settings</button>
      </form>
    </div>
  );
}

function Field({ name, label, defaultValue }: { name: string; label: string; defaultValue: string }) {
  return (
    <label className="block text-sm">
      {label}
      <input name={name} defaultValue={defaultValue} className="mt-1 w-full rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5" />
    </label>
  );
}

function Textarea({ name, label, defaultValue }: { name: string; label: string; defaultValue: string }) {
  return (
    <label className="block text-sm">
      {label}
      <textarea name={name} rows={3} defaultValue={defaultValue} className="mt-1 w-full rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5" />
    </label>
  );
}
