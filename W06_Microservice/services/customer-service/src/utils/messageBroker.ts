import amqp, { Channel, Connection } from 'amqplib';

class MessageBroker {
  private connection: Connection | null = null;
  private channel: Channel | null = null;
  private static instance: MessageBroker;

  private constructor() {}

  // Singleton pattern
  public static getInstance(): MessageBroker {
    if (!MessageBroker.instance) {
      MessageBroker.instance = new MessageBroker();
    }
    return MessageBroker.instance;
  }

  // Kết nối đến RabbitMQ server
  public async connect(): Promise<void> {
    try {
      const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
      this.connection = await amqp.connect(rabbitmqUrl);
      this.channel = await this.connection.createChannel();
      console.log('Connected to RabbitMQ');
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error);
      throw error;
    }
  }

  // Đăng ký consumer để lắng nghe message từ queue
  public async consume(
    queue: string,
    callback: (message: any) => void
  ): Promise<void> {
    if (!this.channel) {
      throw new Error('Channel is not available');
    }

    // Đảm bảo queue tồn tại
    await this.channel.assertQueue(queue, { durable: true });

    // Consume messages
    this.channel.consume(queue, (message) => {
      if (message) {
        const content = JSON.parse(message.content.toString());
        callback(content);
        this.channel!.ack(message);
      }
    });

    console.log(`Listening for messages on queue: ${queue}`);
  }

  // Publish một message đến exchange và routing key cụ thể
  public async publishToExchange(
    exchange: string,
    routingKey: string,
    message: any
  ): Promise<void> {
    if (!this.channel) {
      throw new Error('Channel is not available');
    }

    // Đảm bảo exchange tồn tại
    await this.channel.assertExchange(exchange, 'topic', { durable: true });

    // Publish message
    this.channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    );

    console.log(`Message published to exchange: ${exchange}, routing key: ${routingKey}`);
  }

  // Publish một message trực tiếp vào queue
  public async publishToQueue(queue: string, message: any): Promise<void> {
    if (!this.channel) {
      throw new Error('Channel is not available');
    }

    // Đảm bảo queue tồn tại
    await this.channel.assertQueue(queue, { durable: true });

    // Send message to queue
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });

    console.log(`Message sent to queue: ${queue}`);
  }

  // Đăng ký một binding giữa exchange và queue
  public async bindQueue(
    queue: string,
    exchange: string,
    pattern: string
  ): Promise<void> {
    if (!this.channel) {
      throw new Error('Channel is not available');
    }

    // Đảm bảo queue và exchange tồn tại
    await this.channel.assertQueue(queue, { durable: true });
    await this.channel.assertExchange(exchange, 'topic', { durable: true });
    
    // Bind queue to exchange với pattern
    await this.channel.bindQueue(queue, exchange, pattern);
    
    console.log(`Queue ${queue} bound to exchange ${exchange} with pattern ${pattern}`);
  }

  // Đóng kết nối
  public async close(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
    console.log('Disconnected from RabbitMQ');
  }
}

export default MessageBroker;