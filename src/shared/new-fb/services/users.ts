import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  Firestore,
  serverTimestamp,
  orderBy,
  QueryDocumentSnapshot,
  type OrderByDirection,
  Query,
  startAt,
  limit,
  startAfter,
  updateDoc,
} from "firebase/firestore";
import { db as clientDB } from "../clientApp";
import type { User, UserDoc } from "../types/models";
import type { Response } from "../types/utils";
import { errResponse, okResponse, COLLECTIONS, createConverter } from "../lib";

const userConverter = createConverter<UserDoc, User>({
  createdAt: (ts) => ts.toDate().toISOString(),
});

const usersCol = (db: Firestore) =>
  collection(db, COLLECTIONS.USERS).withConverter(userConverter);

const userDoc = (uid: string, db: Firestore) =>
  doc(db, COLLECTIONS.USERS, uid).withConverter(userConverter);

export async function getUser(
  uid: string,
  db: Firestore = clientDB,
): Response<User> {
  try {
    const snap = await getDoc(userDoc(uid, db));
    if (!snap.exists()) return { ok: false, error: "Record not found" };
    return okResponse(snap.data());
  } catch (e) {
    return errResponse(e);
  }
}

type EnsureUserParams = {
  id: string;
  email: string;
  displayName: string;
};

export async function ensureUser(
  { id, email, displayName }: EnsureUserParams,
  db: Firestore = clientDB,
): Response<void> {
  try {
    const ref = userDoc(id, db);
    const snap = await getDoc(ref);
    if (snap.exists()) return okResponse(undefined);

    await setDoc(ref, {
      id: snap.id,
      email,
      displayName,
      hasAccess: false,
      createdAt: serverTimestamp(),
    });

    return okResponse(undefined);
  } catch (e) {
    return errResponse(e);
  }
}

export async function changeUserAccess(
  uid: string,
  hasAccess: boolean,
  db: Firestore = clientDB,
): Response<void> {
  try {
    await updateDoc(userDoc(uid, db), { hasAccess });
    return okResponse(undefined);
  } catch (e) {
    return errResponse(e);
  }
}

export type GetUsersParams = {
  search?: string;
  pageSize?: number;
  afterDoc?: QueryDocumentSnapshot;
  startAtDoc?: QueryDocumentSnapshot;
  accessSort?: OrderByDirection;
};

export type GetUsersResult = {
  users: User[];
  firstDoc: QueryDocumentSnapshot | null;
  lastDoc: QueryDocumentSnapshot | null;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

function buildBaseQuery(
  db: Firestore,
  search: string,
  accessSort: OrderByDirection,
) {
  const col = usersCol(db);

  if (search) {
    return query(
      col,
      where("email", ">=", search),
      where("email", "<=", search + "\uf8ff"),
      orderBy("email", "asc"),
      orderBy("hasAccess", accessSort),
    );
  }

  return query(col, orderBy("hasAccess", accessSort), orderBy("email", "asc"));
}

export async function getUsers(
  {
    search = "",
    pageSize = 20,
    afterDoc,
    startAtDoc,
    accessSort = "asc",
  }: GetUsersParams = {},
  db: Firestore = clientDB,
): Response<GetUsersResult> {
  try {
    const base = buildBaseQuery(db, search, accessSort);

    let q: ReturnType<typeof buildBaseQuery>;

    if (startAtDoc) {
      q = query(base, startAt(startAtDoc), limit(pageSize + 1));
    } else if (afterDoc) {
      q = query(base, startAfter(afterDoc), limit(pageSize + 1));
    } else {
      q = query(base, limit(pageSize + 1));
    }

    const snap = await getDocs(q);
    const rawDocs = snap.docs;
    const hasNextPage = rawDocs.length > pageSize;
    const docs = hasNextPage ? rawDocs.slice(0, -1) : rawDocs;

    return okResponse({
      users: docs.map((d) => d.data()),
      firstDoc: docs[0] ?? null,
      lastDoc: docs[docs.length - 1] ?? null,
      hasNextPage,
      hasPrevPage: !!(afterDoc || startAtDoc),
    });
  } catch (e) {
    return errResponse(e);
  }
}
