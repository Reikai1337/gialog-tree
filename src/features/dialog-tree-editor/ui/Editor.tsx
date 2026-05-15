"use client";

import { cn } from "@shared/lib/utils";
import { Card } from "@shared/ui/card";
import { useEffect, type FC } from "react";
import {
  useEditorStore,
  useEditorStoreApi,
} from "../providers/EditorStoreProvider";
import type { EditorState } from "../model/store";
import { ReactFlow } from "@xyflow/react";
import { nodeTypes } from "./Nodes";
import { Toolbar, type ToolbarProps } from "./Toolbar";
import { edgeTypes } from "./Edges";
import type { RFAnyNode } from "@entities/dialog-tree";

export type DialogTreeEditorProps = Pick<EditorState, "onSubmit"> &
  Pick<ToolbarProps, "rightPanelSlot"> & {
    className?: string;
  };

export const DialogTreeEditor: FC<DialogTreeEditorProps> = ({
  className,
  onSubmit,
  rightPanelSlot,
}) => {
  const edges = useEditorStore((s) => s.edges);
  const nodes = useEditorStore((s) => s.nodes);
  const onNodesChange = useEditorStore((s) => s.onNodesChange);
  const onEdgesChange = useEditorStore((s) => s.onEdgesChange);
  const onConnect = useEditorStore((s) => s.onConnect);
  const api = useEditorStoreApi();

  useEffect(() => {
    api.setState({ onSubmit });
  }, [onSubmit, api]);

  return (
    <Card className={cn("h-full w-full p-0", className)}>
      <ReactFlow<RFAnyNode>
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
      >
        <Toolbar rightPanelSlot={rightPanelSlot} />
      </ReactFlow>
    </Card>
  );
};
