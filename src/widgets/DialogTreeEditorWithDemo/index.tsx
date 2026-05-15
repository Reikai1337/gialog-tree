"use client";

import {
  DialogTreeEditor,
  EditorStoreProvider,
  type DialogTreeEditorProps,
  type EditorInitState,
} from "@features/dialog-tree-editor";
import { RunDemoButton } from "./ui/RunDemoButton";

type Props = Pick<DialogTreeEditorProps, "onSubmit" | "className"> & {
  initState?: EditorInitState;
};

const DEFAULT_STATE: EditorInitState = {
  title: "Unknown",
  isPublished: false,
  edges: [],
  nodes: [],
};

export const DialogTreeEditorWithDemo = ({
  initState = DEFAULT_STATE,
  ...editorProps
}: Props) => {
  return (
    <EditorStoreProvider initState={initState}>
      <DialogTreeEditor {...editorProps} rightPanelSlot={<RunDemoButton />} />
    </EditorStoreProvider>
  );
};
