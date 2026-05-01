import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
  type NextOrObserver,
  type User,
  type UserCredential,
} from "firebase/auth";

import { auth } from "./clientApp";
import { createUser, getUser } from "./firestore/users";

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(cb: NextOrObserver<User>) {
  return _onIdTokenChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    console.log("name=>", result.user.displayName);

    await createUserIfNotExists(result.user); // ← вызов здесь
  } catch (error) {
    console.log("ER", error instanceof Error ? error.message : "asd");

    // console.error("Error signing in with Google", error);
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}

async function createUserIfNotExists(user: UserCredential["user"]) {
  const existingUser = await getUser(user.uid); // ← getUser из users.js
  if (existingUser) return;

  await createUser(user.uid, {
    // ← createUser из users.js
    email: user.email || "unknown",
    displayName: user.displayName || "unknown",
    photoURL: user.photoURL || "unknown",
  });
}
