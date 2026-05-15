"use client";

import { createZustandContext } from "@shared/lib/utils/createZustandContext";
import {
  createUserStore,
  type UserStore,
  type UserState,
} from "../model/user.store";
/**
 * Мы передаём фабрику createUserStore — при Provider'е будет создаваться отдельный store-экземпляр.
 * Тип State в createZustandContext — UserStore
 */
export const {
  Provider: UserStoreProvider,
  useStore: useUserStore,
  useStoreApi: useUserStoreApi,
} = createZustandContext<UserStore, UserState>((init) => {
  return createUserStore(init);
}, "UserStore");
