import Z from 'zod';

const CreateUserSchema = Z.object({
  fullname: Z.string().min(3).max(255),
  email: Z.string().email(),
  password: Z.string().min(6).max(255),
});

export default CreateUserSchema;
