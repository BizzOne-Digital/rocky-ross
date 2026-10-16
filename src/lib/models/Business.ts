import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const HoursDaySchema = new Schema(
  {
    open: { type: String, default: "" },
    close: { type: String, default: "" },
    closed: { type: Boolean, default: false },
  },
  { _id: false },
);

const BusinessSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    shortDescription: { type: String, default: "" },
    template: {
      type: String,
      enum: ["tattoo", "food", "bar", "barber", "events"],
      required: true,
    },
    accentColor: { type: String, default: "#782C40" },
    status: {
      type: String,
      enum: ["draft", "published", "coming_soon", "open"],
      default: "published",
    },
    tileOrder: { type: Number, default: 0 },
    slideshowIntervalMs: { type: Number, default: 6000 },
    slideshowAutoplay: { type: Boolean, default: true },
    heroEyebrow: { type: String, default: "" },
    heroTitle: { type: String, default: "" },
    heroSubtitle: { type: String, default: "" },
    introHtml: { type: String, default: "" },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    contactEmail: { type: String, default: "" },
    contactPhone: { type: String, default: "" },
    bookingUrl: { type: String, default: "" },
    social: {
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      tiktok: { type: String, default: "" },
      website: { type: String, default: "" },
    },
    hours: {
      monday: { type: HoursDaySchema, default: () => ({}) },
      tuesday: { type: HoursDaySchema, default: () => ({}) },
      wednesday: { type: HoursDaySchema, default: () => ({}) },
      thursday: { type: HoursDaySchema, default: () => ({}) },
      friday: { type: HoursDaySchema, default: () => ({}) },
      saturday: { type: HoursDaySchema, default: () => ({}) },
      sunday: { type: HoursDaySchema, default: () => ({}) },
    },
    hourNotes: { type: String, default: "" },
    isPublished: { type: Boolean, default: true, index: true },
    draft: { type: Schema.Types.Mixed, default: null },
  },
  { timestamps: true },
);

export type BusinessDocument = InferSchemaType<typeof BusinessSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Business: Model<BusinessDocument> =
  mongoose.models.Business ??
  mongoose.model<BusinessDocument>("Business", BusinessSchema);
