import type { AnyRFNode } from "@features/dialog-tree-editor/model";
import type { Edge } from "@xyflow/react";

// Найти корневые ноды (у которых нет входящих рёбер)
export const getRootNodes = (nodes: AnyRFNode[], edges: Edge[]) => {
  const targetIds = new Set(edges.map((e) => e.target));
  return nodes.filter((n) => !targetIds.has(n.id));
};

// Следующие ноды от текущей
export const getNextNodes = (
  nodeId: string,
  nodes: AnyRFNode[],
  edges: Edge[],
) => {
  const nextIds = edges.filter((e) => e.source === nodeId).map((e) => e.target);
  return nodes.filter((n) => nextIds.includes(n.id));
};

// Предыдущие ноды
export const getPrevNodes = (
  nodeId: string,
  nodes: AnyRFNode[],
  edges: Edge[],
) => {
  const prevIds = edges.filter((e) => e.target === nodeId).map((e) => e.source);
  return nodes.filter((n) => prevIds.includes(n.id));
};

// Полный путь от ноды до конца (DFS)
export const getPathFrom = (
  nodeId: string,
  nodes: AnyRFNode[],
  edges: Edge[],
  visited = new Set<string>(),
): AnyRFNode[] => {
  if (visited.has(nodeId)) return [];
  visited.add(nodeId);

  const current = nodes.find((n) => n.id === nodeId);
  if (!current) return [];

  const next = getNextNodes(nodeId, nodes, edges);
  return [
    current,
    ...next.flatMap((n) => getPathFrom(n.id, nodes, edges, visited)),
  ];
};
