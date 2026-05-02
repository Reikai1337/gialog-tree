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

type DialogTreeEditorProps = Pick<EditorState, "onSubmitCallback"> & {
  className?: string;
};

const IS: EditorState = {
  selectedEdgeId: null,
  selectedNodeId: null,

  nodes: [
    {
      id: "b7752831-90c6-422d-92dc-a2c8f4741e5c",
      position: {
        x: 107.16227030412551,
        y: 125.24733125264672,
      },
      type: "scenario",
      data: {
        type: "scenario",
        title: "Утешить",
        description: "Прочесть любимую книгу ",
        color: "red",
        meta: [],
      },
      measured: {
        width: 206,
        height: 82,
      },
      selected: false,
      dragging: false,
    },
    {
      id: "a4e0b1d6-d154-46f0-8cd3-90e8ccd7ba4a",
      position: {
        x: -71.17994215646894,
        y: -177.62619305580637,
      },
      type: "question",
      data: {
        type: "question",
        title: "Как дела?",
        description: "что-то уточнить",
        meta: [],
      },
      measured: {
        width: 220,
        height: 86,
      },
      selected: false,
      dragging: false,
    },
    {
      id: "9e2fef9d-4820-4973-9896-f0dd6dde3dad",
      position: {
        x: -150.52634089473617,
        y: -40.583408430963814,
      },
      type: "answer",
      data: {
        type: "answer",
        title: "Хорошо",
        description: "",
        meta: [],
      },
      measured: {
        width: 160,
        height: 64,
      },
      selected: false,
      dragging: false,
    },
    {
      id: "bd2874c6-386b-4827-a773-ca4757556e0d",
      position: {
        x: 105.67432727838408,
        y: -48.29820675504594,
      },
      type: "answer",
      data: {
        type: "answer",
        title: "Плохо",
        description: "не забыть спросить детали",
        meta: [
          {
            id: "fb8ca34b-57ef-44d2-b38c-38ac3574b6a0",
            title: "Враги",
          },
        ],
      },
      measured: {
        width: 240,
        height: 97,
      },
      selected: false,
      dragging: false,
    },
    {
      id: "ab8573df-e990-4928-8243-78af19e285c9",
      position: {
        x: -270.1383889843289,
        y: 103.95251557125839,
      },
      type: "scenario",
      data: {
        type: "scenario",
        title: "Предложить пройтись",
        description: "Куда вам угодно, только чтоб можно было сесть",
        color: "green",
        meta: [
          {
            id: "c959e83f-313f-43e3-bdf0-c95944cb680b",
            title: "где уже был человек",
          },
        ],
      },
      measured: {
        width: 280,
        height: 97,
      },
      selected: false,
      dragging: false,
    },
  ],
  edges: [
    {
      source: "a4e0b1d6-d154-46f0-8cd3-90e8ccd7ba4a",
      target: "9e2fef9d-4820-4973-9896-f0dd6dde3dad",
      id: "xy-edge__a4e0b1d6-d154-46f0-8cd3-90e8ccd7ba4a-9e2fef9d-4820-4973-9896-f0dd6dde3dad",
    },
    {
      source: "a4e0b1d6-d154-46f0-8cd3-90e8ccd7ba4a",
      target: "bd2874c6-386b-4827-a773-ca4757556e0d",
      id: "xy-edge__a4e0b1d6-d154-46f0-8cd3-90e8ccd7ba4a-bd2874c6-386b-4827-a773-ca4757556e0d",
    },
    {
      source: "bd2874c6-386b-4827-a773-ca4757556e0d",
      target: "b7752831-90c6-422d-92dc-a2c8f4741e5c",
      id: "xy-edge__bd2874c6-386b-4827-a773-ca4757556e0d-b7752831-90c6-422d-92dc-a2c8f4741e5c",
    },
    {
      source: "9e2fef9d-4820-4973-9896-f0dd6dde3dad",
      target: "ab8573df-e990-4928-8243-78af19e285c9",
      id: "xy-edge__9e2fef9d-4820-4973-9896-f0dd6dde3dad-ab8573df-e990-4928-8243-78af19e285c9",
    },
  ],
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
    <EditorStoreProvider initState={IS}>
      <DialogTreeEditorInner {...props} />
    </EditorStoreProvider>
  );
};
