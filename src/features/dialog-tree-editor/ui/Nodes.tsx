import {
  Handle,
  Position,
  type NodeProps,
  type NodeTypes,
} from "@xyflow/react";
import {
  OutcomeNodeCard as BaseOutcomeNodeCard,
  SpeechNodeCard as BaseSpeechNodeCard,
  type RFOutcomeNode,
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

// ─── Outcome ───────────────────────────────────────────────────────────────────
type RFOutcomeNodeProps = NodeProps<RFOutcomeNode>;
const areOutcomePropsEqual = (
  prev: RFOutcomeNodeProps,
  next: RFOutcomeNodeProps,
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

const OutcomeNode = ({ data, selected }: RFOutcomeNodeProps) => {
  return (
    <BaseOutcomeNodeCard
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
  outcome: memo(OutcomeNode, areOutcomePropsEqual),
  speech: memo(SpeechNode, areSpeechPropsEqual),
};
