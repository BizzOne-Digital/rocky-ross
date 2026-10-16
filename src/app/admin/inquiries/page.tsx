import { requireAdminPage } from "@/lib/auth/guard";
import { connectDb } from "@/lib/db";
import { Inquiry } from "@/lib/models/Inquiry";
import { updateInquiryStatus, archiveInquiry } from "@/lib/actions/admin";
import { INQUIRY_STATUSES } from "@/lib/constants";
import Link from "next/link";

export default async function AdminInquiriesPage() {
  await requireAdminPage();
  await connectDb();
  const inquiries = await Inquiry.find({ archived: false }).sort({ createdAt: -1 }).limit(100).lean();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Inquiries & requests</h1>
        <Link href="/api/admin/inquiries/export" className="text-sm text-amber-300 hover:underline">
          Export CSV
        </Link>
      </div>
      {inquiries.length === 0 ? (
        <p className="mt-6 text-sm text-zinc-500">No inquiries yet.</p>
      ) : (
        <ul className="mt-8 space-y-6">
          {inquiries.map((inq) => (
            <li key={String(inq._id)} className="rounded border border-zinc-800 p-4 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium text-white">{inq.name} · {inq.email}</p>
                <span className="text-xs uppercase text-zinc-500">{inq.type}</span>
              </div>
              <pre className="mt-3 max-h-40 overflow-auto rounded bg-zinc-900 p-3 text-xs text-zinc-400">
                {JSON.stringify(inq.payload, null, 2)}
              </pre>
              <form
                className="mt-3 flex flex-wrap items-center gap-2"
                action={async (fd) => {
                  "use server";
                  await updateInquiryStatus(
                    String(inq._id),
                    String(fd.get("status")),
                    String(fd.get("notes") ?? ""),
                  );
                }}
              >
                <select name="status" defaultValue={inq.status} className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1">
                  {INQUIRY_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <input
                  name="notes"
                  placeholder="Internal notes"
                  defaultValue={inq.internalNotes}
                  className="flex-1 rounded border border-zinc-700 bg-zinc-900 px-2 py-1"
                />
                <button type="submit" className="rounded bg-zinc-700 px-3 py-1">Update</button>
              </form>
              <form
                className="mt-2"
                action={async () => {
                  "use server";
                  await archiveInquiry(String(inq._id));
                }}
              >
                <button type="submit" className="text-xs text-red-400">Archive</button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
