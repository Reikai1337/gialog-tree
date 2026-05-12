import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export type UserAccess = {
  uid: string;
  email: string;
  displayName: string;
  hasAccess: boolean;
  createdAt: Date;
};

export type SortOrder = "asc" | "desc";

export type GetUsersParams = {
  search?: string;
  pageSize?: number;
  /** Курсор для следующей страницы — последний doc предыдущего запроса */
  afterDoc?: QueryDocumentSnapshot<DocumentData>;
  /** Курсор для предыдущей страницы — первый doc текущей страницы */
  beforeDoc?: QueryDocumentSnapshot<DocumentData>;
  /** Сортировка по полю hasAccess */
  accessSort?: SortOrder;
};

export type GetUsersResult = {
  users: UserAccess[];
  /** Первый документ страницы — сохрани для перехода "назад" */
  firstDoc: QueryDocumentSnapshot<DocumentData> | null;
  /** Последний документ страницы — сохрани для перехода "вперёд" */
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  /** Есть ли следующая страница (определяется через +1 запрос) */
  hasNextPage: boolean;
  /** Есть ли предыдущая страница (true когда передан beforeDoc) */
  hasPrevPage: boolean;
};
