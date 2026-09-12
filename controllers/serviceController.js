import mongoose from "mongoose";
import { Service } from "../models/Service.js";
import { initialServices } from "../seed/data.js";
import { getDbStatus } from "../config/db.js";

let inMemoryServices = [...initialServices];

export const getServices = async (req, res) => {
  try {
    if (getDbStatus()) {
      let services = await Service.find().sort({ id: 1 });
      if (services.length === 0) {
        await Service.insertMany(initialServices);
        services = await Service.find().sort({ id: 1 });
      }
      return res.json({ success: true, count: services.length, data: services });
    }
    return res.json({ success: true, count: inMemoryServices.length, data: inMemoryServices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const data = req.body;
    const newService = {
      ...data,
      id: data.id || "0" + (inMemoryServices.length + 1),
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      deliverables: Array.isArray(data.deliverables) ? data.deliverables : (data.deliverables ? data.deliverables.split("\n").filter(Boolean) : [])
    };

    if (getDbStatus()) {
      const created = new Service(newService);
      await created.save();
      return res.status(201).json({ success: true, message: "Service created successfully!", data: created });
    } else {
      inMemoryServices.push(newService);
      return res.status(201).json({ success: true, message: "Service created successfully (In-Memory)", data: newService });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (getDbStatus()) {
      const isObjectId = mongoose.Types.ObjectId.isValid(id);
      const conditions = [{ id }];
      if (isObjectId) conditions.push({ _id: id });
      const updated = await Service.findOneAndUpdate({ $or: conditions }, data, { new: true });
      return res.json({ success: true, message: "Service updated successfully!", data: updated });
    } else {
      const idx = inMemoryServices.findIndex(s => s.id === id);
      if (idx !== -1) inMemoryServices[idx] = { ...inMemoryServices[idx], ...data };
      return res.json({ success: true, message: "Service updated successfully!", data: inMemoryServices[idx] });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDbStatus()) {
      const isObjectId = mongoose.Types.ObjectId.isValid(id);
      const conditions = [{ id }];
      if (isObjectId) conditions.push({ _id: id });
      await Service.findOneAndDelete({ $or: conditions });
      return res.json({ success: true, message: "Service deleted successfully!" });
    } else {
      const idx = inMemoryServices.findIndex(s => s.id === id);
      if (idx !== -1) inMemoryServices.splice(idx, 1);
      return res.json({ success: true, message: "Service deleted successfully!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
