import {
  setDoc,
  onSnapshot,
  Firestore,
  collection,
  doc,
} from "firebase/firestore";
import {
  createConverter,
  COLLECTIONS,
  okResponse,
  errResponse,
  type Response,
} from "../lib";
import type { UserSessionDoc, UserSession } from "./types";
import { db as clientDB } from "../clientApp";

const userSessionConverter = createConverter<UserSessionDoc, UserSession>();

const userSessionCol = (db: Firestore) =>
  collection(db, COLLECTIONS.SESSIONS).withConverter(userSessionConverter);

const userSessionDoc = (userId: string, db: Firestore) =>
  doc(db, COLLECTIONS.SESSIONS, userId).withConverter(userSessionConverter);

type UpsertSessionParams = {
  userId: string;
  sessionId: string;
};

export const upsertUserSession = async (
  { userId, sessionId }: UpsertSessionParams,
  db: Firestore = clientDB,
): Response<void> => {
  try {
    const ref = userSessionDoc(userId, db);
    await setDoc(ref, {
      id: userId,
      sessionId,
    });

    return okResponse(undefined);
  } catch (e) {
    return errResponse(e);
  }
};

export const subscribeToUserSession = (
  userId: string,
  cb: (session: UserSessionDoc | null) => void,
) => {
  return onSnapshot(userSessionDoc(userId, clientDB), (snap) => {
    cb(snap.exists() ? snap.data() : null);
  });
};
