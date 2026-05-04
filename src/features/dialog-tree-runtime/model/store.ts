import { type Edge } from "@xyflow/react";
import { createStore } from "zustand/vanilla";
import type {
  RFAnyNode,
  RFSpeechNode,
  RFAnswerNode,
} from "@entities/dialog-tree";
import {
  findRootSpeech,
  findSpeechAfterAnswer,
  getChoicesForSpeech,
} from "../lib";

// ─── History entry ──────────────────────────────────────────────────────────
type HistoryEntry = {
  speechId: string;
  answerId: string | null; // null for the very first entry (no answer chosen yet)
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

  /** User picks an answer node → find the next speech and advance */
  pickAnswer: (answerId: string) => void;

  /** Go one step back in history */
  goBack: () => void;

  /** Derived helpers */
  getActiveSpeech: () => RFSpeechNode | null;
  getConnectedChoices: (speechID: string) => RFAnyNode[];
};

export type RuntimeStore = RuntimeState & RuntimeActions;

export const createRuntimeStore = (
  initState: Pick<RuntimeState, "nodes" | "edges">,
) => {
  return createStore<RuntimeStore>()((set, get) => ({
    ...initState,
    activeSpeechId: null,
    history: [],

    start: () => {
      const { nodes, edges } = get();
      const root = findRootSpeech(nodes, edges);

      set({
        activeSpeechId: root?.id ?? null,
        history: root ? [{ speechId: root.id, answerId: null }] : [],
      });
    },

    pickAnswer: (answerId) => {
      const { nodes, edges, activeSpeechId, history } = get();
      if (!activeSpeechId) return;

      const nextSpeech = findSpeechAfterAnswer(answerId, nodes, edges);

      // Answer leads to another speech
      if (nextSpeech) {
        set({
          activeSpeechId: nextSpeech.id,
          history: [...history, { speechId: nextSpeech.id, answerId }],
        });
        return;
      }

      // Answer is a dead-end (leaf) — record it but don't advance speech
      set({
        history: [...history, { speechId: activeSpeechId, answerId }],
      });
    },

    goBack: () => {
      const { history } = get();
      if (history.length <= 1) return; // already at root

      const prev = history[history.length - 2];
      set({
        activeSpeechId: prev.speechId,
        history: history.slice(0, -1),
      });
    },

    getActiveSpeech: () => {
      const { nodes, activeSpeechId } = get();
      return (
        (nodes.find((n) => n.id === activeSpeechId) as RFSpeechNode) ?? null
      );
    },

    getConnectedChoices: (speechId) => {
      const { nodes, edges, activeSpeechId } = get();
      if (!activeSpeechId) return [];

      const connectedIds = edges
        .filter((e) => e.source === speechId)
        .map((e) => e.target);

      return nodes.filter((n) => connectedIds.includes(n.id));
    },
  }));
};
