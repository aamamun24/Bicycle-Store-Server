import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: 'Name must be a string' }),
    email: z.string().email({ message: 'Email must be a email format' }),
    password: z
      .string()
      .min(6, { message: 'Password must be as least 6 characters' }),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
};
