import MessageBroker from '../utils/messageBroker';
import { EXCHANGES, QUEUES, ROUTING_KEYS } from '../constants/events';

export async function setupMessageHandlers() {
  const messageBroker = MessageBroker.getInstance();
  
  // Đăng ký Queue và binding cho các sự kiện từ Order Service
  await messageBroker.bindQueue(
    QUEUES.ORDER_CREATED,
    EXCHANGES.ORDER,
    ROUTING_KEYS.ORDER_CREATED
  );
  
  // Lắng nghe sự kiện khi có đơn hàng mới được tạo
  await messageBroker.consume(QUEUES.ORDER_CREATED, async (message) => {
    console.log('Nhận sự kiện đơn hàng mới được tạo:', message);
    
    try {
      // Xử lý dữ liệu đơn hàng mới
      // Ví dụ: cập nhật thông tin khách hàng hoặc thực hiện một số logic nghiệp vụ
      const { customerId, orderId } = message;
      console.log(`Xử lý đơn hàng ${orderId} cho khách hàng ${customerId}`);
    } catch (error) {
      console.error('Lỗi khi xử lý sự kiện đơn hàng mới:', error);
    }
  });
}