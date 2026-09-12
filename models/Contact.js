import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    service: { type: String, default: "All-in-One Retainer" },
    budget: { type: String, default: "$1,500 - $3,000" },
    message: { type: String, required: true, trim: true },
    timeline: { type: String, default: "Within 2-4 Weeks" },
    status: { type: String, enum: ["New", "Contacted", "Closed"], default: "New" }
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactSchema);
