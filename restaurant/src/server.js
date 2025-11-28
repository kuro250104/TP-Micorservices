import express from "express";
import cors from "cors";
import { setupLogging } from "./logging.js";
import restaurantRoutes from "./routes.js";
import { connectDB } from "./db.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
setupLogging(app);

app.use("/restaurants", restaurantRoutes);

app.get("/health", (req, res) => {
    res.json({ status: "ok", service: "restaurants" });
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`[RESTAURANT-SERVICE] Running on port ${PORT}`);
    });
});