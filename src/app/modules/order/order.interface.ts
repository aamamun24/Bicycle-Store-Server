import { ObjectId } from 'mongoose';

export interface IOrder {
  product: ObjectId;
  transactionId: string;
  quantity: number;
  totalPrice: number;
  email: string;
  customerName: string;
  address: string;
  contactNumber: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}
