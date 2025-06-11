import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server, io } from "./socket/socket.js";

dotenv.config(".env");

const { PORT, CLIENT_URL } = process.env;
const SERVER_PORT = PORT || 5001;

app.use(
  cors({
    origin: `${CLIENT_URL}`,
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

server.listen(5001, '0.0.0.0', () => {
  connectToMongoDB();
  console.log(`Server running on port ${5001}`);
});
