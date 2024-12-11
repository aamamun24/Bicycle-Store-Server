import { model, Schema } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  brand: {
    type: String,
    required: [true, 'Brand name is required'],
  },
  price: {
    type: String,
    required: [true, 'price must be required'],
  },
  type: {
    type: String,
    enum: {
      values: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
      message: '*{VALUE}* is not valid.',
    },
  },
  description: {
    type: String,
    required: [true, 'Give a short description'],
    maxlength: [500, 'Description too long, needed within 500 characters'],
  },
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export const Product = model('Product', productSchema);
