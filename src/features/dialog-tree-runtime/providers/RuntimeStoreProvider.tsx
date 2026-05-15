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
} = createZustandContext<RuntimeStore, Pick<RuntimeState, "edges" | "nodes">>(
  (init) => {
    return createRuntimeStore(init);
  },
  "RuntimeStore",
);
