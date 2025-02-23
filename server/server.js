// const express = require('express');

import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const PORT = process.env.PORT || 5000;
const app = express();

dotenv.config();

app.use(express.json())

app.use("/auth", authRoutes);

// app.get("/", (req, res) => {
//     res.send("Hello from the server!");
// });

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`)
});