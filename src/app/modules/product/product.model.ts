import { model, Schema } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price must be required'],
    },
    type: {
      type: String,
      enum: {
        values: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
        message: '{VALUE} is not valid.',
      },
    },
    description: {
      type: String,
      required: [true, 'Give a short description'],
      maxlength: [200, 'Description too long, needed within 200 characters'],
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
  },
  { timestamps: true },
);

export const Product = model<IProduct>('Product', productSchema);
