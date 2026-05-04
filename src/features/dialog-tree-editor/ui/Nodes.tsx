import {
  Handle,
  Position,
  type NodeProps,
  type NodeTypes,
} from "@xyflow/react";
import {
  AnswerNodeCard as BaseAnswerNodeCard,
  SpeechNodeCard as BaseSpeechNodeCard,
  type RFAnswerNode,
  type RFSpeechNode,
} from "@entities/dialog-tree";
import { cn } from "@shared/lib/utils";
import { memo } from "react";

const HANDLE_BASE = "w-2.5 h-2.5 border-2 rounded-full";

const TargetHandle = (
  <Handle
    type="target"
    position={Position.Left}
    className={cn(HANDLE_BASE, "bg-green-400 border-green-900")}
  />
);

const SourceHandle = (
  <Handle
    type="source"
    position={Position.Right}
    className={cn(HANDLE_BASE, "bg-green-400 border-green-900")}
  />
);

// ─── Answer ───────────────────────────────────────────────────────────────────
type RFAnswerNodeProps = NodeProps<RFAnswerNode>;
const areAnswerPropsEqual = (
  prev: RFAnswerNodeProps,
  next: RFAnswerNodeProps,
): boolean => {
  if (prev.selected !== next.selected) return false;

  const pd = prev.data;
  const nd = next.data;

  if (pd.color !== nd.color) return false;
  if (pd.hint !== nd.hint) return false;
  if (pd.text !== nd.text) return false;
  if (pd.type !== nd.type) return false;

  if (pd.meta.length !== nd.meta.length) return false;
  for (let i = 0; i < pd.meta.length; i++) {
    if (pd.meta[i].id !== nd.meta[i].id) return false;
    if (pd.meta[i].title !== nd.meta[i].title) return false;
  }

  return true;
};

const AnswerNode = ({ data, selected }: RFAnswerNodeProps) => {
  return (
    <BaseAnswerNodeCard
      {...data}
      selected={selected}
      beforeSlot={TargetHandle}
      afterSlot={SourceHandle}
    />
  );
};

// ─── Speech ───────────────────────────────────────────────────────────────────
type RFSpeechNodeProps = NodeProps<RFSpeechNode>;
const areSpeechPropsEqual = (
  prev: RFSpeechNodeProps,
  next: RFSpeechNodeProps,
): boolean => {
  if (prev.selected !== next.selected) return false;

  const pd = prev.data;
  const nd = next.data;

  if (pd.hint !== nd.hint) return false;
  if (pd.text !== nd.text) return false;
  if (pd.type !== nd.type) return false;

  if (pd.meta.length !== nd.meta.length) return false;
  for (let i = 0; i < pd.meta.length; i++) {
    if (pd.meta[i].id !== nd.meta[i].id) return false;
    if (pd.meta[i].title !== nd.meta[i].title) return false;
  }

  return true;
};

const SpeechNode = ({ data, selected }: RFSpeechNodeProps) => {
  return (
    <BaseSpeechNodeCard
      {...data}
      selected={selected}
      beforeSlot={TargetHandle}
      afterSlot={SourceHandle}
    />
  );
};

// ─── Registry ─────────────────────────────────────────────────────────────────

export const nodeTypes: NodeTypes = {
  answer: memo(AnswerNode, areAnswerPropsEqual),
  speech: memo(SpeechNode, areSpeechPropsEqual),
};
