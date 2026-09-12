import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import apiRoutes from "./routes/apiRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Dynamic Permissive CORS Middleware (Allows Vercel domains, custom domains & local development)
const corsOptions = {
  origin: (origin, callback) => {
    // Allow all origins (browsers, mobile, serverless, localhost, vercel.app)
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

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

if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`✨ Shally Portfolio Server running on port ${PORT}`);
    console.log(`👉 API Health: http://localhost:${PORT}/api/health`);
  });
}

export default app;
