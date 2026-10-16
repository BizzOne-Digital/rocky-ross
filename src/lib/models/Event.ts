import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const EventSchema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    startsAt: { type: Date, default: null },
    endsAt: { type: Date, default: null },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type EventDocument = InferSchemaType<typeof EventSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Event: Model<EventDocument> =
  mongoose.models.Event ?? mongoose.model<EventDocument>("Event", EventSchema);
