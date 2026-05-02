import type {
  QuestionNodeType,
  AnswerNodeType,
  ScenarioNodeType,
} from "@entities/dialog-tree";
import type { Node } from "@xyflow/react";

export type QuestionNode = Node<QuestionNodeType, QuestionNodeType["type"]>;
export type AnswerNode = Node<AnswerNodeType, AnswerNodeType["type"]>;
export type ScenarioNode = Node<ScenarioNodeType, ScenarioNodeType["type"]>;

export type AnyRFNode = QuestionNode | AnswerNode | ScenarioNode;
