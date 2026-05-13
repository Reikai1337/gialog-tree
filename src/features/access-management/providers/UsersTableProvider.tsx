"use client";

import { createZustandContext } from "@shared/lib/utils/createZustandContext";
import {
  createUsersTableStore,
  type UsersTableStore,
  type UsersTableState,
} from "../model/users-table.store";

export const {
  Provider: UsersTableProvider,
  useStore: useUsersTableStore,
  useStoreApi: useUsersTableStoreApi,
} = createZustandContext<UsersTableStore, Partial<UsersTableState>>(
  (init) => createUsersTableStore(init),
  "UsersTableStore",
);
