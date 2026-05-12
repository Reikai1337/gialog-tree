import { doc, Firestore } from "firebase/firestore";
import { COLLECTIONS } from "../collections";

export const sessionDoc = (uid: string, db: Firestore) => {
  return doc(db, COLLECTIONS.sessions, uid);
};
