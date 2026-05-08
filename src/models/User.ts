import { Users } from "@prisma/client";
import z from "zod";

//Validation schema
export const createUserSchema = z.object({
  email: z.string({error:"Email is required"}).email("Invalid email format"),
  username: z.string({error:"Username is required"}).min(2),
  password: z.string({error:"Password is required"}).min(6),
  pictureUrl: z.string().url().optional(),
  role: z.enum(["USER", "ADMIN", "ARTISAN"]).optional(),
});

export const updateUserSchema = createUserSchema.partial()

//DTO
export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
export type UserResponseDTO = Omit<Users, "password">

//Mapper
export const toUserResponse = (user: Users): UserResponseDTO =>{
  const {password, ...rest} = user;
  return rest
}