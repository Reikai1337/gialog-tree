import { z } from "zod";

export const UserSchema = z.object({
  uid: z.uuid(),
  displayName: z.string(),
  email: z.string().email(),
  photoURL: z.string(),
});

export type User = z.infer<typeof UserSchema>;
