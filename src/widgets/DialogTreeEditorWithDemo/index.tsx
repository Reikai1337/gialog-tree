"use client";

import {
  DialogTreeEditor,
  EditorStoreProvider,
} from "@features/dialog-tree-editor";
import { PH_SC_IS } from "@features/dialog-tree-editor/IS";
import { RunDemoButton } from "./ui/RunDemoButton";

type Props = {
  className?: string;
};

export const DialogTreeEditorWithDemo = ({ className }: Props) => {
  return (
    <EditorStoreProvider initState={PH_SC_IS}>
      <div className={className}>
        <DialogTreeEditor
          onSubmitCallback={(d) => {
            console.log("editor1", d);
          }}
          rightPanelSlot={<RunDemoButton />}
        />
      </div>
    </EditorStoreProvider>
  );
};
