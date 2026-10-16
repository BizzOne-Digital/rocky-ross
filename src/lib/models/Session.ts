import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const SessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "AdminUser", required: true, index: true },
    tokenHash: { type: String, required: true, unique: true, index: true },
    expiresAt: { type: Date, required: true, index: true },
  },
  { timestamps: true },
);

export type SessionDocument = InferSchemaType<typeof SessionSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Session: Model<SessionDocument> =
  mongoose.models.Session ?? mongoose.model<SessionDocument>("Session", SessionSchema);
