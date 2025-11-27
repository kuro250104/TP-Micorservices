import { Router } from 'express';

const router = Router();

const orders = [];
let nextId = 1;

router.get('/', (req, res) => {
    console.log('[ORDER-SERVICE] GET /orders');
    res.json(orders);
});

router.get('/:id', (req, res) => {
    console.log('[ORDER-SERVICE] GET /orders/:id');
    const id = Number(req.params.id);
    const order = orders.find(o => o.id === id);

    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    return res.json(order);
});

router.post('/', (req, res) => {
    console.log('[ORDER-SERVICE] POST /orders', req.body);

    const { userId, restaurantId, items } = req.body;

    if (!userId || !restaurantId || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
            error: 'userId, restaurantId and items[] are required',
        });
    }

    const totalPrice = items.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
        0
    );

    const newOrder = {
        id: nextId++,
        userId,
        restaurantId,
        items,
        totalPrice,
        status: 'pending',
        createdAt: new Date().toISOString(),
    };

    orders.push(newOrder);
    return res.status(201).json(newOrder);
});

router.patch('/:id/status', (req, res) => {
    console.log('[ORDER-SERVICE] PATCH /orders/:id/status', req.body);

    const id = Number(req.params.id);
    const { status } = req.body;

    const validStatuses = ["pending", "accepted", "delivering", "delivered", "canceled"];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: `Invalid status.` });
    }

    const order = orders.find(o => o.id === id);
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;

    return res.json(order);
});

export default router;
