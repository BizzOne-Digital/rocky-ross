"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdminSession } from "../auth/session";
import { connectDb } from "../db";
import { MenuCategory } from "../models/MenuCategory";
import { MenuItem } from "../models/MenuItem";

export async function saveMenuCategory(input: {
  businessId: string;
  name: string;
  kind: "food" | "drink";
}) {
  await requireAdminSession();
  const data = z
    .object({
      businessId: z.string(),
      name: z.string().min(1),
      kind: z.enum(["food", "drink"]),
    })
    .parse(input);
  await connectDb();
  await MenuCategory.create(data);
  revalidatePath("/admin/menus");
}

export async function saveMenuItem(input: {
  businessId: string;
  categoryId: string;
  name: string;
  description: string;
  priceMinor: number | null;
  soldOut: boolean;
  isSpecial: boolean;
}) {
  await requireAdminSession();
  const data = z
    .object({
      businessId: z.string(),
      categoryId: z.string(),
      name: z.string().min(1),
      description: z.string(),
      priceMinor: z.number().nullable(),
      soldOut: z.boolean(),
      isSpecial: z.boolean(),
    })
    .parse(input);
  await connectDb();
  await MenuItem.create({ ...data, isPublished: true });
  revalidatePath("/admin/menus");
  const biz = await MenuCategory.findById(data.categoryId).lean();
  if (biz) {
    const b = await import("../models/Business").then((m) =>
      m.Business.findById(data.businessId).lean(),
    );
    if (b) revalidatePath(`/${b.slug}`);
  }
}
