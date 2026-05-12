import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
  type NextOrObserver,
  type User,
} from "firebase/auth";

import { auth } from "./clientApp";
import { syncUserAccess } from "./user-access";

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(cb: NextOrObserver<User>) {
  return _onIdTokenChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const { user } = await signInWithPopup(auth, provider);
    await syncUserAccess({
      uid: user.uid,
      email: user.email as string,
      displayName: user.displayName,
    });
  } catch (error) {
    console.log("ER", error instanceof Error ? error.message : "asd");
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}

export async function isAdmin(user: User): Promise<boolean> {
  const idTokenResult = await user.getIdTokenResult();
  return idTokenResult.claims?.admin === true;
}
