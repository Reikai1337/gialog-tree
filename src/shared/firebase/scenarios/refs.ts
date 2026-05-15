import { collection, doc, Firestore } from "firebase/firestore";
import { COLLECTIONS } from "../collections";

export const scenarioCol = (db: Firestore) => {
  return collection(db, COLLECTIONS.scenarios);
};

export const scenarioDoc = (id: string, db: Firestore) => {
  return doc(db, COLLECTIONS.scenarios, id);
};
