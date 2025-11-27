import express from 'express';
import cors from 'cors';
import { setupLogging } from './logging.js';
import orderRoutes from './routes.js';

const app = express();
const PORT = 5002;

app.use(cors());
app.use(express.json());
setupLogging(app);

app.use('/', orderRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'orders' });
});

app.listen(PORT, () => {
    console.log(`[ORDER-SERVICES] Running on port ${PORT}`);
});