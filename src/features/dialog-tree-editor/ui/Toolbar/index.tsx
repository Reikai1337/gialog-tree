import { Panel } from "@xyflow/react";
import { memo } from "react";

import { DeleteNodeButton } from "./DeleteNodeButton";
import { AddNodeButtons } from "./AddNodeButtons";
import { EditNodeButton } from "./EditNodeButton";
import { SaveButton } from "./SaveButton";

export const Toolbar = memo(() => {
  return (
    <>
      <Panel position="top-left">
        <AddNodeButtons />
      </Panel>
      <Panel position="top-right" className="flex flex-col items-center gap-2">
        <SaveButton />
        <EditNodeButton />
        <DeleteNodeButton />
      </Panel>
    </>
  );
});

Toolbar.displayName = "Toolbar";
