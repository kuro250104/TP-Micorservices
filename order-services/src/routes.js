import { Router } from "express";
import Order from "../models/Order.js";

const router = Router();

// GET ALL ORDERS
router.get("/", async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
});

// GET ONE ORDER
router.get("/:id", async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ error: "Order not found" });

    res.json(order);
});

// CREATE ORDER
router.post("/", async (req, res) => {
    const { userId, restaurantId, items } = req.body;

    if (!userId || !restaurantId || !items?.length) {
        return res
            .status(400)
            .json({ error: "userId, restaurantId and items[] are required" });
    }

    const totalPrice = items.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
        0
    );

    const order = await Order.create({
        userId,
        restaurantId,
        items,
        totalPrice,
    });

    res.status(201).json(order);
});

// UPDATE STATUS
router.patch("/:id/status", async (req, res) => {
    const { status } = req.body;

    const validStatuses = [
        "pending",
        "accepted",
        "delivering",
        "delivered",
        "canceled",
    ];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
    );

    if (!order) return res.status(404).json({ error: "Order not found" });

    res.json(order);
});

export default router;