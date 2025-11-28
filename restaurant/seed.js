import dotenv from "dotenv";
dotenv.config();
import 'dotenv/config';
import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
    name: String,
    cuisine: String,
    rating: Number,
    city: String,
    menu: [
        {
            id: Number,
            name: String,
            price: Number
        }
    ]
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

const seedRestaurants = async () => {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("🔄 Clearing Restaurants collection...");
    await Restaurant.deleteMany({});

    console.log("MONGO_URI =", process.env.MONGO_URI); // debug rapide

    await mongoose.connect(process.env.MONGO_URI);

    console.log("🌱 Seeding restaurants...");
    await Restaurant.insertMany([
        {
            id: 1,
            name: "Burger Palace",
            cuisine: "Burgers",
            rating: 4.6,
            city: "Toulouse",
            menu: [
                { id: 1, name: "Cheeseburger", price: 9.5 },
                { id: 2, name: "Double Bacon Burger", price: 12 },
                { id: 3, name: "Fries", price: 3.5 }
            ]
        },
        {
            id: 2,
            name: "Sushi Bar",
            cuisine: "Japonais",
            rating: 4.8,
            city: "Paris",
            menu: [
                { id: 4, name: "California Roll", price: 10 },
                { id: 5, name: "Sashimi Saumon", price: 16 }
            ]
        }
    ]);

    console.log("✅ Restaurants seeded successfully");
    process.exit();
};

seedRestaurants().catch((err) => console.error(err));