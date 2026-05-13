import "server-only";

import type { User } from "firebase/auth";

export async function isAdmin(user: User): Promise<boolean> {
  const idTokenResult = await user.getIdTokenResult();
  return idTokenResult.claims?.admin === true;
}
