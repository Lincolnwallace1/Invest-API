import Z from 'zod';

const LoginSchema = Z.object({
  email: Z.string().email(),
  password: Z.string().min(6).max(255),
});

export default LoginSchema;
