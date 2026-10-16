import Link from "next/link";
import { requireAdminPage } from "@/lib/auth/guard";
import { connectDb } from "@/lib/db";
import { Business } from "@/lib/models/Business";
import { Service } from "@/lib/models/Service";
import { ServiceCreateForm, ServiceEditRow } from "@/components/admin/ServiceForms";

export default async function AdminServicesPage() {
  await requireAdminPage();
  await connectDb();
  const [businesses, services] = await Promise.all([
    Business.find().sort({ name: 1 }).lean(),
    Service.find({ archived: false }).sort({ sortOrder: 1 }).lean(),
  ]);

  const businessList = businesses.map((b) => ({ _id: String(b._id), name: b.name }));

  return (
    <div>
      <h1 className="text-2xl font-semibold">Services & pricing</h1>
      <p className="mt-2 text-sm text-zinc-400">
        Photos are stored in MongoDB and work on Vercel after deploy.{" "}
        <Link href="/admin" className="text-amber-200/80 underline">Back to dashboard</Link>
      </p>
      <ServiceCreateForm businesses={businessList} />
      <ul className="mt-10 space-y-4">
        {services.map((s) => (
          <ServiceEditRow
            key={String(s._id)}
            service={{
              _id: String(s._id),
              businessId: String(s.businessId),
              name: s.name,
              description: s.description,
              priceMode: s.priceMode,
              priceMinor: s.priceMinor,
              isPublished: s.isPublished,
              imageUrl: s.imageUrl ?? "",
            }}
            businessName={businesses.find((b) => String(b._id) === String(s.businessId))?.name ?? "—"}
          />
        ))}
        {services.length === 0 && <p className="text-zinc-500">No services yet.</p>}
      </ul>
    </div>
  );
}
