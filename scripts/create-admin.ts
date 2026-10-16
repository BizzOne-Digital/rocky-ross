import mongoose from "mongoose";
import { AdminUser } from "../src/lib/models/AdminUser";
import { hashPassword } from "../src/lib/auth/password";

async function main() {
  const uri = process.env.MONGODB_URI;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!uri || !email || !password) {
    console.error("Requires MONGODB_URI, ADMIN_EMAIL, and ADMIN_PASSWORD");
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("ADMIN_PASSWORD must be at least 8 characters");
    process.exit(1);
  }
  await mongoose.connect(uri, { dbName: process.env.MONGODB_DB ?? "inked_infused" });
  const passwordHash = await hashPassword(password);
  const existing = await AdminUser.findOne({ email: email.toLowerCase() });
  if (existing) {
    existing.passwordHash = passwordHash;
    await existing.save();
    console.log("Updated admin password for existing user.");
  } else {
    await AdminUser.create({ email: email.toLowerCase(), passwordHash, name: "Administrator" });
    console.log("Created admin user.");
  }
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
