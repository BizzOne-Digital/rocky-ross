import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const TestimonialSchema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: "Business", index: true },
    customerName: { type: String, required: true },
    quote: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: null },
    sourceUrl: { type: String, default: "" },
    eventDate: { type: Date, default: null },
    sortOrder: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "approved", "archived"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true },
);

export type TestimonialDocument = InferSchemaType<typeof TestimonialSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Testimonial: Model<TestimonialDocument> =
  mongoose.models.Testimonial ??
  mongoose.model<TestimonialDocument>("Testimonial", TestimonialSchema);
