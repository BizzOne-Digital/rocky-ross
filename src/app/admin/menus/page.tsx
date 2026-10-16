import { requireAdminPage } from "@/lib/auth/guard";
import { connectDb } from "@/lib/db";
import { Business } from "@/lib/models/Business";
import { MenuCategory } from "@/lib/models/MenuCategory";
import { MenuItem } from "@/lib/models/MenuItem";
import { saveMenuCategory, saveMenuItem } from "@/lib/actions/menus";
import { formatMoney } from "@/lib/format";

export default async function AdminMenusPage() {
  await requireAdminPage();
  await connectDb();
  const foodBusinesses = await Business.find({ template: { $in: ["food", "bar"] } }).lean();
  const categories = await MenuCategory.find().sort({ sortOrder: 1 }).lean();
  const items = await MenuItem.find().sort({ sortOrder: 1 }).lean();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Menus (food & drink)</h1>
      <form
        className="mt-8 grid max-w-xl gap-3 rounded border border-zinc-800 p-5"
        action={async (fd) => {
          "use server";
          await saveMenuCategory({
            businessId: String(fd.get("businessId")),
            name: String(fd.get("name")),
            kind: String(fd.get("kind")) as "food" | "drink",
          });
        }}
      >
        <h2 className="font-medium">Add category</h2>
        <select name="businessId" className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5">
          {foodBusinesses.map((b) => (
            <option key={String(b._id)} value={String(b._id)}>{b.name}</option>
          ))}
        </select>
        <input name="name" required placeholder="Category name" className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5" />
        <select name="kind" className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5">
          <option value="food">food</option>
          <option value="drink">drink</option>
        </select>
        <button type="submit" className="w-fit rounded bg-amber-700 px-4 py-2 text-sm">Add category</button>
      </form>
      <form
        className="mt-8 grid max-w-xl gap-3 rounded border border-zinc-800 p-5"
        action={async (fd) => {
          "use server";
          await saveMenuItem({
            businessId: String(fd.get("businessId")),
            categoryId: String(fd.get("categoryId")),
            name: String(fd.get("name")),
            description: String(fd.get("description")),
            priceMinor: fd.get("priceMinor") ? Number(fd.get("priceMinor")) : null,
            soldOut: fd.get("soldOut") === "on",
            isSpecial: fd.get("isSpecial") === "on",
          });
        }}
      >
        <h2 className="font-medium">Add menu item</h2>
        <select name="businessId" className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5">
          {foodBusinesses.map((b) => (
            <option key={String(b._id)} value={String(b._id)}>{b.name}</option>
          ))}
        </select>
        <select name="categoryId" required className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5">
          {categories.map((c) => (
            <option key={String(c._id)} value={String(c._id)}>{c.name}</option>
          ))}
        </select>
        <input name="name" required placeholder="Item name" className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5" />
        <textarea name="description" placeholder="Description" className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5" />
        <input name="priceMinor" placeholder="Price in cents" className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5" />
        <label className="flex gap-2 text-sm"><input type="checkbox" name="soldOut" /> Sold out</label>
        <label className="flex gap-2 text-sm"><input type="checkbox" name="isSpecial" /> Special</label>
        <button type="submit" className="w-fit rounded bg-amber-700 px-4 py-2 text-sm">Add item</button>
      </form>
      <ul className="mt-10 space-y-2 text-sm text-zinc-400">
        {items.map((i) => (
          <li key={String(i._id)}>
            {i.name} — {formatMoney(i.priceMinor ?? null) ?? "no price"}
            {i.soldOut ? " (sold out)" : ""}
          </li>
        ))}
        {items.length === 0 && <p>No menu items yet.</p>}
      </ul>
    </div>
  );
}
