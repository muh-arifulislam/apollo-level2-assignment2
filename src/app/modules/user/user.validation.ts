import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z.string({ required_error: 'First name is required' }),
  lastName: z.string({ required_error: 'Last name is required' }),
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
  password: z
    .string({ required_error: 'Password is required' })
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least eight characters, one number, one capital letter and one special characters',
    ),
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

export default userValidationSchema;
