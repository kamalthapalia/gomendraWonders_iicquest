//configuration relaed to database

import mongoose from "mongoose";
import { redisClient } from "../index.js";

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await redisClient.connect();
        console.log("Database connection established");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
}