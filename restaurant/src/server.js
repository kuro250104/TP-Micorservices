import express from 'express';
import cors from 'cors';
import { setupLogging } from './logging.js';
import restaurantRoutes from './routes.js';

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());
setupLogging(app);

app.use('/', restaurantRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'restaurant' });
});

app.listen(PORT, () => {
    console.log(`[RESTAURANT-SERVICE] Running on port ${PORT}`);
});
