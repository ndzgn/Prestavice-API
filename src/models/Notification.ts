import z from "zod";

export const createNotificationSchema = z.object({
  userId: z.string().uuid(),
  content: z.string().max(255),
  resourceLink: z.string().url(),
  type: z.enum(["INAPP", "EMAIL", "WHATSAPP", "SMS"]),
});

export const updateNotificationSchema = createNotificationSchema.partial();

export type CreateNotificationDTO = z.infer<typeof createNotificationSchema>;
export type UpdateNotificationDTO = z.infer<typeof updateNotificationSchema>;