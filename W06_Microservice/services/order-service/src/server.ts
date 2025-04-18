import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import orderRoutes from './routes/orderRoutes';

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

// Order routes
app.use('/api', orderRoutes);

const PORT = process.env.PORT || 3003;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Order service đang chạy tại cổng ${PORT}`));
});