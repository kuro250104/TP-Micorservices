import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json([
        { id: 1, name: 'Gaëtan', role: 'customer' },
        { id: 2, name: 'Arnaud', role: 'courier' },
    ]);
});

router.post('/', (req, res) => {
    const user = req.body;
    res.status(201).json({ message: 'User created (fake)', user });
});

export default router;
