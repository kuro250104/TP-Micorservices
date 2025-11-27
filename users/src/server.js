import express from 'express';
import cors from 'cors';
import { setupLogging } from './logging.js';
import userRoutes from './routes.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
setupLogging(app);

app.use('/', userRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'users' });
});

app.listen(PORT, () => {
    console.log(`[USERS-SERVICE] Running on port ${PORT}`);
});
