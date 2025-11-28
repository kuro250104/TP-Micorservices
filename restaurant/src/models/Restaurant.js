// src/models/Restaurant.js
import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
    id: Number,           // pour garder tes ids numériques
    name: String,
    price: Number,
});

const RestaurantSchema = new mongoose.Schema({
    id: { type: Number, unique: true }, // id métier (1, 2, 3...)
    name: String,
    cuisine: String,
    rating: Number,
    city: String,
    menu: [MenuItemSchema],
});

export const Restaurant = mongoose.model("Restaurant", RestaurantSchema);