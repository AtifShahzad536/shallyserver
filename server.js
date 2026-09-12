import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import apiRoutes from "./routes/apiRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB asynchronously
connectDB();

// Dynamic Permissive CORS Middleware (Allows Vercel domains, custom domains & local development)
const corsOptions = {
  origin: (origin, callback) => {
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Large Payload Body Parser limits (Supports large WebP images & JSON configurations)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes
app.use("/api", apiRoutes);

// Root greeting
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Shally's Creative Portfolio API ✨",
    endpoints: [
      "/api/projects",
      "/api/projects/:id",
      "/api/services",
      "/api/testimonials",
      "/api/settings",
      "/api/contact (POST/GET)",
      "/api/health"
    ]
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Server Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error."
  });
});

if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`✨ Shally Portfolio Server running on port ${PORT}`);
    console.log(`👉 API Health: http://localhost:${PORT}/api/health`);
  });
}

export default app;
