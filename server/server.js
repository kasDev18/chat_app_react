import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server, io } from "./socket/socket.js";
import './utils/redisClient.js'; // Ensure Redis client connects on server start

// Import environment configuration
import { serverConfig, isDevelopment } from "./config/env.js";

// Configure CORS
app.use(
  cors({
    origin: serverConfig.corsOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(serverConfig.port, '0.0.0.0', () => {
  connectToMongoDB();
  console.log(`🚀 Server running on port ${serverConfig.port}`);
  
  if (isDevelopment()) {
    console.log(`📱 Client URL: ${serverConfig.clientUrl}`);
    console.log(`🌍 Environment: ${serverConfig.nodeEnv}`);
  }
});
