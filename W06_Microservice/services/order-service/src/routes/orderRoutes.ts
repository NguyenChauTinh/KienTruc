import express from "express";
import * as orderController from "../controllers/orderController";

const router = express.Router();

// Định nghĩa các routes cho đơn hàng
router.get("/orders", orderController.getAllOrders);
router.get("/orders/:id", orderController.getOrderById);
router.get("/orders/customer/:customerId", orderController.getOrdersByCustomer);
router.post("/orders", orderController.createOrder);

export default router;