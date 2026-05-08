import { type Edge } from "@xyflow/react";
import { createStore } from "zustand/vanilla";
import type {
  RFAnyNode,
  RFSpeechNode,
  RFOutcomeNode,
} from "@entities/dialog-tree";
import {
  findRootSpeech,
  findSpeechAfterOutcome,
  extractMeta,
  getConnectedTargetIds,
  getNodeById,
  removeMetaKeys,
} from "../lib";

// ─── Types ───────────────────────────────────────────────────────────────────

export type MetaField = {
  id: string;
  title: string;
  value?: string;
};

type HistoryEntry = {
  speechId: string;
  outcomeId: string | null;
  /** nodeIds whose meta-fields were added with this step */
  metaNodeIds: string[];
};

export type RuntimeState = {
  nodes: RFAnyNode[];
  edges: Edge[];
  activeSpeechId: string | null;
  history: HistoryEntry[];
  /**
   * Accumulated meta-fields keyed by the node that introduced them.
   * Preserved as a Map so insertion order = collection order.
   */
  metaFields: Map<string, MetaField[]>;
};

export type RuntimeActions = {
  start: () => void;
  pickOutcome: (outcomeId: string) => void;
  goBack: () => void;
  canGoBack: () => boolean;
  getActiveSpeech: () => RFSpeechNode | null;
  getSpeechOutcomes: (speechId: string) => RFOutcomeNode[];
  /** Flat list of all currently collected meta-fields (in collection order) */
  getMetaFields: () => MetaField[];
  /** Update the stored value for a specific meta-field */
  setMetaFieldValue: (nodeId: string, fieldId: string, value: string) => void;
};

export type RuntimeStore = RuntimeState & RuntimeActions;

// ─── Store ───────────────────────────────────────────────────────────────────

export const createRuntimeStore = (
  initState: Pick<RuntimeState, "nodes" | "edges">,
) =>
  createStore<RuntimeStore>()((set, get) => ({
    ...initState,
    activeSpeechId: null,
    history: [],
    metaFields: new Map(),

    start: () => {
      const { nodes, edges } = get();
      const root = findRootSpeech(nodes, edges);
      if (!root) {
        set({ activeSpeechId: null, history: [], metaFields: new Map() });
        return;
      }

      const rootMeta = extractMeta(root);
      const metaFields = new Map<string, MetaField[]>();
      if (rootMeta.length) metaFields.set(root.id, rootMeta);

      set({
        activeSpeechId: root.id,
        history: [
          {
            speechId: root.id,
            outcomeId: null,
            metaNodeIds: rootMeta.length ? [root.id] : [],
          },
        ],
        metaFields,
      });
    },

    pickOutcome: (outcomeId) => {
      const { nodes, edges, activeSpeechId, history, metaFields } = get();
      if (!activeSpeechId) return;

      const outcomeNode = getNodeById(nodes, outcomeId);
      const nextSpeech = findSpeechAfterOutcome(outcomeId, nodes, edges);

      // Collect meta-fields from the outcome and the next speech node
      const addedNodeIds: string[] = [];
      const updatedMeta = new Map(metaFields);

      const outcomeMeta = extractMeta(outcomeNode);
      if (outcomeMeta.length) {
        updatedMeta.set(outcomeId, outcomeMeta);
        addedNodeIds.push(outcomeId);
      }

      if (nextSpeech) {
        const speechMeta = extractMeta(nextSpeech);
        if (speechMeta.length) {
          updatedMeta.set(nextSpeech.id, speechMeta);
          addedNodeIds.push(nextSpeech.id);
        }
      }

      set({
        activeSpeechId: nextSpeech?.id ?? activeSpeechId,
        history: [
          ...history,
          {
            speechId: nextSpeech?.id ?? activeSpeechId,
            outcomeId,
            metaNodeIds: addedNodeIds,
          },
        ],
        metaFields: updatedMeta,
      });
    },

    canGoBack: () => get().history.length > 1,

    goBack: () => {
      const { history, metaFields } = get();
      if (history.length <= 1) return;

      const leaving = history[history.length - 1];
      const prev = history[history.length - 2];

      set({
        activeSpeechId: prev.speechId,
        history: history.slice(0, -1),
        metaFields: removeMetaKeys(metaFields, leaving.metaNodeIds),
      });
    },

    getActiveSpeech: () => {
      const { nodes, activeSpeechId } = get();
      if (!activeSpeechId) return null;
      return getNodeById<RFSpeechNode>(nodes, activeSpeechId) ?? null;
    },

    getSpeechOutcomes: (speechId) => {
      const { nodes, edges } = get();
      const targetIds = getConnectedTargetIds(edges, speechId);
      return nodes.filter(
        (n) => n.type === "outcome" && targetIds.includes(n.id),
      ) as RFOutcomeNode[];
    },

    getMetaFields: () => {
      const { metaFields } = get();
      return Array.from(metaFields.values()).flat();
    },

    setMetaFieldValue: (nodeId, fieldId, value) => {
      const { metaFields } = get();
      const fields = metaFields.get(nodeId);
      if (!fields) return;

      const updated = fields.map((f) =>
        f.id === fieldId ? { ...f, value } : f,
      );
      set({ metaFields: new Map(metaFields).set(nodeId, updated) });
    },
  }));
