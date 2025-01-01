import { Product } from '../product/product.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrder = async (orderData: IOrder) => {
  const product = await Product.findById(orderData.product);

  if (!product) {
    return { message: 'Product not found', success: false };
  }

  if (product.quantity < orderData.quantity) {
    return { message: 'Insufficient stock', success: false };
  }

  const totalPrice = product.price * orderData.quantity;
  const order = new Order({ ...orderData, totalPrice });

  product.quantity -= orderData.quantity;
  product.inStock = product.quantity > 0;

  await product.save();
  await order.save();

  return order;
};

export const OrderService = {
  createOrder,
};
