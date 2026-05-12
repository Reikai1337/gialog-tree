import { createStore } from "zustand/vanilla";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import {
  getUsers,
  changeUserAccess,
  type UserAccess,
  type SortOrder,
} from "@shared/firebase/user-access";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type UsersTableState = {
  users: UserAccess[];
  isLoading: boolean;
  error: string | null;
  search: string;
  accessSort: SortOrder;
  pageSize: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  // Внутреннее состояние пагинации — не нужно пробрасывать в UI
  _cursorStack: Array<QueryDocumentSnapshot<DocumentData> | undefined>;
  _lastDoc: QueryDocumentSnapshot<DocumentData> | null;
};

export type UsersTableActions = {
  fetchFirstPage: () => Promise<void>;
  fetchNextPage: () => Promise<void>;
  fetchPrevPage: () => Promise<void>;
  setSearch: (search: string) => void;
  setAccessSort: (sort: SortOrder) => void;
  updateUserAccess: (uid: string, hasAccess: boolean) => Promise<void>;
};

export type UsersTableStore = UsersTableState & UsersTableActions;

// ---------------------------------------------------------------------------
// Default state
// ---------------------------------------------------------------------------

const defaultState: UsersTableState = {
  users: [],
  isLoading: false,
  error: null,
  search: "",
  accessSort: "desc",
  pageSize: 5,
  page: 1,
  hasNextPage: false,
  hasPrevPage: false,
  _cursorStack: [undefined], // [undefined] = первая страница без курсора
  _lastDoc: null,
};

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const createUsersTableStore = (
  initState: Partial<UsersTableState> = {},
) =>
  createStore<UsersTableStore>()((set, get) => ({
    ...defaultState,
    ...initState,

    // Первая страница / сброс пагинации
    fetchFirstPage: async () => {
      const { search, pageSize, accessSort } = get();
      set({ isLoading: true, error: null });
      try {
        const result = await getUsers({ search, pageSize, accessSort });
        console.log("result", result);

        set({
          users: result.users,
          hasNextPage: result.hasNextPage,
          hasPrevPage: false,
          page: 1,
          _cursorStack: [undefined],
          _lastDoc: result.lastDoc,
        });
      } catch (e) {
        set({
          error: e instanceof Error ? e.message : "Failed to fetch users",
        });
      } finally {
        set({ isLoading: false });
      }
    },

    fetchNextPage: async () => {
      const {
        isLoading,
        hasNextPage,
        _lastDoc,
        _cursorStack,
        search,
        pageSize,
        accessSort,
        page,
      } = get();
      if (isLoading || !hasNextPage || !_lastDoc) return;

      set({ isLoading: true, error: null });
      try {
        const result = await getUsers({
          search,
          pageSize,
          accessSort,
          afterDoc: _lastDoc,
        });
        set({
          users: result.users,
          hasNextPage: result.hasNextPage,
          hasPrevPage: true,
          page: page + 1,
          // Сохраняем lastDoc текущей страницы как курсор следующей
          _cursorStack: [..._cursorStack, _lastDoc],
          _lastDoc: result.lastDoc,
        });
      } catch (e) {
        set({
          error: e instanceof Error ? e.message : "Failed to fetch next page",
        });
      } finally {
        set({ isLoading: false });
      }
    },

    fetchPrevPage: async () => {
      const {
        isLoading,
        hasPrevPage,
        _cursorStack,
        search,
        pageSize,
        accessSort,
        page,
      } = get();
      if (isLoading || !hasPrevPage || _cursorStack.length <= 1) return;

      // Срезаем курсор текущей страницы — возвращаемся к предыдущему
      const newStack = _cursorStack.slice(0, -1);
      const prevCursor = newStack[newStack.length - 1];

      set({ isLoading: true, error: null });
      try {
        const result = await getUsers({
          search,
          pageSize,
          accessSort,
          // Первая страница — без курсора, иначе endBefore
          ...(prevCursor ? { beforeDoc: prevCursor } : {}),
        });
        set({
          users: result.users,
          hasNextPage: true, // раз идём назад — следующая точно есть
          hasPrevPage: newStack.length > 1,
          page: page - 1,
          _cursorStack: newStack,
          _lastDoc: result.lastDoc,
        });
      } catch (e) {
        set({
          error: e instanceof Error ? e.message : "Failed to fetch prev page",
        });
      } finally {
        set({ isLoading: false });
      }
    },

    // Сброс пагинации при новом поиске
    setSearch: (search) => {
      set({ search });
      get().fetchFirstPage();
    },

    // Сброс пагинации при смене сортировки
    setAccessSort: (accessSort) => {
      set({ accessSort });
      get().fetchFirstPage();
    },

    updateUserAccess: async (uid, hasAccess) => {
      // Оптимистичное обновление — UI реагирует мгновенно
      set((state) => ({
        users: state.users.map((u) =>
          u.uid === uid ? { ...u, hasAccess } : u,
        ),
      }));
      try {
        await changeUserAccess(uid, hasAccess);
      } catch (e) {
        // Откат при ошибке
        set((state) => ({
          users: state.users.map((u) =>
            u.uid === uid ? { ...u, hasAccess: !hasAccess } : u,
          ),
          error: e instanceof Error ? e.message : "Failed to update access",
        }));
      }
    },
  }));
