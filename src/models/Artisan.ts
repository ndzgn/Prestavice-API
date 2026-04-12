import z from "zod";


export const createArtisanSchema = z.object({
  userId: z.string().uuid(),
  name: z.string().max(100),
  email: z.string().email().max(100),
  phone: z.string().length(9),
  town: z.string().max(50),
  district: z.string().max(50),
  service: z.string().max(100),
  pictureUrl: z.string().url().optional(),
});

export const updateArtisanSchema = createArtisanSchema.partial();

//DTO
export type CreateArtisanDTO = z.infer<typeof createArtisanSchema>;
export type UpdateArtisanDTO = z.infer<typeof updateArtisanSchema>;


