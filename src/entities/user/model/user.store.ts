import { createStore } from "zustand/vanilla";
import type { User } from "./user.schema";

export type UserState = {
  user: User | null;
  isLoading: boolean;
  hasUser: boolean;
};

export type UserActions = {
  setUser: (user: User | null) => void;
  setLoading: (value: boolean) => void;
};

export type UserStore = UserState & UserActions;

export const createUserStore = (initState: UserState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    hasUser: Boolean(initState.user),
    setUser: (user) => {
      set(() => ({ user, hasUser: Boolean(user) }));
    },
    setLoading: (isLoading) => {
      set(() => ({ isLoading }));
    },
  }));
};
