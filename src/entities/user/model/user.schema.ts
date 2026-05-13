import { z } from "zod";

export const UserSchema = z.object({
  uid: z.string(),
  email: z.string().email(),
  displayName: z.string().nullable(),
  photoURL: z.string().url().nullable(),
});

export type User = z.infer<typeof UserSchema>;
