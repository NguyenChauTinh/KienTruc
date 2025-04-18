import express from "express";
import * as customerController from "../controllers/customerController";
import * as customerDetailController from "../controllers/customerDetailController";

const router = express.Router();

// Routes cho thông tin khách hàng cơ bản
router.get("/customers", customerController.getAllCustomers);
router.get("/customers/:id", customerController.getCustomerById);
router.post("/customers", customerController.createCustomer);
router.put("/customers/:id", customerController.updateCustomer);
router.delete("/customers/:id", customerController.deleteCustomer);

// Routes cho thông tin chi tiết khách hàng
router.get("/customers/:id/with-orders", customerDetailController.getCustomerWithOrders);

export default router;