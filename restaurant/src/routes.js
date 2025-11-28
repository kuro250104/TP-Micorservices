import { Router } from 'express';

const router = Router();


router.get("/", async (req, res) => {
    try {
        const restaurants = await Restaurant.find().lean();
        res.json(restaurants);
    } catch (err) {
        console.error("[RESTAURANT-SERVICE] GET /restaurants error:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /restaurants/:id (id numérique, ex: 1)
router.get("/:id", async (req, res) => {
    try {
        const restaurantId = Number(req.params.id);

        const restaurant = await Restaurant.findOne({ id: restaurantId }).lean();
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        res.json(restaurant);
    } catch (err) {
        console.error("[RESTAURANT-SERVICE] GET /restaurants/:id error:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/:id/menu', (req, res) => {
    const id = Number(req.params.id);
    const restaurant = restaurants.find(r => r.id === id);

    if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.json(restaurant.menu);
});

router.post('/', (req, res) => {
    const { name, cuisine, city } = req.body;

    if (!name || !cuisine) {
        return res.status(400).json({ error: 'name and cuisine are required' });
    }

    const newRestaurant = {
        id: restaurants.length + 1,
        name,
        cuisine,
        city: city || "Toulouse",
        rating: null,
        menu: []
    };

    restaurants.push(newRestaurant);
    res.status(201).json(newRestaurant);
});

export default router;
