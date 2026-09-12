import mongoose from "mongoose";
import { Project } from "../models/Project.js";
import { initialProjects } from "../seed/data.js";
import { getDbStatus } from "../config/db.js";

let inMemoryProjects = [...initialProjects];

// Get All Projects
export const getProjects = async (req, res) => {
  try {
    const { category, featured } = req.query;
    if (getDbStatus()) {
      const query = {};
      if (category && category !== "All") query.category = category;
      if (featured === "true") query.featured = true;
      const projects = await Project.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: projects.length, data: projects });
    } else {
      let list = [...inMemoryProjects];
      if (category && category !== "All") {
        list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase());
      }
      if (featured === "true") {
        list = list.filter((p) => p.featured);
      }
      return res.json({ success: true, count: list.length, data: list });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Project
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDbStatus()) {
      const isObjectId = mongoose.Types.ObjectId.isValid(id);
      const conditions = [{ id }, { slug: id }];
      if (isObjectId) conditions.push({ _id: id });
      const project = await Project.findOne({ $or: conditions });
      if (!project) return res.status(404).json({ success: false, message: "Project not found" });
      return res.json({ success: true, data: project });
    } else {
      const project = inMemoryProjects.find((p) => p.id === id || p.slug === id);
      if (!project) return res.status(404).json({ success: false, message: "Project not found" });
      return res.json({ success: true, data: project });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create Project
export const createProject = async (req, res) => {
  try {
    const data = req.body;
    if (!data.title || !data.category) {
      return res.status(400).json({ success: false, message: "Title and Category are required." });
    }

    const newId = data.id || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now().toString().slice(-4);
    const slug = data.slug || newId;

    const newProject = {
      ...data,
      id: newId,
      slug,
      tags: Array.isArray(data.tags) ? data.tags : (data.tags ? data.tags.split(",").map(t => t.trim()) : []),
      deliverables: Array.isArray(data.deliverables) ? data.deliverables : (data.deliverables ? data.deliverables.split("\n").filter(Boolean) : []),
      tools: Array.isArray(data.tools) ? data.tools : (data.tools ? data.tools.split(",").map(t => t.trim()) : []),
      gallery: Array.isArray(data.gallery) ? data.gallery : (data.gallery ? [data.gallery] : []),
      metrics: Array.isArray(data.metrics) ? data.metrics : []
    };

    if (getDbStatus()) {
      const project = new Project(newProject);
      await project.save();
      return res.status(201).json({ success: true, message: "Project created successfully!", data: project });
    } else {
      inMemoryProjects.unshift(newProject);
      return res.status(201).json({ success: true, message: "Project created successfully (In-Memory)", data: newProject });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (getDbStatus()) {
      const isObjectId = mongoose.Types.ObjectId.isValid(id);
      const conditions = [{ id }, { slug: id }];
      if (isObjectId) conditions.push({ _id: id });
      const updated = await Project.findOneAndUpdate(
        { $or: conditions },
        data,
        { new: true }
      );
      if (!updated) return res.status(404).json({ success: false, message: "Project not found" });
      return res.json({ success: true, message: "Project updated successfully!", data: updated });
    } else {
      const idx = inMemoryProjects.findIndex((p) => p.id === id || p.slug === id);
      if (idx === -1) return res.status(404).json({ success: false, message: "Project not found" });
      inMemoryProjects[idx] = { ...inMemoryProjects[idx], ...data };
      return res.json({ success: true, message: "Project updated successfully!", data: inMemoryProjects[idx] });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDbStatus()) {
      const isObjectId = mongoose.Types.ObjectId.isValid(id);
      const conditions = [{ id }, { slug: id }];
      if (isObjectId) conditions.push({ _id: id });
      const deleted = await Project.findOneAndDelete({ $or: conditions });
      if (!deleted) return res.status(404).json({ success: false, message: "Project not found" });
      return res.json({ success: true, message: "Project deleted successfully!" });
    } else {
      const idx = inMemoryProjects.findIndex((p) => p.id === id || p.slug === id);
      if (idx === -1) return res.status(404).json({ success: false, message: "Project not found" });
      inMemoryProjects.splice(idx, 1);
      return res.json({ success: true, message: "Project deleted successfully!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
