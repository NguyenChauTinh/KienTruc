import { Request, Response } from "express";
import { OrderModel } from "../models/orderModel";

// Lấy tất cả đơn hàng
export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await OrderModel.find();
    res.json({
      errorCode: 200,
      errorMessage: "Thành công",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      errorCode: 500,
      errorMessage: "Lỗi server",
      data: null,
    });
  }
};

// Lấy đơn hàng theo ID
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await OrderModel.findOne({ orderId: req.params.id });
    if (!order) {
      res.status(404).json({
        errorCode: 404,
        errorMessage: "Không tìm thấy đơn hàng",
        data: null,
      });
      return;
    }
    
    res.json({
      errorCode: 200,
      errorMessage: "Thành công",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      errorCode: 500,
      errorMessage: "Lỗi server",
      data: null,
    });
  }
};

// Lấy đơn hàng theo khách hàng
export const getOrdersByCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const customerId = req.params.customerId;
    const orders = await OrderModel.find({ customerId });
    
    res.json({
      errorCode: 200,
      errorMessage: "Thành công",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      errorCode: 500,
      errorMessage: "Lỗi server",
      data: null,
    });
  }
};

// Tạo đơn hàng mới
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const newOrder = new OrderModel(req.body);
    const savedOrder = await newOrder.save();
    
    res.status(201).json({
      errorCode: 201,
      errorMessage: "Tạo đơn hàng thành công",
      data: savedOrder,
    });
  } catch (error: any) {
    // Xử lý lỗi validation
    if (error.name === "ValidationError") {
      res.status(400).json({
        errorCode: 400,
        errorMessage: error.message,
        data: null,
      });
      return;
    }
    
    res.status(500).json({
      errorCode: 500,
      errorMessage: "Lỗi server",
      data: null,
    });
  }
};