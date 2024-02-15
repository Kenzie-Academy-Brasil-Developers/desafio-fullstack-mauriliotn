import { z } from "zod";

export const ContactSchema = z.object({
  id: z.string(),
  fullName: z.string().min(1),
  email: z.string().email(),
  telephone: z.string().min(1),
});

export const ContactSchemaRequest = ContactSchema.omit({
  id: true,
});

export const ContactSchemaEdit = ContactSchemaRequest.partial();

export type ContactData = z.infer<typeof ContactSchema>;
export type CreateContactData = z.infer<typeof ContactSchemaRequest>;
export type EditContactData = z.infer<typeof ContactSchemaEdit>;
