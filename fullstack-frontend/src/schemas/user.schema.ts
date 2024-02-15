import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  fullName: z.string().min(1, "O nome é obrigratório"),
  email: z.string().email("Forneça um e-mail válido"),
  password: z.string().min(1, "A senha é obrigatória"),
  telephone: z.string().min(1, "É necessário cadastrar um telefone"),
  createdAt: z.string(),
  userId: z.string(),
});

export type UserData = z.infer<typeof userSchema>;
export const CreateUser = userSchema.omit({
  id: true,
  createdAt: true,
  userId: true,
});
