import { collection, doc, Firestore } from "firebase/firestore";
import { COLLECTIONS } from "../collections";

export const userAccessCol = (db: Firestore) => {
  return collection(db, COLLECTIONS.userAccess);
};

export const userAccessDoc = (uid: string, db: Firestore) => {
  return doc(db, COLLECTIONS.userAccess, uid);
};
