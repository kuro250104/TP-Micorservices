import express from 'express';
import cors from "cors";
import { setupLogging } from './logging.js';
import { setupProxies } from './proxy.js';

const app = express();
const PORT = process.env.PORT || 5555;

app.use(cors());
// app.use(express.json());

setupLogging(app);
setupProxies(app);

app.get('/', (req, res) => {
    res.json({ gateway: 'OK', message: 'UberEats-like API Gateway running' });
});

app.listen(PORT, () => {
    console.log(`[GATEWAY] Server is running on port ${PORT}`);
});
