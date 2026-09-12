import mongoose from "mongoose";
import { Testimonial } from "../models/Testimonial.js";
import { initialTestimonials } from "../seed/data.js";
import { getDbStatus } from "../config/db.js";

let inMemoryTestimonials = [...initialTestimonials];

export const getTestimonials = async (req, res) => {
  try {
    if (getDbStatus()) {
      let tests = await Testimonial.find().sort({ createdAt: -1 });
      if (tests.length === 0) {
        await Testimonial.insertMany(initialTestimonials);
        tests = await Testimonial.find().sort({ createdAt: -1 });
      }
      return res.json({ success: true, count: tests.length, data: tests });
    }
    return res.json({ success: true, count: inMemoryTestimonials.length, data: inMemoryTestimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const data = req.body;
    const newTestimonial = {
      ...data,
      id: "t_" + Date.now(),
      rating: Number(data.rating) || 5,
      createdAt: new Date().toISOString()
    };

    if (getDbStatus()) {
      const created = new Testimonial(newTestimonial);
      await created.save();
      return res.status(201).json({ success: true, message: "Testimonial created successfully!", data: created });
    } else {
      inMemoryTestimonials.unshift(newTestimonial);
      return res.status(201).json({ success: true, message: "Testimonial created successfully (In-Memory)", data: newTestimonial });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (getDbStatus()) {
      const isObjectId = mongoose.Types.ObjectId.isValid(id);
      const conditions = [{ id }];
      if (isObjectId) conditions.push({ _id: id });
      const updated = await Testimonial.findOneAndUpdate({ $or: conditions }, data, { new: true });
      return res.json({ success: true, message: "Testimonial updated successfully!", data: updated });
    } else {
      const idx = inMemoryTestimonials.findIndex(t => t.id === id);
      if (idx !== -1) inMemoryTestimonials[idx] = { ...inMemoryTestimonials[idx], ...data };
      return res.json({ success: true, message: "Testimonial updated successfully!", data: inMemoryTestimonials[idx] });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDbStatus()) {
      const isObjectId = mongoose.Types.ObjectId.isValid(id);
      const conditions = [{ id }];
      if (isObjectId) conditions.push({ _id: id });
      await Testimonial.findOneAndDelete({ $or: conditions });
      return res.json({ success: true, message: "Testimonial deleted successfully!" });
    } else {
      const idx = inMemoryTestimonials.findIndex(t => t.id === id);
      if (idx !== -1) inMemoryTestimonials.splice(idx, 1);
      return res.json({ success: true, message: "Testimonial deleted successfully!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
