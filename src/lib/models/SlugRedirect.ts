import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const SlugRedirectSchema = new Schema(
  {
    fromSlug: { type: String, required: true, unique: true },
    toSlug: { type: String, required: true },
  },
  { timestamps: true },
);

export type SlugRedirectDocument = InferSchemaType<typeof SlugRedirectSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const SlugRedirect: Model<SlugRedirectDocument> =
  mongoose.models.SlugRedirect ??
  mongoose.model<SlugRedirectDocument>("SlugRedirect", SlugRedirectSchema);
