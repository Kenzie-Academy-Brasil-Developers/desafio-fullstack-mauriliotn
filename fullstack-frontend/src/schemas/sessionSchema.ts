import { z } from "zod";

export const SessionFormSchema = z.object({
  email: z.string().email("Deve ser um e-mail"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export type SessionData = z.infer<typeof SessionFormSchema>;
