import { Schema, model, Document } from "mongoose";

interface ICustomer extends Document {
  customerId: string;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

const customerSchema = new Schema(
  {
    customerId: { type: String },
    firstName: {
      type: String,
      required: [true, "Tên không được để trống"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Họ không được để trống"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Số điện thoại không được để trống"],
      trim: true,
    },
  },
  { timestamps: true }
);

customerSchema.pre<ICustomer>("save", function (next) {
  if (this.isNew || this.customerId === undefined) {
    this.customerId = this._id + "";
  }
  next();
});

const CustomerModel = model<ICustomer>("Customer", customerSchema);

export { ICustomer, CustomerModel };