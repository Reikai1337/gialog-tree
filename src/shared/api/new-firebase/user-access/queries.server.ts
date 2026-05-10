import { getDoc } from "firebase/firestore";
import { type Firestore } from "firebase/firestore";
import { userAccessDoc } from "./refs";

export async function checkUserAccess(
  uid: string,
  db: Firestore,
): Promise<boolean> {
  const snap = await getDoc(userAccessDoc(uid, db));
  if (!snap.exists()) return false;
  return snap.data().hasAccess === true;
}
