import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z.string({
    required_error: 'First name is required',
    invalid_type_error: 'Invalid data type. Please enter a string',
  }),
  lastName: z.string({
    required_error: 'Last name is required',
    invalid_type_error: 'Invalid data type. Please enter a string',
  }),
});

const addressValidationSchema = z.object({
  street: z.string({
    required_error: 'Street is required',
    invalid_type_error: 'Invalid data type. Please enter a string.',
  }),
  city: z.string({
    required_error: 'City is required',
    invalid_type_error: 'Invalid data type. Please enter a string.',
  }),
  country: z.string({
    required_error: 'Country is required',
    invalid_type_error: 'Invalid data type. Please enter a string.',
  }),
});

const orderValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const userValidationSchema = z.object({
  userId: z.number({
    required_error: 'User id is required',
    invalid_type_error: 'Invalid data type. Please enter a number.',
  }),
  username: z.string({
    required_error: 'Username is required',
    invalid_type_error: 'Invalid data type. Please enter a string.',
  }),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Invalid data type. Please enter a string.',
  }),
  fullName: fullNameValidationSchema,
  age: z.number({
    required_error: 'Age is required',
    invalid_type_error: 'Invalid data type. Please enter a number.',
  }),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email. Please enter a valid email'),
  isActive: z.boolean().default(true),
  hobbies: z.array(
    z.string({
      invalid_type_error: 'Invalid data type. Please enter a string',
    }),
  ),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema).optional(),
});

export const userUpdateValidationSchema = userValidationSchema.partial();

export default userValidationSchema;
