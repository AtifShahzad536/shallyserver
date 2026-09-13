import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    contentType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
    public_id: { type: String }
  },
  { timestamps: true }
);

export const Media = mongoose.models.Media || mongoose.model("Media", mediaSchema);
