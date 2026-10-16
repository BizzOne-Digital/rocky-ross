import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const MediaAssetSchema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: "Business", index: true },
    usage: {
      type: String,
      enum: ["logo", "tile", "hero", "gallery", "property", "brand"],
      default: "gallery",
    },
    cloudinaryPublicId: { type: String, required: true },
    url: { type: String, required: true },
    width: { type: Number, default: 1200 },
    height: { type: Number, default: 800 },
    alt: { type: String, default: "" },
    caption: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
    focalX: { type: Number, default: 50 },
    focalY: { type: Number, default: 50 },
    logoFit: { type: String, enum: ["contain", "cover"], default: "contain" },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type MediaAssetDocument = InferSchemaType<typeof MediaAssetSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const MediaAsset: Model<MediaAssetDocument> =
  mongoose.models.MediaAsset ??
  mongoose.model<MediaAssetDocument>("MediaAsset", MediaAssetSchema);
