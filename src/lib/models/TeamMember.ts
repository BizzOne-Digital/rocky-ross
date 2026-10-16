import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const TeamMemberSchema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true, index: true },
    name: { type: String, required: true },
    role: { type: String, default: "" },
    bio: { type: String, default: "" },
    portfolioMediaIds: [{ type: Schema.Types.ObjectId, ref: "MediaAsset" }],
    avatarMediaId: { type: Schema.Types.ObjectId, ref: "MediaAsset" },
    sortOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type TeamMemberDocument = InferSchemaType<typeof TeamMemberSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const TeamMember: Model<TeamMemberDocument> =
  mongoose.models.TeamMember ??
  mongoose.model<TeamMemberDocument>("TeamMember", TeamMemberSchema);
