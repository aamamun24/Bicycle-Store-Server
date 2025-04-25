import status from 'http-status';
import AppError from '../../errors/AppError';
import { Order } from './order.model';

const getAllOrders = async () => {
  const orders = await Order.find().populate('product');
  return orders;
};

const updateOrderStatus = async (orderId: string, status: string) => {
  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true, runValidators: true },
  );

  return order;
};

const deleteOrder = async (orderId: string) => {
  const order = await Order.findByIdAndDelete(orderId);
  if (!order) {
    throw new AppError(status.NOT_FOUND, 'Order not found');
  }
};

const getUserOrders = async (userId: string) => {
  const orders = await Order.find({ customerId: userId }).populate('product');
  return orders;
};

const calculateRevenue = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);

  return result[0]?.totalRevenue || 0;
};

export const OrderService = {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getUserOrders,
  calculateRevenue,
};
