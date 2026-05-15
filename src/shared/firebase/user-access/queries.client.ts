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
  type Query,
  startAt,
} from "firebase/firestore";
import { userAccessCol, userAccessDoc } from "./refs";
import type {
  GetUsersParams,
  GetUsersResult,
  SortOrder,
  UserAccess,
} from "./types";
import { db } from "../clientApp";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const mapUserAccess = (
  doc: QueryDocumentSnapshot<DocumentData>,
): UserAccess => ({
  ...(doc.data() as Omit<UserAccess, "createdAt">),
  createdAt: doc.data().createdAt?.toDate(),
});

/**
 * Строит базовый query без курсоров.
 * При поиске — email-фильтр идёт первым (индекс: email → hasAccess).
 * Без поиска — сортировка hasAccess идёт первым (индекс: hasAccess → email).
 */
function buildBaseQuery(
  search: string,
  accessSort: SortOrder,
): Query<DocumentData> {
  const col = userAccessCol(db);

  if (search) {
    // prefix-search по email; orderBy email должен идти первым из-за range-фильтра
    return query(
      col,
      where("email", ">=", search),
      where("email", "<=", search + "\uf8ff"),
      orderBy("email", "asc"),
      orderBy("hasAccess", accessSort),
    );
  }

  return query(
    col,
    orderBy("hasAccess", accessSort),
    orderBy("email", "asc"), // вторичный sort для стабильного курсора
  );
}

// ---------------------------------------------------------------------------
// Main query
// ---------------------------------------------------------------------------

export async function getUsers({
  search = "",
  pageSize = 20,
  afterDoc,
  startAtDoc,
  accessSort = "asc",
}: GetUsersParams = {}): Promise<GetUsersResult> {
  const base = buildBaseQuery(search, accessSort);

  let q: Query<DocumentData>;

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

  return {
    users: docs.map(mapUserAccess),
    firstDoc: docs[0] ?? null,
    lastDoc: docs[docs.length - 1] ?? null,
    hasNextPage,
    hasPrevPage: !!(afterDoc || startAtDoc),
  };
}

// ---------------------------------------------------------------------------
// Sync & mutate
// ---------------------------------------------------------------------------

type SyncParams = {
  uid: string;
  email: string;
  displayName: string | null;
};

export async function syncUserAccess({
  uid,
  email,
  displayName,
}: SyncParams): Promise<void> {
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

export async function changeUserAccess(
  uid: string,
  hasAccess: boolean,
): Promise<void> {
  await updateDoc(userAccessDoc(uid, db), { hasAccess });
}
