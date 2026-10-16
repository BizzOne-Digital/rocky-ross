import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const ServiceSchema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true, index: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    durationMinutes: { type: Number, default: null },
    priceMode: {
      type: String,
      enum: ["fixed", "starting", "quote", "hidden"],
      default: "quote",
    },
    priceMinor: { type: Number, default: null },
    currency: { type: String, default: "USD" },
    sortOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
    archived: { type: Boolean, default: false },
    imageUrl: { type: String, default: "" },
  },
  { timestamps: true },
);

export type ServiceDocument = InferSchemaType<typeof ServiceSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Service: Model<ServiceDocument> =
  mongoose.models.Service ?? mongoose.model<ServiceDocument>("Service", ServiceSchema);
