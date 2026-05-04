"use client";

import { createZustandContext } from "@shared/lib/utils/createZustandContext";
import {
  createRuntimeStore,
  type RuntimeStore,
  type RuntimeState,
} from "../model/store";

export const {
  Provider: RuntimeStoreProvider,
  useStore: useRuntimeStore,
  useStoreApi: useRuntimeStoreApi,
} = createZustandContext<RuntimeStore, RuntimeState>((init) => {
  console.log("Creating Runtime store with init:", init);

  return createRuntimeStore(init);
}, "RuntimeStore");
