import z from "zod";
import { Tools } from "@prisma/client";

export const createToolSchema = z.object({
  name: z.string().max(100),
  quantity: z.number().optional(),
  price: z.number().optional(),
  total: z.number().optional(),
  quotationId: z.string().uuid(),
});

export const updateToolSchema = createToolSchema.partial();
export type CreateToolDTO = z.infer<typeof createToolSchema>;
export type UpdateToolDTO = z.infer<typeof updateToolSchema>;
