import { doc } from "firebase/firestore";
import { db } from "../clientApp";
import { COLLECTIONS } from "../collections";

export const sessionDoc = (uid: string) => {
  return doc(db, COLLECTIONS.sessions, uid);
};
