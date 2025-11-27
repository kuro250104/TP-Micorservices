import express from 'express';
import { setupLogging } from './logging.js';
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

setupLogging(app);


app.get('/', (req, res) => {
    res.send('/ of user-service');
});

app.listen(PORT, () => {
    console.log(`Public API server is running on port ${PORT}`);
    console.log(`Server is running on port ${PORT}`);
});