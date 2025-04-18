import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [1, 'Tên sản phẩm không được để trống'],
        maxlength: [100, 'Tên sản phẩm không được vượt quá 100 ký tự']
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Giá sản phẩm phải lớn hơn hoặc bằng 0']
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: [1, 'Mô tả sản phẩm không được để trống'],
        maxlength: [500, 'Mô tả sản phẩm không được vượt quá 500 ký tự']
    },
    stock: {
        type: Number,
        required: true,
        min: [0, 'Số lượng sản phẩm phải lớn hơn hoặc bằng 0']
    }
}, {
  timestamps: true
});

export default mongoose.model<IProduct>('Product', ProductSchema);