import mongoose from "mongoose";
import { PREVIEW_BUSINESSES, PREVIEW_SETTINGS } from "../src/lib/seed-data";
import { Business } from "../src/lib/models/Business";
import { GlobalSettings } from "../src/lib/models/GlobalSettings";

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI required");
    process.exit(1);
  }
  await mongoose.connect(uri, { dbName: process.env.MONGODB_DB ?? "inked_infused" });

  await GlobalSettings.findOneAndUpdate(
    { singleton: "main" },
    {
      singleton: "main",
      brandName: PREVIEW_SETTINGS.brandName,
      destinationName: PREVIEW_SETTINGS.destinationName,
      tagline: PREVIEW_SETTINGS.tagline,
      address: PREVIEW_SETTINGS.address,
      contactEmail: PREVIEW_SETTINGS.contactEmail,
      contactPhone: PREVIEW_SETTINGS.contactPhone,
      homepageEyebrow: PREVIEW_SETTINGS.homepageEyebrow,
      homepageHeadline: PREVIEW_SETTINGS.homepageHeadline,
      homepageIntro: PREVIEW_SETTINGS.homepageIntro,
      seoDefaultTitle: PREVIEW_SETTINGS.seoDefaultTitle,
      seoDefaultDescription: PREVIEW_SETTINGS.seoDefaultDescription,
      palette: PREVIEW_SETTINGS.palette,
      recognitions: [],
    },
    { upsert: true },
  );

  const editorialFields = (b: (typeof PREVIEW_BUSINESSES)[number]) => ({
    name: b.name,
    shortDescription: b.shortDescription,
    template: b.template,
    accentColor: b.accentColor,
    status: b.status,
    tileOrder: b.tileOrder,
    slideshowIntervalMs: b.slideshowIntervalMs,
    slideshowAutoplay: b.slideshowAutoplay,
    heroEyebrow: b.heroEyebrow,
    heroTitle: b.heroTitle,
    heroSubtitle: b.heroSubtitle,
    introHtml: b.introHtml,
    seoTitle: b.seoTitle,
    seoDescription: b.seoDescription,
  });

  for (const b of PREVIEW_BUSINESSES) {
    const result = await Business.findOneAndUpdate(
      { slug: b.slug },
      {
        $set: editorialFields(b),
        $setOnInsert: { slug: b.slug, isPublished: true },
      },
      { upsert: true, returnDocument: "after" },
    );
    console.log(result ? `Synced business: ${b.slug}` : `Failed: ${b.slug}`);
  }

  await mongoose.disconnect();
  console.log("Seed complete (idempotent).");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
