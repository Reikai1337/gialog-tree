import type { Timestamp } from "firebase/firestore";
import type { ToModel } from "../lib";

export type NodeMeta = {
  id: string;
  title: string;
};

export type SpeechNodeData = {
  type: "speech";
  text: string;
  hint: string;
  meta: NodeMeta[];
};

export type OutcomeNodeColor = "green" | "amber" | "red" | "purple" | "default";

export type OutcomeNodeData = {
  type: "outcome";
  text: string;
  hint: string;
  color: OutcomeNodeColor;
  meta: NodeMeta[];
};

export type AnyNodeData = SpeechNodeData | OutcomeNodeData;
export type AnyNodeType = AnyNodeData["type"];

type AppNode<T extends AnyNodeData> = {
  id: string;
  type: T["type"];
  data: T;
  position: {
    x: number;
    y: number;
  };
};

export type AppSpeechNode = AppNode<SpeechNodeData>;
export type AppOutcomeNode = AppNode<OutcomeNodeData>;
export type AnyAppNode = AppOutcomeNode | AppSpeechNode;

export type AppEdge = {
  id: string;
  source: string;
  target: string;
};

export type AnyAppEdge = AppEdge;

export type ScenarioDoc = {
  title: string;
  isPublished: boolean;
  nodes: AnyAppNode[];
  edges: AnyAppEdge[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type Scenario = ToModel<
  ScenarioDoc,
  {
    createdAt: string;
    updatedAt: string;
  }
>;
