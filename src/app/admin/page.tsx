import Link from "next/link";
import { requireAdminPage } from "@/lib/auth/guard";
import { connectDb } from "@/lib/db";
import { hasMongo } from "@/lib/env";
import { Inquiry } from "@/lib/models/Inquiry";
import { Business } from "@/lib/models/Business";
import { Testimonial } from "@/lib/models/Testimonial";
import { Service } from "@/lib/models/Service";

export default async function AdminDashboard() {
  await requireAdminPage();
  if (!hasMongo()) {
    return <p className="text-red-300">MongoDB is not configured.</p>;
  }
  await connectDb();
  const [newInquiries, businesses, serviceCount, pendingTestimonials, recent] = await Promise.all([
    Inquiry.countDocuments({ status: "new", archived: false }),
    Business.countDocuments({ isPublished: true }),
    Service.countDocuments({ archived: false }),
    Testimonial.countDocuments({ status: "pending" }),
    Inquiry.find({ archived: false }).sort({ createdAt: -1 }).limit(8).lean(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="New inquiries" value={newInquiries} href="/admin/inquiries" />
        <Stat label="Published businesses" value={businesses} href="/admin/businesses" />
        <Stat label="Services" value={serviceCount} href="/admin/services" />
        <Stat label="Pending testimonials" value={pendingTestimonials} href="/admin/testimonials" />
      </div>
      <h2 className="mt-10 text-lg font-medium">Recent inquiries</h2>
      {recent.length === 0 ? (
        <p className="mt-4 text-sm text-zinc-500">No inquiries yet.</p>
      ) : (
        <ul className="mt-4 divide-y divide-zinc-800">
          {recent.map((r) => (
            <li key={String(r._id)} className="py-3 text-sm">
              <span className="text-amber-200/90">{r.type}</span> — {r.name} ({r.email}) · {r.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Stat({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link href={href} className="rounded border border-zinc-800 p-5 hover:border-zinc-600">
      <p className="text-3xl font-semibold text-white">{value}</p>
      <p className="text-sm text-zinc-400">{label}</p>
    </Link>
  );
}
