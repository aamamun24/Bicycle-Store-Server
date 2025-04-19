import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    image: z.string().min(1, 'Image is required'),
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
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    brand: z.string().optional(),
    price: z.number().optional(),
    type: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric']).optional(),
    description: z.string().optional(),
    quantity: z.number().optional(),
    inStock: z.boolean().default(true).optional(),
  }),
});

export const ProductValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
