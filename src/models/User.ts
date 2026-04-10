import z from "zod";

export interface IUser {
  id: number,
  lastname: string,
  firstname : string,
  email: string,
  phone_number: string,
  role: string,
  town: string,
  district: string,
  createdAt: Date,
  updatedAt: Date
}


export const UserSchema = z.object({
  lastname : z.string({error: "The lastname is required"}
  ).min(3, "At least 3 characters").max(50, "Max 50 characters"),

  firstname: z.string({error:"Firstname is required"}).min(3, "At least 3 characters").max(50, "Max 50 characters"),

  email: z.string({error:"Email is required"}).email("Invalid email"),

  phone_number: z.string({error:"Phone number is required"}).startsWith("6", "The phone has to start by 6").length(9, "Invalid phone number"),

  role: z.string({error: "Role is required"}),

  town: z.string({error:  "The town is required"}),

  district: z.string({error:"The district is required"})
});


export const UserUpdateSchema = z.object({
  lastname : z.string({error: "The lastname is required"}
  ).min(3, "At least 3 characters").max(50, "Max 50 characters").optional(),

  firstname: z.string({error:"Firstname is required"}).min(3, "At least 3 characters").max(50, "Max 50 characters").optional(),

  email: z.string({error:"Email is required"}).email("Invalid email").optional(),

  phone_number: z.string({error:"Phone number is required"}).startsWith("6", "The phone has to start by 6").length(9, "Invalid phone number").optional(),

  role: z.string({error: "Role is required"}).optional(),

  town: z.string({error:  "The town is required"}).optional(),

  district: z.string({error:"The district is required"}).optional()
});


export type CreateUserDTO = z.infer<typeof UserSchema> 
export type UpdateUserDTO = z.infer<typeof UserUpdateSchema>