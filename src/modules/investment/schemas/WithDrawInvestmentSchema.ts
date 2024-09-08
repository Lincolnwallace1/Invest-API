import Z from 'zod';

const WithDrawInvestmentSchema = Z.object({
  value: Z.number(),
});

export default WithDrawInvestmentSchema;
