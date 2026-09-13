import express from "express";
import multer from "multer";
import { 
  getProjects, getProjectById, createProject, updateProject, deleteProject 
} from "../controllers/projectController.js";
import { 
  getServices, createService, updateService, deleteService 
} from "../controllers/serviceController.js";
import { 
  getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial 
} from "../controllers/testimonialController.js";
import { 
  submitContact, getContactSubmissions, updateContactStatus, deleteContact 
} from "../controllers/contactController.js";
import { getSettings, updateSettings } from "../controllers/settingsController.js";
import { getDashboardStats } from "../controllers/analyticsController.js";
import { uploadFile, getMediaById } from "../controllers/uploadController.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ 
  storage, 
  limits: { fileSize: 50 * 1024 * 1024 } // 50 MB limit for videos and images
});

// Media Stream & Download
router.get("/media/:id", getMediaById);

// Projects
router.get("/projects", getProjects);
router.get("/projects/:id", getProjectById);
router.post("/projects", createProject);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);

// Services
router.get("/services", getServices);
router.post("/services", createService);
router.put("/services/:id", updateService);
router.delete("/services/:id", deleteService);

// Testimonials
router.get("/testimonials", getTestimonials);
router.post("/testimonials", createTestimonial);
router.put("/testimonials/:id", updateTestimonial);
router.delete("/testimonials/:id", deleteTestimonial);

// Contact Inquiries
router.post("/contact", submitContact);
router.get("/contact", getContactSubmissions);
router.patch("/contact/:id/status", updateContactStatus);
router.delete("/contact/:id", deleteContact);

// Settings
router.get("/settings", getSettings);
router.put("/settings", updateSettings);

// Dashboard Analytics
router.get("/analytics/stats", getDashboardStats);

// Cloudinary File Upload
router.post("/upload", upload.single("file"), uploadFile);

// Health Check
router.get("/health", (req, res) => {
  res.json({
    status: "online",
    timestamp: new Date().toISOString(),
    creator: "Shally Creative Portfolio API",
    version: "2.0.0"
  });
});

export default router;
