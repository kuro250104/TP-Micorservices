import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        userId: { type: Number, required: true },
        restaurantId: { type: Number, required: true },
        items: [
            {
                name: String,
                price: Number,
                quantity: Number,
            },
        ],
        totalPrice: Number,
        status: {
            type: String,
            enum: ["pending", "accepted", "delivering", "delivered", "canceled"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);