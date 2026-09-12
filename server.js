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

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"],
  credentials: true
}));
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
      "/api/contact (POST/GET)",
      "/api/health"
    ]
  });
});

app.listen(PORT, () => {
  console.log(`✨ Shally Portfolio Server running on port ${PORT}`);
  console.log(`👉 API Health: http://localhost:${PORT}/api/health`);
});
