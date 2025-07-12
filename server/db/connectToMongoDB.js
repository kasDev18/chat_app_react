import mongoose from "mongoose";
import { databaseConfig, isDevelopment } from "../config/env.js";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(databaseConfig.mongodbUri);
        if (isDevelopment()) {
            console.log("🟢 Connected to MongoDB");
        }
    } catch (error) {
        console.error("🟢 Error connecting to MongoDB:", error);
    }
};

export default connectToMongoDB;