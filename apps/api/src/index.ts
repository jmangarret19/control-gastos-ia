import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './infrastructure/routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'API is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
