import { z } from 'zod';

const createOrderValidationSchema = z.object({
  email: z.string().email('Valid email address required'),
  customerName: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  contactNumber: z.string().min(1, 'Contact number is required'),
  transactionId: z.string().min(1, 'Transaction ID is required').optional(),
  status: z
    .enum(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'])
    .optional(),
  product: z.string().min(1, 'Product ID is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  totalPrice: z.number().min(0, 'Total price must be a positive number'),
});

const updateOrderStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(
      ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      {
        required_error: 'Status is required',
      },
    ),
  }),
});

export const OrderValidation = {
  createOrderValidationSchema,
  updateOrderStatusValidationSchema,
};
