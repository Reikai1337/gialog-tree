// ─── Helpers ────────────────────────────────────────────────────────────────

import type { RFAnyNode, RFSpeechNode } from "@entities/dialog-tree";
import type { Edge } from "@xyflow/react";
import type { MetaField } from "./model/store";

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

export const getNodeById = <T extends RFAnyNode>(
  nodes: RFAnyNode[],
  id: string,
) => nodes.find((n) => n.id === id) as T | undefined;

export const getConnectedTargetIds = (edges: Edge[], sourceId: string) =>
  edges.filter((e) => e.source === sourceId).map((e) => e.target);

/** Extract meta-fields from a node's data, if present */
export const extractMeta = (node: RFAnyNode | undefined): MetaField[] => {
  if (!node) return [];
  const meta = (node.data as Record<string, unknown>)?.meta;
  if (!Array.isArray(meta)) return [];
  return meta as MetaField[];
};

/**
 * Return a new Map with the given nodeIds removed.
 * Uses structural sharing — only creates a new Map when something actually changes.
 */
export const removeMetaKeys = (
  map: Map<string, MetaField[]>,
  nodeIds: string[],
): Map<string, MetaField[]> => {
  if (nodeIds.length === 0) return map;
  const next = new Map(map);
  nodeIds.forEach((id) => next.delete(id));
  return next;
};
