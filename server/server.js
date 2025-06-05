import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server, io } from "./socket/socket.js";
// import protectRoute from "./middleware/protectRoute.js";

const PORT = process.env.PORT || 5000;

dotenv.config(".env");

app.use(
  cors({
    origin: "http://54.66.124.33:3000",
    credentials: true,
    methods: ["GET", "POST"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/", userRoutes);

// app.get("/", (req, res) => {
//     res.send("Hello from the server!");
// });

server.listen(PORT, '0.0.0.0', () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
