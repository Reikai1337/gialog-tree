import { Panel } from "@xyflow/react";
import { memo, type ReactNode } from "react";

import { DeleteNodeButton } from "./DeleteNodeButton";
import { AddNodeButtons } from "./AddNodeButtons";
import { EditNodeButton } from "./EditNodeButton";
import { SaveButton } from "./SaveButton";
import { TitleBadge } from "./TitleBadge";
import { PublishToggle } from "./PublishToggle";

export type ToolbarProps = {
  rightPanelSlot?: ReactNode;
};

export const Toolbar = memo(({ rightPanelSlot }: ToolbarProps) => {
  return (
    <>
      <Panel position="top-left">
        <AddNodeButtons />
      </Panel>
      <Panel position="top-center" className="flex gap-2">
        <TitleBadge />
        <PublishToggle />
      </Panel>
      <Panel position="top-right" className="flex flex-col items-center gap-2">
        {rightPanelSlot}
        <SaveButton />
        <EditNodeButton />
        <DeleteNodeButton />
      </Panel>
    </>
  );
});

Toolbar.displayName = "Toolbar";
