import Z from 'zod';

const UpdateUserSchema = Z.object({
  fullname: Z.string().min(3).max(255).optional(),
  email: Z.string().email().optional(),
  password: Z.string().min(8).max(255).optional(),
});

export default UpdateUserSchema;
