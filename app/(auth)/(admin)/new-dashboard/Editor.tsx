"use client";

import { DialogTreeEditor } from "@features/dialog-tree-editor";

export const Editor = () => {
  return (
    <div className="p-1 h-full w-full">
      <DialogTreeEditor
        onSubmitCallback={(d) => {
          console.log("editor1", d);
        }}
      />
    </div>
  );
};
