import z from "zod";

export const createTransactionSchema = z.object({
  userId: z.string().uuid(),
  amount: z.number(),
  description: z.string().max(255),
  type: z.enum(["PAYMENT", "REFUND"]),
  status: z.enum(["PENDING", "PROCESSING", "COMPLETED", "FAILED"]),
});

export const updateTransactionSchema = createTransactionSchema.partial();
export type CreateTransactionDTO = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionDTO = z.infer<typeof updateTransactionSchema>;