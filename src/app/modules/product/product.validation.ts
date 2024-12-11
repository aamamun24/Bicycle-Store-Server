import { z } from 'zod';

const productValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  brand: z.string().min(1, 'Brand is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  type: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
    errorMap: () => ({
      message: 'Type must be Mountain, Road, Hybrid, BMX, or Electric',
    }),
  }),
  description: z.string().min(1, 'Description is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  inStock: z.boolean().default(true),
});

export default productValidationSchema;
