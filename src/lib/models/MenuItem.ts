import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const MenuItemSchema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true, index: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "MenuCategory", required: true, index: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    priceMinor: { type: Number, default: null },
    currency: { type: String, default: "USD" },
    isSpecial: { type: Boolean, default: false },
    soldOut: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type MenuItemDocument = InferSchemaType<typeof MenuItemSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const MenuItem: Model<MenuItemDocument> =
  mongoose.models.MenuItem ?? mongoose.model<MenuItemDocument>("MenuItem", MenuItemSchema);
