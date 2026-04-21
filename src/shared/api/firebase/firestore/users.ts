// src/lib/firebase/firestore/users.js
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../clientApp";
import { User } from "@entities/user";

export async function getUser(uid: string) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function createUser(uid: string, userData: Omit<User, "uid">) {
  await setDoc(doc(db, "users", uid), userData);
}

export async function updateUser(uid: string, userData: Partial<User>) {
  await updateDoc(doc(db, "users", uid), userData);
}
