import Z from 'zod';

const ListInvesmentSchema = Z.object({
  offset: Z.string()
    .optional()
    .default('0')
    .transform((val) => Number(val)),
  limit: Z.string()
    .optional()
    .default('50')
    .transform((val) => Number(val)),
  status: Z.string().optional(),
});

export default ListInvesmentSchema;
