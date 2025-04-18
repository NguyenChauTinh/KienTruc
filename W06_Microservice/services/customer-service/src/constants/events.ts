export const EXCHANGES = {
  CUSTOMER: 'customer.events',
  PRODUCT: 'product.events',
  ORDER: 'order.events'
};

export const QUEUES = {
  ORDER_CREATED: 'order.created.queue',
  CUSTOMER_CREATED: 'customer.created.queue',
  PRODUCT_UPDATED: 'product.updated.queue'
};

export const ROUTING_KEYS = {
  CUSTOMER_CREATED: 'customer.created',
  CUSTOMER_UPDATED: 'customer.updated',
  ORDER_CREATED: 'order.created',
  ORDER_UPDATED: 'order.updated',
  PRODUCT_UPDATED: 'product.updated'
};