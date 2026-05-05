// ─── Helpers ────────────────────────────────────────────────────────────────

import type { RFAnyNode, RFSpeechNode } from "@entities/dialog-tree";
import type { Edge } from "@xyflow/react";

/** Find the single speech node that is the target of a given Outcome */
export function findSpeechAfterOutcome(
  outcomeId: string,
  nodes: RFAnyNode[],
  edges: Edge[],
): RFSpeechNode | null {
  const edge = edges.find((e) => e.source === outcomeId);
  if (!edge) return null;

  const target = nodes.find(
    (n) => n.id === edge.target,
    //  && n.type === "speech"
  );
  return (target as RFSpeechNode) ?? null;
}

/** Find the root speech node (no incoming edges from any Outcome) */
export function findRootSpeech(
  nodes: RFAnyNode[],
  edges: Edge[],
): RFSpeechNode | null {
  const targetIds = new Set(edges.map((e) => e.target));
  return (
    (nodes.find(
      (n) => n.type === "speech" && !targetIds.has(n.id),
    ) as RFSpeechNode) ?? null
  );
}

/** Get all nodes directly connected FROM a given speech node */
export function getChoicesForSpeech(
  speechId: string,
  nodes: RFAnyNode[],
  edges: Edge[],
): RFAnyNode[] {
  const connectedIds = edges
    .filter((e) => e.source === speechId)
    .map((e) => e.target);

  return nodes.filter((n) => connectedIds.includes(n.id));
}
