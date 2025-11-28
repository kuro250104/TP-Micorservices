import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import orderRoutes from "./routes.js";

const app = express();
const PORT = 5002;

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("[ORDER-SERVICE] Connected to MongoDB"))
    .catch((err) => console.error("Mongo error:", err));

app.use("/orders", orderRoutes);

app.get("/health", (req, res) => {
    res.json({ status: "ok", service: "orders" });
});

app.listen(PORT, () => {
    console.log(`[ORDER-SERVICE] Running on port ${PORT}`);
});