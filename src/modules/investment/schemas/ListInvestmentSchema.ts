import Z from 'zod';

const ListInvesmentSchema = Z.object({
  offset: Z.number().optional().default(0),
  limit: Z.number().optional().default(50),
  status: Z.string().optional(),
});

export default ListInvesmentSchema;
