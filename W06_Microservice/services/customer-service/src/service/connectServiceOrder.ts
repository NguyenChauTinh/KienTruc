import axios from 'axios';
// URL của các service khác
const ORDER_SERVICE_URL = 'http://localhost:3003/api';
const PRODUCT_SERVICE_URL = 'http://localhost:3002/api';

// Service để lấy thông tin đơn hàng từ Order Service
export const getCustomerOrders = async (customerId: string) => {
    try {
      const response = await axios.get(`${ORDER_SERVICE_URL}/orders/customer/${customerId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching customer orders:', error.message);
      throw new Error('Không thể lấy danh sách đơn hàng');
    }
  };
  
  // Service để lấy thông tin sản phẩm từ Product Service
  export const getProductDetails = async (productId: string) => {
    try {
      const response = await axios.get(`${PRODUCT_SERVICE_URL}/products/${productId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching product details:', error.message);
      throw new Error('Không thể lấy thông tin sản phẩm');
    }
  };