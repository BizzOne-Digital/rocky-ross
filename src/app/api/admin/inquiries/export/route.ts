import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { connectDb } from "@/lib/db";
import { Inquiry } from "@/lib/models/Inquiry";
import { escapeCsvCell } from "@/lib/format";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDb();
  const rows = await Inquiry.find({ archived: false }).sort({ createdAt: -1 }).lean();
  const header = ["id", "type", "status", "name", "email", "phone", "businessSlug", "createdAt", "payload"];
  const lines = [
    header.join(","),
    ...rows.map((r) =>
      [
        escapeCsvCell(String(r._id)),
        escapeCsvCell(r.type),
        escapeCsvCell(r.status),
        escapeCsvCell(r.name),
        escapeCsvCell(r.email),
        escapeCsvCell(r.phone ?? ""),
        escapeCsvCell(r.businessSlug ?? ""),
        escapeCsvCell(r.createdAt?.toISOString() ?? ""),
        escapeCsvCell(JSON.stringify(r.payload ?? {})),
      ].join(","),
    ),
  ];
  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="inquiries.csv"',
    },
  });
}
