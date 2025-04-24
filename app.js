import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
// const express = require("express");

const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
