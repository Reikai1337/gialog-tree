import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export type UserAccess = {
  uid: string;
  email: string;
  displayName: string;
  hasAccess: boolean;
  createdAt: Date;
};

export type GetUsersParams = {
  search?: string;
  limit?: number;
  startAfterDoc?: QueryDocumentSnapshot<DocumentData>;
};

export type GetUsersResult = {
  users: UserAccess[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
};
