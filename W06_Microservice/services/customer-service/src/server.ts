import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import customerRoutes from './routes/customerRoutes';
import MessageBroker from './utils/messageBroker';
import { setupMessageHandlers } from './events/messageHandlers';

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

// Customer routes
app.use('/api', customerRoutes);

const PORT = process.env.PORT || 3001;

// Kết nối đến MongoDB và RabbitMQ, sau đó khởi động server
async function startServer() {
  try {
    // Kết nối đến MongoDB
    await connectDB();
    
    // Kết nối đến RabbitMQ
    const messageBroker = MessageBroker.getInstance();
    await messageBroker.connect();
    
    // Setup message handlers
    await setupMessageHandlers();
    
    // Khởi động server
    app.listen(PORT, () => {
      console.log(`Customer service đang chạy tại cổng ${PORT}`);
    });
  } catch (error) {
    console.error('Không thể khởi động server:', error);
    process.exit(1);
  }
}

startServer();