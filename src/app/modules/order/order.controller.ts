import { Request, Response } from 'express';
import orderValidationSchema from './order.validation';
import { OrderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = orderValidationSchema.parse(req.body);
    const result = OrderService.createOrder(orderData);

    res.status(200).json({
      message: 'Order created successfully',
      success: true,
      data: result,
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
