import type { Node } from "@xyflow/react";
import * as z from "zod";

const NodeMetaSchema = z.object({
  id: z.string(),
  title: z.string(),
});

export const SpeechNodeSchema = z.object({
  type: z.literal("speech"),
  text: z.string().min(1, "Required").max(1000, "Too long"),
  hint: z.string().max(500, "Too long"),

  meta: z.array(NodeMetaSchema),
});

const OutcomeNodeColorKeySchema = z.enum([
  "green",
  "amber",
  "red",
  "purple",
  "default",
]);

export const OutcomeNodeSchema = z.object({
  type: z.literal("outcome"),
  text: z.string().min(1, "Required").max(100, "Too long"),
  hint: z.string().max(500, "Too long"),
  color: OutcomeNodeColorKeySchema,

  meta: z.array(NodeMetaSchema),
});

export type NodeMeta = z.infer<typeof NodeMetaSchema>;

export type OutcomeNodeColor = z.infer<typeof OutcomeNodeColorKeySchema>;
export type OutcomeNode = z.infer<typeof OutcomeNodeSchema>;
export type SpeechNode = z.infer<typeof SpeechNodeSchema>;

export type AnyNode = SpeechNode | OutcomeNode;
export type AnyNodeType = AnyNode["type"];

export type RFOutcomeNode = Node<OutcomeNode, OutcomeNode["type"]>;
export type RFSpeechNode = Node<SpeechNode, SpeechNode["type"]>;

export type RFAnyNode = RFOutcomeNode | RFSpeechNode;
