import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    avatar: { type: String, required: true },
    quote: { type: String, required: true },
    rating: { type: Number, default: 5 },
    tag: { type: String, default: "Client Review" }
  },
  { timestamps: true }
);

export const Testimonial = mongoose.model("Testimonial", testimonialSchema);
