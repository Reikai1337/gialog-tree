import { setDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { sessionDoc } from "./refs";
import type { Session } from "./types";

export async function upsertSession(uid: string, sessionId: string) {
  await setDoc(sessionDoc(uid), {
    sessionId,
    createdAt: serverTimestamp(),
  });
}

export function subscribeToSession(
  uid: string,
  cb: (session: Session | null) => void,
) {
  return onSnapshot(sessionDoc(uid), (snap) => {
    if (!snap.exists()) {
      cb(null);
      return;
    }
    const data = snap.data();
    cb({
      sessionId: data.sessionId,
      createdAt: data.createdAt?.toDate(),
    });
  });
}
