import {
  Handle,
  Position,
  type NodeProps,
  type NodeTypes,
} from "@xyflow/react";
import type {
  AnswerNode as AnswerNodeType,
  QuestionNode as QuestionNodeType,
  ScenarioNode as ScenarioNodeType,
} from "../model";
import {
  ScenarioNode as BaseScenarioNode,
  AnswerNode as BaseAnswerNode,
  QuestionNode as BaseQuestionNode,
} from "@entities/dialog-tree";
import { cn } from "@shared/lib/utils";

const HANDLE_BASE = "w-2.5 h-2.5 border-2 rounded-full";

// ─── Scenario ────────────────────────────────────────────────────────────────

const ScenarioNode = ({ data, id, selected }: NodeProps<ScenarioNodeType>) => {
  return (
    <BaseScenarioNode
      {...data}
      selected={selected}
      beforeSlot={
        <Handle
          type="target"
          position={Position.Top}
          className={cn(HANDLE_BASE, "bg-purple-400 border-purple-900")}
        />
      }
      afterSlot={
        <Handle
          type="source"
          position={Position.Bottom}
          className={cn(HANDLE_BASE, "bg-purple-400 border-purple-900")}
        />
      }
    />
  );
};

// ─── Question ─────────────────────────────────────────────────────────────────

const QuestionNode = ({ data, selected }: NodeProps<QuestionNodeType>) => {
  return (
    <BaseQuestionNode
      {...data}
      selected={selected}
      beforeSlot={
        <Handle
          type="target"
          position={Position.Top}
          className={cn(HANDLE_BASE, "bg-blue-400 border-blue-900")}
        />
      }
      afterSlot={
        <Handle
          type="source"
          position={Position.Bottom}
          className={cn(HANDLE_BASE, "bg-blue-400 border-blue-900")}
        />
      }
    />
  );
};

// ─── Answer ───────────────────────────────────────────────────────────────────

const AnswerNode = ({ data, selected }: NodeProps<AnswerNodeType>) => {
  return (
    <BaseAnswerNode
      {...data}
      selected={selected}
      beforeSlot={
        <Handle
          type="target"
          position={Position.Top}
          className={cn(HANDLE_BASE, "bg-green-400 border-green-900")}
        />
      }
      afterSlot={
        <Handle
          type="source"
          position={Position.Bottom}
          className={cn(HANDLE_BASE, "bg-green-400 border-green-900")}
        />
      }
    />
  );
};

// ─── Registry ─────────────────────────────────────────────────────────────────

export const nodeTypes: NodeTypes = {
  scenario: ScenarioNode,
  question: QuestionNode,
  answer: AnswerNode,
};
