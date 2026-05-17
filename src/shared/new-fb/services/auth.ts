import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
  type NextOrObserver,
  type User,
} from "firebase/auth";

import { auth } from "../clientApp";
import { ensureUser } from "./users";
import { okResponse, errResponse } from "../lib";
import type { Response } from "../types/utils";

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(cb: NextOrObserver<User>) {
  return _onIdTokenChanged(auth, cb);
}

export async function signInWithGoogle(): Response<void> {
  const provider = new GoogleAuthProvider();

  try {
    const { user } = await signInWithPopup(auth, provider);
    await ensureUser({
      id: user.uid,
      email: user.email as string,
      displayName: user.displayName as string,
    });
    return okResponse(undefined);
  } catch (e) {
    return errResponse(e);
  }
}

export async function signOut(): Response<void> {
  try {
    await auth.signOut();
    return okResponse(undefined);
  } catch (e) {
    return errResponse(e);
  }
}

export async function isAdmin(user: User): Promise<boolean> {
  const idTokenResult = await user.getIdTokenResult();
  return idTokenResult.claims?.admin === true;
}
