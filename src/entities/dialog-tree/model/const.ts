import type { AnyNode } from ".";

export const ALLOWED_NODE_CONNECTION_MAP: Record<
  AnyNode["type"],
  AnyNode["type"][]
> = {
  speech: ["speech", "answer"],
  answer: ["speech"],
};
