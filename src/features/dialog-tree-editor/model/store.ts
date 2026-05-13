import {
  type Edge,
  type EdgeChange,
  type NodeChange,
  type Connection,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import { createStore } from "zustand/vanilla";
import {
  ALLOWED_NODE_CONNECTION_MAP,
  type RFAnyNode,
} from "@entities/dialog-tree";

type NodeDataByType<T extends RFAnyNode["type"]> = Extract<
  RFAnyNode,
  { type: T }
>["data"];

export type EditorState = {
  title: string;
  isPublished: boolean;
  nodes: RFAnyNode[];
  edges: Edge[];
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  onSubmitCallback?: (state: Pick<EditorState, "nodes" | "edges">) => void;
};

export type EditorActions = {
  addNode: (node: RFAnyNode) => void;
  updateNodeData: <T extends RFAnyNode["type"]>(
    id: string,
    patch: Partial<NodeDataByType<T>>,
  ) => void;
  deleteNode: (id: string) => void;
  deleteEdge: (id: string) => void;
  deleteSelected: () => void;
  onNodesChange: (changes: NodeChange<RFAnyNode>[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  setSelectedNode: (id: string | null) => void;
  setSelectedEdge: (id: string | null) => void;
  getSelectedNode: () => RFAnyNode | null;
  setTitle: (title: string) => void;
  toggleIsPublished: () => void;
};

export type EditorStore = EditorState & EditorActions;

export const createEditorStore = (
  initState: Omit<EditorState, "onSubmitCallback">,
) => {
  return createStore<EditorStore>()((set, get) => ({
    ...initState,
    selectedNodeId: null,
    selectedEdgeId: null,

    setTitle: (title) => {
      set({ title });
    },
    toggleIsPublished: () => {
      set((s) => ({ isPublished: !s.isPublished }));
    },

    updateNodeData: (id, patch) => {
      set((s) => ({
        nodes: s.nodes.map((n) =>
          n.id === id
            ? ({ ...n, data: { ...n.data, ...patch } } as RFAnyNode)
            : n,
        ),
      }));
    },

    getSelectedNode: () => {
      const { nodes, selectedNodeId } = get();
      return nodes.find((n) => n.id === selectedNodeId) ?? null;
    },

    addNode: (node) => {
      set((s) => ({ nodes: [...s.nodes, node] }));
    },

    deleteNode: (id) => {
      set((s) => ({
        nodes: s.nodes.filter((n) => n.id !== id),
        // Remove all edges connected to this node
        edges: s.edges.filter((e) => e.source !== id && e.target !== id),
        selectedNodeId: s.selectedNodeId === id ? null : s.selectedNodeId,
      }));
    },

    deleteEdge: (id) => {
      set((s) => ({
        edges: s.edges.filter((e) => e.id !== id),
        selectedEdgeId: s.selectedEdgeId === id ? null : s.selectedEdgeId,
      }));
    },

    deleteSelected: () => {
      const { selectedNodeId, selectedEdgeId } = get();
      if (selectedNodeId) get().deleteNode(selectedNodeId);
      else if (selectedEdgeId) get().deleteEdge(selectedEdgeId);
    },

    onNodesChange: (changes) => {
      const selectionChanges = changes.filter((c) => c.type === "select");

      if (selectionChanges.length > 0) {
        const selected = selectionChanges.find(
          (c) => c.type === "select" && c.selected,
        );
        const deselected = selectionChanges.find(
          (c) => c.type === "select" && !c.selected,
        );

        if (selected && selected.type === "select") {
          set({ selectedNodeId: selected.id, selectedEdgeId: null });
        } else if (deselected) {
          set({ selectedNodeId: null });
        }
      }

      set((s) => ({ nodes: applyNodeChanges(changes, s.nodes) }));
    },

    onEdgesChange: (changes) => {
      // Sync selectedEdgeId from ReactFlow selection changes
      const selectionChange = changes.find((c) => c.type === "select");
      if (selectionChange && selectionChange.type === "select") {
        set({
          selectedEdgeId: selectionChange.selected ? selectionChange.id : null,
          selectedNodeId: selectionChange.selected
            ? null
            : get().selectedNodeId,
        });
      }

      set((s) => ({ edges: applyEdgeChanges(changes, s.edges) }));
    },

    onConnect: (connection) => {
      const { nodes, edges } = get();

      const sourceNode = nodes.find((n) => n.id === connection.source);
      const targetNode = nodes.find((n) => n.id === connection.target);

      if (!sourceNode || !targetNode) return;
      if (connection.source === connection.target) return;

      const allowed = ALLOWED_NODE_CONNECTION_MAP[sourceNode.type] ?? [];
      if (!allowed.includes(targetNode.type)) return;

      const alreadyHasOutgoing = edges.some(
        (e) => e.source === connection.source && sourceNode.type === "outcome",
      );
      if (alreadyHasOutgoing) return;

      set((s) => ({ edges: addEdge(connection, s.edges) }));
    },

    setSelectedNode: (id) => {
      set({ selectedNodeId: id, selectedEdgeId: null });
    },

    setSelectedEdge: (id) => {
      set({ selectedEdgeId: id, selectedNodeId: null });
    },
  }));
};
