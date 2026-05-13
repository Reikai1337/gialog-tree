import { createStore } from "zustand/vanilla";
import type { User } from "./user.schema";

export type UserState = {
  user: User | null;
  isLoading: boolean;
  isAdmin?: boolean;
};

export type UserActions = {
  setUser: (user: User | null) => void;
  setLoading: (value: boolean) => void;
  setIsAdmin: (value: boolean) => void;
};

export type UserStore = UserState & UserActions;

export const createUserStore = (initState: UserState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setUser: (user) => {
      set(() => ({ user }));
    },
    setLoading: (isLoading) => {
      set(() => ({ isLoading }));
    },
    setIsAdmin: (isAdmin) => {
      set(() => ({ isAdmin }));
    },
  }));
};
