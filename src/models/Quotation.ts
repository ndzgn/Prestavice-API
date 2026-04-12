import z from "zod";
import { Quotation } from "@prisma/client";


export const createQuotationSchema = z.object({
  artisanId: z.string().uuid(),
  offerId: z.string().uuid(),
  description: z.string().max(2000),
  amount: z.number(),
})

export const updateQuotationSchema = createQuotationSchema.partial().extend({
  status : z.enum(["PENDING", "ACCEPTED", "REJECTED", "CANCELLED"]).optional()
})

export type CreateQuotationDTO = z.infer<typeof createQuotationSchema>
export type UpdateQuotationDTO = z.infer<typeof updateQuotationSchema>
