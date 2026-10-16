import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const MenuCategorySchema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true, index: true },
    name: { type: String, required: true },
    kind: { type: String, enum: ["food", "drink"], default: "food" },
    sortOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type MenuCategoryDocument = InferSchemaType<typeof MenuCategorySchema> & {
  _id: mongoose.Types.ObjectId;
};

export const MenuCategory: Model<MenuCategoryDocument> =
  mongoose.models.MenuCategory ??
  mongoose.model<MenuCategoryDocument>("MenuCategory", MenuCategorySchema);
