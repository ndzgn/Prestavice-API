import z from "zod";

export const createReviewSchema = z.object({
  userId: z.string().uuid(),
  artisanId: z.string().uuid(),
  offerId: z.string().uuid(),
  content: z.string().max(100),
  mark: z.number().min(1).max(5),
});

export const updateReviewSchema = createReviewSchema.partial();
export type CreateReviewDTO = z.infer<typeof createReviewSchema>;
export type UpdateReviewDTO = z.infer<typeof updateReviewSchema>;