"use client";

import { createZustandContext } from "@shared/lib/utils/createZustandContext";
import {
  createEditorStore,
  type EditorStore,
  type InitState,
} from "../model/store";

export const {
  Provider: EditorStoreProvider,
  useStore: useEditorStore,
  useStoreApi: useEditorStoreApi,
} = createZustandContext<EditorStore, InitState>((init) => {
  return createEditorStore(init);
}, "EditorStore");
