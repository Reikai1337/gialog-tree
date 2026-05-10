import {
  getDoc,
  setDoc,
  updateDoc,
  getDocs,
  query,
  orderBy,
  where,
  limit,
  startAfter,
  serverTimestamp,
  type QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";
import { userAccessCol, userAccessDoc } from "./refs";
import type { UserAccess, GetUsersParams, GetUsersResult } from "./types";
import { db } from "../clientApp";

const mapUserAccess = (
  doc: QueryDocumentSnapshot<DocumentData>,
): UserAccess => ({
  ...(doc.data() as Omit<UserAccess, "createdAt">),
  createdAt: doc.data().createdAt?.toDate(),
});

type Params = {
  uid: string;
  email: string;
  displayName: string;
};

// вызывается при логине — создаёт запись если её нет
export async function syncUserAccess({
  uid,
  email,
  displayName,
}: Params): Promise<void> {
  const ref = userAccessDoc(uid, db);
  const snap = await getDoc(ref);
  if (snap.exists()) return;

  await setDoc(ref, {
    uid,
    email,
    displayName,
    hasAccess: false,
    createdAt: serverTimestamp(),
  });
}

// для data grid в админке
export async function getUsers({
  search = "",
  limit: pageLimit = 20,
  startAfterDoc,
}: GetUsersParams = {}): Promise<GetUsersResult> {
  let q = query(
    userAccessCol(db),
    orderBy("email"),
    limit(pageLimit + 1), // +1 чтобы знать есть ли следующая страница
  );

  if (search) {
    q = query(
      userAccessCol(db),
      orderBy("email"),
      where("email", ">=", search),
      where("email", "<=", search + "\uf8ff"),
      limit(pageLimit + 1),
    );
  }

  if (startAfterDoc) {
    q = query(q, startAfter(startAfterDoc));
  }

  const snap = await getDocs(q);
  const hasMore = snap.docs.length > pageLimit;
  const docs = hasMore ? snap.docs.slice(0, -1) : snap.docs;

  return {
    users: docs.map(mapUserAccess),
    lastDoc: docs[docs.length - 1] ?? null,
    hasMore,
  };
}

// для админки — изменить доступ юзера
export async function changeUserAccess(
  uid: string,
  hasAccess: boolean,
): Promise<void> {
  await updateDoc(userAccessDoc(uid, db), { hasAccess });
}
