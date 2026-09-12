import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    slug: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    tagline: { type: String, default: "" },
    accent: { type: String, default: "#A855F7" },
    glow: { type: String, default: "rgba(168, 85, 247, 0.25)" },
    icon: { type: String, default: "Sparkles" },
    description: { type: String, required: true },
    deliverables: [{ type: String }],
    stats: { type: String, default: "" }
  },
  { timestamps: true }
);

export const Service = mongoose.model("Service", serviceSchema);
