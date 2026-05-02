import type {
  AnswerNode as BaseAnswerNode,
  SpeechNode as BaseSpeechNode,
} from "@entities/dialog-tree";
import type { Node } from "@xyflow/react";

export type RFAnswerNode = Node<BaseAnswerNode, BaseAnswerNode["type"]>;
export type RFSpeechNode = Node<BaseSpeechNode, BaseSpeechNode["type"]>;

export type RFAnyNode = RFAnswerNode | RFSpeechNode;
