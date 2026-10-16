import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { INQUIRY_STATUSES } from "../constants";

const InquirySchema = new Schema(
  {
    type: {
      type: String,
      enum: [
        "general",
        "tattoo",
        "barber",
        "dj_event",
        "bar_event",
        "food",
      ],
      required: true,
      index: true,
    },
    businessId: { type: Schema.Types.ObjectId, ref: "Business", index: true },
    businessSlug: { type: String, index: true },
    status: {
      type: String,
      enum: INQUIRY_STATUSES,
      default: "new",
      index: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    payload: { type: Schema.Types.Mixed, default: {} },
    internalNotes: { type: String, default: "" },
    emailSent: { type: Boolean, default: false },
    emailError: { type: String, default: "" },
    archived: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

export type InquiryDocument = InferSchemaType<typeof InquirySchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Inquiry: Model<InquiryDocument> =
  mongoose.models.Inquiry ?? mongoose.model<InquiryDocument>("Inquiry", InquirySchema);
