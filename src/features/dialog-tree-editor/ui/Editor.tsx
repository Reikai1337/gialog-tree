"use client";

import { cn } from "@shared/lib/utils";
import { Card } from "@shared/ui/card";
import { useEffect, type FC } from "react";
import {
  EditorStoreProvider,
  useEditorStore,
  useEditorStoreApi,
} from "../providers/EditorStoreProvider";
import type { EditorState } from "../model/editor.store";
import { ReactFlow } from "@xyflow/react";
import { nodeTypes } from "./Nodes";
import type { AnyRFNode } from "../model";
import { Toolbar } from "./Toolbar";
import { edgeTypes } from "./Edges";
import { PH_SC_IS } from "./IS";

type DialogTreeEditorProps = Pick<EditorState, "onSubmitCallback"> & {
  className?: string;
};

const DialogTreeEditorInner: FC<DialogTreeEditorProps> = ({
  className,
  onSubmitCallback,
}) => {
  const edges = useEditorStore((s) => s.edges);
  const nodes = useEditorStore((s) => s.nodes);
  const onNodesChange = useEditorStore((s) => s.onNodesChange);
  const onEdgesChange = useEditorStore((s) => s.onEdgesChange);
  const onConnect = useEditorStore((s) => s.onConnect);
  const api = useEditorStoreApi();

  useEffect(() => {
    api.setState({ onSubmitCallback });
  }, [onSubmitCallback, api]);

  return (
    <Card className={cn("h-full w-full p-0", className)}>
      <ReactFlow<AnyRFNode>
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
        <Toolbar />
      </ReactFlow>
    </Card>
  );
};

export const DialogTreeEditor = (props: DialogTreeEditorProps) => {
  return (
    <EditorStoreProvider initState={PH_SC_IS}>
      <DialogTreeEditorInner {...props} />
    </EditorStoreProvider>
  );
};
