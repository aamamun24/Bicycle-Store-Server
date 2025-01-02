import { Request, Response } from 'express';
import orderValidationSchema from './order.validation';
import { Product } from '../product/product.model';
import { Order } from './order.model';
import { OrderService } from './order.service';

// Create order
const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderData = orderValidationSchema.parse(req.body);

    const product = await Product.findById(orderData.product);

    if (!product) {
      res.status(404).json({
        message: 'Product not found',
        success: false,
      });
      return;
    }

    if (product.quantity < orderData.quantity) {
      res.status(400).json({
        message: 'Insufficient stock',
        success: false,
      });
      return;
    }

    const totalPrice = product.price * orderData.quantity;
    const order = new Order({ ...orderData, totalPrice });

    product.quantity -= orderData.quantity;
    product.inStock = product.quantity > 0;

    await product.save();
    await order.save();

    res.status(200).json({
      message: 'Order created successfully',
      success: true,
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'Something went wrong!',
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};

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
      error: error,
      stack: error.stack,
    });
  }
};

export const OrderController = {
  createOrder,
  calculateTotalRevenue,
};
