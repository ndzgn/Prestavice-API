import z from "zod";
import { createUserSchema } from "../../models/User";

 
 export const loginSchema = z.object({
    email : z.string({error:"Veuillez entrer votre email"}).email("Email invalide"),
    password: z.string({error:"Entrez votre mot de passe"})
 })


 export type loginDTO = z.infer<typeof loginSchema>
 export type registerDTO = z.infer<typeof createUserSchema>