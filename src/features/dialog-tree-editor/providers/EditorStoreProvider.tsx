"use client";

import { createZustandContext } from "@shared/lib/utils/createZustandContext";
import {
  createEditorStore,
  type EditorStore,
  type EditorState,
} from "../model/store";

export const {
  Provider: EditorStoreProvider,
  useStore: useEditorStore,
  useStoreApi: useEditorStoreApi,
} = createZustandContext<EditorStore, EditorState>((init) => {
  console.log("Creating Editor store with init:", init);

  return createEditorStore(init);
}, "EditorStore");
