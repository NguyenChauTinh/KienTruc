import { Schema, model, Document } from "mongoose";


// Interface for order items
interface IOrderItem {
  productId: string;
}

// Order interface
interface IOrder extends Document {
  orderId: string;
  customerId: string;
  items: IOrderItem[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Order schema definition
const orderSchema = new Schema(
  {
    orderId: { type: String },
    customerId: { 
      type: String, 
      required: [true, "ID khách hàng không được để trống"] 
    },
    items: [
      {
        productId: { 
          type: String, 
          required: [true, "ID sản phẩm không được để trống"] 
        }
      }
    ],
    totalAmount: { 
      type: Number, 
      required: [true, "Tổng giá trị không được để trống"],
      min: [0, "Tổng giá trị không được âm"] 
    },
  },
  { timestamps: true }
);

// Auto-generate orderId on save
orderSchema.pre<IOrder>("save", function (next) {
  if (this.isNew || this.orderId === undefined) {
    this.orderId = this._id + "";
  }
  next();
});

const OrderModel = model<IOrder>("Order", orderSchema);

export { IOrder, OrderModel, IOrderItem };
export default OrderModel;