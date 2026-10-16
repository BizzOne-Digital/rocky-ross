import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { BRAND, PALETTE } from "../constants";

const RecognitionSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    url: { type: String, default: "" },
    verified: { type: Boolean, default: false },
  },
  { _id: true },
);

const GlobalSettingsSchema = new Schema(
  {
    singleton: { type: String, default: "main", unique: true },
    brandName: { type: String, default: BRAND.parent },
    destinationName: { type: String, default: BRAND.destination },
    tagline: { type: String, default: BRAND.tagline },
    address: { type: String, default: BRAND.address.full },
    contactEmail: { type: String, default: BRAND.defaultEmail },
    contactPhone: { type: String, default: BRAND.defaultPhone },
    homepageEyebrow: { type: String, default: "ROCKY ROSS PRODUCTIONS PRESENTS" },
    homepageHeadline: { type: String, default: "TATTOOS. TACOS. TEQUILA." },
    homepageIntro: {
      type: String,
      default:
        "Meet Inked & Infused — a Colorado Springs destination for ink, flavor, drinks, and fresh cuts, with DJ services and event rentals from Ross Squad.",
    },
    social: {
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      tiktok: { type: String, default: "" },
    },
    seoDefaultTitle: { type: String, default: `${BRAND.parent} | ${BRAND.destination}` },
    seoDefaultDescription: {
      type: String,
      default:
        "Inked & Infused in Colorado Springs — tattoos, tacos, tequila, trims, and Ross Squad DJs & event rentals.",
    },
    primaryProductionUrl: { type: String, default: "" },
    palette: {
      ink: { type: String, default: PALETTE.ink },
      ivory: { type: String, default: PALETTE.ivory },
      burgundy: { type: String, default: PALETTE.burgundy },
      brass: { type: String, default: PALETTE.brass },
    },
    recognitions: { type: [RecognitionSchema], default: [] },
    happyHourNote: { type: String, default: "" },
    menuPdfUrl: { type: String, default: "" },
  },
  { timestamps: true },
);

export type GlobalSettingsDocument = InferSchemaType<typeof GlobalSettingsSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const GlobalSettings: Model<GlobalSettingsDocument> =
  mongoose.models.GlobalSettings ??
  mongoose.model<GlobalSettingsDocument>("GlobalSettings", GlobalSettingsSchema);
