import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import productRoutes from './routes/productRoutes';

dotenv.config();
const app = express();

app.use(express.json());

// Health check endpoint
app.get("/ping", (req, res) => {
  res.json({
    errorCode: 200,
    errorMessage: "Pong",
    data: null,
  });
});

// Product routes
app.use('/api', productRoutes);

const PORT = process.env.PORT || 3002;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Product service running on port ${PORT}`));
});