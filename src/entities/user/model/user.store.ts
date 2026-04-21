import { createStore } from "zustand/vanilla";
import { User } from "./user.schema";

export type UserState = {
  user: User | null;
  isLoading: boolean;
};

export type UserActions = {
  setUser: (user: User | null) => void;
};

export type UserStore = UserState & UserActions;

export const createUserStore = (initState: UserState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setUser: (user) => {
      set(() => ({ user, isLoading: false }));
    },
  }));
};
