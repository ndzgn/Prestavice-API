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
  lastname : z.string().nonempty().min(3, "At least 3 characters").max(50, "Max 50 characters"),
  firstname: z.string().nonempty().min(3, "At least 3 characters").max(50, "Max 50 characters"),
  email: z.email("Invalid email").nonempty("Email is required"),
  phone_number: z.string().startsWith("6", "The phone has to start by 6").length(9, "Invalid phone number"),
  role: z.string().nonempty("The role is required"),
  town: z.string().nonempty("The town is required"),
  district: z.string().nonempty("The district is required")
});



export type CreateUser = z.infer<typeof UserSchema> 
