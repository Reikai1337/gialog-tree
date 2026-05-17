import { createStore } from "zustand/vanilla";
import type {
  OrderByDirection,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { changeUserAccess, getUsers } from "@shared/new-fb/services/users";
import type { User } from "@shared/new-fb/types/models";

export type UsersTableState = {
  users: User[];
  isLoading: boolean;
  error: string | null;
  search: string;
  accessSort: OrderByDirection;
  pageSize: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  // Внутреннее состояние пагинации — не нужно пробрасывать в UI
  _cursorStack: Array<QueryDocumentSnapshot | undefined>;
  _lastDoc: QueryDocumentSnapshot | null;
};

export type UsersTableActions = {
  fetchFirstPage: () => Promise<void>;
  fetchNextPage: () => Promise<void>;
  fetchPrevPage: () => Promise<void>;
  setSearch: (search: string) => void;
  setAccessSort: (sort: OrderByDirection) => void;
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
  accessSort: "asc",
  pageSize: 10,
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
      const res = await getUsers({ search, pageSize, accessSort });
      if (res.ok) {
        const { users, hasNextPage, lastDoc } = res.data;
        set({
          users: users,
          hasNextPage: hasNextPage,
          hasPrevPage: false,
          page: 1,
          _cursorStack: [undefined],
          _lastDoc: lastDoc,
        });
      } else {
        set({
          error: res.error,
        });
      }
      set({ isLoading: false });
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
      const res = await getUsers({
        search,
        pageSize,
        accessSort,
        afterDoc: _lastDoc,
      });
      if (res.ok) {
        const { users, hasNextPage, lastDoc, firstDoc } = res.data;

        set({
          users: users,
          hasNextPage: hasNextPage,
          hasPrevPage: true,
          page: page + 1,
          // Сохраняем lastDoc текущей страницы как курсор следующей
          _cursorStack: [..._cursorStack, firstDoc ?? undefined],
          _lastDoc: lastDoc,
        });
      } else {
        set({
          error: res.error,
        });
      }
      set({ isLoading: false });
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
      const res = await getUsers({
        search,
        pageSize,
        accessSort,
        // Первая страница — без курсора, иначе endBefore
        ...(prevCursor ? { startAtDoc: prevCursor } : {}), // было beforeDoc
      });
      if (res.ok) {
        const { users, lastDoc } = res.data;
        set({
          users: users,
          hasNextPage: true, // раз идём назад — следующая точно есть
          hasPrevPage: newStack.length > 1,
          page: page - 1,
          _cursorStack: newStack,
          _lastDoc: lastDoc,
        });
      } else {
        set({
          error: res.error,
        });
      }
      set({ isLoading: false });
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

    updateUserAccess: async (id, hasAccess) => {
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? { ...u, hasAccess } : u)),
      }));
      const res = await changeUserAccess(id, hasAccess);
      if (res.ok) return;

      set((state) => ({
        users: state.users.map((u) =>
          u.id === id ? { ...u, hasAccess: !hasAccess } : u,
        ),
        error: res.error,
      }));
    },
  }));
