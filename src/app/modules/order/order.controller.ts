import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import SSLCommerz from 'sslcommerz-lts';
import { Product } from '../product/product.model';
import config from '../../config';
import { OrderService } from './order.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import status from 'http-status';
import { OrderValidation } from './order.validation';
import { Order } from './order.model';

const store_id = config.sslcz_store_id;
const store_passwd = config.sslcz_store_passwd;
const is_live = false;

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Validate order data
    const orderData = OrderValidation.createOrderValidationSchema.parse(
      req.body,
    );

    // 2. Find product
    const product = await Product.findById(orderData.product);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    // 3. Check product quantity
    if (product.quantity < orderData.quantity) {
      res.status(400).json({ success: false, message: 'Insufficient stock' });
      return;
    }

    // 4. Calculate total price
    const totalPrice = product.price * orderData.quantity;

    // 5. Generate transaction ID
    const transactionId = uuidv4();

    // 6. Initialize payment
    const sslcz = new SSLCommerz(
      store_id as string,
      store_passwd as string,
      is_live,
    );
    const paymentData = {
      total_amount: totalPrice,
      currency: 'BDT',
      tran_id: transactionId,
      success_url: `${config.sslcz_success_url}`,
      fail_url: `${config.sslcz_fail_url}`,
      cancel_url: `${config.sslcz_cancel_url}`,
      ipn_url: `${config.sslcz_ipn_url}`,
      shipping_method: 'Courier',
      product_name: product.name,
      product_category: 'Bicycle',
      product_profile: 'general',
      cus_name: orderData.customerName,
      cus_email: orderData.email,
      cus_add1: orderData.address,
      cus_phone: orderData.contactNumber,
      ship_name: orderData.customerName,
      ship_add1: orderData.address,
      ship_city: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    };

    const apiResponse = await sslcz.init(paymentData);

    if (!apiResponse || !apiResponse.GatewayPageURL) {
      res
        .status(500)
        .json({ success: false, message: 'Failed to initiate payment' });
      return;
    }

    // 7. Save Order to DB
    const newOrder = new Order({
      ...orderData,
      transactionId,
      totalPrice,
      status: 'Pending',
    });
    await newOrder.save();

    // 8. Decrease product quantity
    product.quantity -= orderData.quantity;
    product.inStock = product.quantity > 0;
    await product.save();

    // 9. Respond with payment gateway URL
    res.status(200).json({
      success: true,
      message: 'Redirect to payment gateway',
      PaymentGatewayPageURL: apiResponse.GatewayPageURL,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error,
    });
  }
};

const getAllOrders = catchAsync(async (req, res) => {
  const orders = await OrderService.getAllOrders();
  sendResponse(res, {
    success: true,
    message: 'Orders retrieved successfully',
    statusCode: status.OK,
    data: orders,
  });
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const updatedOrder = await OrderService.updateOrderStatus(orderId, status);

  sendResponse(res, {
    success: true,
    message: 'Order status updated successfully',
    statusCode: status.OK,
    data: updatedOrder,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  await OrderService.deleteOrder(orderId);
  sendResponse(res, {
    success: true,
    message: 'Order deleted successfully',
    statusCode: status.OK,
    data: null,
  });
});

const getUserOrders = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const orders = await OrderService.getUserOrders(userId);
  sendResponse(res, {
    success: true,
    message: 'User orders retrieved successfully',
    statusCode: status.OK,
    data: orders,
  });
});

// Calculate Revenue
const calculateTotalRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await OrderService.calculateRevenue();

    res.status(200).json({
      message: 'Revenue calculated successfully',
      success: true,
      data: { totalRevenue },
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to calculate revenue',
      success: false,
      error,
      stack: error.stack,
    });
  }
};

export const OrderController = {
  createOrder,
  calculateTotalRevenue,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getUserOrders,
};
