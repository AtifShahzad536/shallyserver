import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    category: { type: String, required: true, enum: ["Social Media", "Video Editing", "Content Writing"] },
    tags: [{ type: String }],
    client: { type: String, required: true },
    year: { type: String, default: "2026" },
    role: { type: String, required: true },
    coverImage: { type: String, required: true },
    mockupType: { type: String, default: "instagram" },
    featured: { type: Boolean, default: false },
    accentColor: { type: String, default: "#A855F7" },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    deliverables: [{ type: String }],
    metrics: [
      {
        label: { type: String },
        value: { type: String }
      }
    ],
    tools: [{ type: String }],
    gallery: [{ type: String }]
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
