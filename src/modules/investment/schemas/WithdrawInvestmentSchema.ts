import Z from 'zod';

const WithdrawInvestmentSchema = Z.object({
  value: Z.number(),
});

export default WithdrawInvestmentSchema;
