import { Request, Response } from 'express';
import { CustomerModel } from '../models/customerModel';
import { getCustomerOrders } from '../service/connectServiceOrder';

// Lấy thông tin chi tiết khách hàng kèm đơn hàng
export const getCustomerWithOrders = async (req: Request, res: Response): Promise<void> => {
    try {
      const customerId = req.params.id;
      
      // Lấy thông tin khách hàng từ database
      const customer = await CustomerModel.findOne({ customerId });
      
      if (!customer) {
        res.status(404).json({
          errorCode: 404,
          errorMessage: "Không tìm thấy khách hàng",
          data: null,
        });
        return;
      }
      
      // Lấy thông tin đơn hàng của khách hàng từ Order Service
      const ordersResponse = await getCustomerOrders(customerId);
      const orders = ordersResponse.data;
      
      // Trả về thông tin khách hàng kèm đơn hàng
      res.json({
        errorCode: 200,
        errorMessage: "Thành công",
        data: {
          customer: customer,
          orders: orders
        },
      });
    } catch (error: any) {
      console.error('Error in getCustomerWithOrders:', error.message);
      res.status(500).json({
        errorCode: 500,
        errorMessage: error.message || "Lỗi server",
        data: null,
      });
    }
  };