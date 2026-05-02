import type { AnyNodeType } from ".";

export const ALLOWED_NODE_CONNECTION_MAP: Record<AnyNodeType, AnyNodeType[]> = {
  speech: ["speech", "answer"],
  answer: ["speech"],
};
