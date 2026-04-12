import z from "zod";
import { Offers } from "@prisma/client";



export const createOfferSchema = z.object({
  userId: z.string().uuid(),
  town: z.string().max(100),
  district: z.string().max(100),
  phone: z.string().length(9),
  title: z.string().max(100),
  description: z.string().max(500),
  service: z.string().max(100),
})

export const updateOfferSchema = createOfferSchema.partial().extend({
  status: z.enum([
    "PENDING",
    "ACCEPTED",
    "INPROGRESS",
    "CANCELLED",
    "COMPLETED",
    "FAILED"
  ]).optional()
})

export type CreateOfferDTO = z.infer<typeof createOfferSchema>
export type UpdateOfferDTO = z.infer<typeof updateOfferSchema>
