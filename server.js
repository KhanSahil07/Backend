import express from "express";
import "dotenv/config";

import pkg from "@prisma/client";
const { PrismaClient } = pkg;

import AutoController from "./DB/controller/AutoController.js";
import ApiRoutes from "./routes/api.js";

const prisma = new PrismaClient();
const app = express();

const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Health check / root route
app.get("/", (req, res) => {
  return res.json({ message: "Hey babes, it's working 🚀" });
});

// API routes
app.use("/api", ApiRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
