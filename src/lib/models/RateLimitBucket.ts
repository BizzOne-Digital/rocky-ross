import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const RateLimitBucketSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    count: { type: Number, default: 0 },
    resetAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export type RateLimitBucketDocument = InferSchemaType<typeof RateLimitBucketSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const RateLimitBucket: Model<RateLimitBucketDocument> =
  mongoose.models.RateLimitBucket ??
  mongoose.model<RateLimitBucketDocument>("RateLimitBucket", RateLimitBucketSchema);
