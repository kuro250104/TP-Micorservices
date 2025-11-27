import { Router } from 'express';

const router = Router();

const restaurants = [
    {
        id: 1,
        name: "Burger Palace",
        cuisine: "Burgers",
        rating: 4.6,
        city: "Toulouse",
        menu: [
            { id: 1, name: "Cheeseburger", price: 9.5 },
            { id: 2, name: "Double Bacon Burger", price: 12.0 },
            { id: 3, name: "Fries", price: 3.5 }
        ]
    },
    {
        id: 2,
        name: "Sushi Sakura",
        cuisine: "Japonaise",
        rating: 4.8,
        city: "Toulouse",
        menu: [
            { id: 1, name: "Sushi mix 12p", price: 14.0 },
            { id: 2, name: "California saumon avocat", price: 11.5 }
        ]
    }
];

router.get('/', (req, res) => {
    const list = restaurants.map(({ menu, ...rest }) => rest);
    res.json(list);
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const restaurant = restaurants.find(r => r.id === id);

    if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.json(restaurant);
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
