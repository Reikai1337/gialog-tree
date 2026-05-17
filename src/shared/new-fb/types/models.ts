import { Timestamp } from "firebase/firestore";
import type { ToModel, WithId } from "./utils";
import type { AnyAppEdge, AnyAppNode } from "@entities/dialog-tree/model";

export type UserDoc = {
  email: string;
  displayName: string;
  hasAccess: boolean;
  createdAt: Timestamp;
};
export type User = ToModel<
  UserDoc,
  {
    createdAt: string;
  }
>;

export type UserSessionDoc = {
  sessionId: string;
};
export type UserSession = WithId<UserSessionDoc>;

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
