import { Request, Response } from 'express';
import orderValidationSchema from './order.validation';
import { Product } from '../product/product.model';
import { Order } from './order.model';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = orderValidationSchema.parse(req.body);

    const product = await Product.findById(orderData.product);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
        success: false,
      });
    }

    if (product.quantity < orderData.quantity) {
      return res.status(400).json({
        message: 'Insufficient stock',
        success: false,
      });
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
    });
  }
};

export const OrderController = {
  createOrder,
};
