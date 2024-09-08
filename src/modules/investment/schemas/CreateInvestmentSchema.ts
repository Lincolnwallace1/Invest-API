import Z from 'zod';

const CreateInvestmentSchema = Z.object({
  name: Z.string().min(3).max(255),
  initialValue: Z.number(),
  initialDate: Z.string(),
});

export default CreateInvestmentSchema;
