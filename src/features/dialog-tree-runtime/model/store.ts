import { type Edge } from "@xyflow/react";
import { createStore } from "zustand/vanilla";
import type {
  RFAnyNode,
  RFSpeechNode,
  RFOutcomeNode,
} from "@entities/dialog-tree";
import { findRootSpeech, findSpeechAfterOutcome } from "../lib";

// ─── Types ───────────────────────────────────────────────────────────────────

type HistoryEntry = {
  speechId: string;
  outcomeId: string | null;
};

export type RuntimeState = {
  nodes: RFAnyNode[];
  edges: Edge[];
  activeSpeechId: string | null;
  history: HistoryEntry[];
};

export type RuntimeActions = {
  /** Start or restart the dialog from scratch */
  start: () => void;
  /** User picks an Outcome node → find the next speech and advance */
  pickOutcome: (outcomeId: string) => void;
  /** Go one step back in history */
  goBack: () => void;
  /** Whether goBack() can be called */
  canGoBack: () => boolean;
  /** Get the currently active Speech node */
  getActiveSpeech: () => RFSpeechNode | null;
  /** Get all Outcome nodes connected to a given Speech */
  getSpeechOutcomes: (speechId: string) => RFOutcomeNode[];
};

export type RuntimeStore = RuntimeState & RuntimeActions;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getNodeById = <T extends RFAnyNode>(nodes: RFAnyNode[], id: string) =>
  nodes.find((n) => n.id === id) as T | undefined;

const getConnectedTargetIds = (edges: Edge[], sourceId: string) =>
  edges.filter((e) => e.source === sourceId).map((e) => e.target);

// ─── Store ───────────────────────────────────────────────────────────────────

export const createRuntimeStore = (
  initState: Pick<RuntimeState, "nodes" | "edges">,
) =>
  createStore<RuntimeStore>()((set, get) => ({
    ...initState,
    activeSpeechId: null,
    history: [],

    start: () => {
      const { nodes, edges } = get();
      const root = findRootSpeech(nodes, edges);

      set({
        activeSpeechId: root?.id ?? null,
        history: root ? [{ speechId: root.id, outcomeId: null }] : [],
      });
    },

    pickOutcome: (outcomeId) => {
      const { nodes, edges, activeSpeechId, history } = get();
      if (!activeSpeechId) return;

      const nextSpeech = findSpeechAfterOutcome(outcomeId, nodes, edges);

      set({
        activeSpeechId: nextSpeech?.id ?? activeSpeechId,
        history: [
          ...history,
          {
            speechId: nextSpeech?.id ?? activeSpeechId,
            outcomeId,
          },
        ],
      });
    },

    canGoBack: () => get().history.length > 1,

    goBack: () => {
      const { history } = get();
      if (history.length <= 1) return;

      const prev = history[history.length - 2];
      set({
        activeSpeechId: prev.speechId,
        history: history.slice(0, -1),
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
  }));
