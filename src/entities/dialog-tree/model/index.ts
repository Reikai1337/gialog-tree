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

const AnswerNodeColorKeySchema = z.enum([
  "green",
  "amber",
  "red",
  "purple",
  "default",
]);

export const AnswerNodeSchema = z.object({
  type: z.literal("answer"),
  text: z.string().min(1, "Required").max(100, "Too long"),
  hint: z.string().max(500, "Too long"),
  color: AnswerNodeColorKeySchema,

  meta: z.array(NodeMetaSchema),
});

export type NodeMeta = z.infer<typeof NodeMetaSchema>;

export type AnswerNodeColor = z.infer<typeof AnswerNodeColorKeySchema>;
export type AnswerNode = z.infer<typeof AnswerNodeSchema>;
export type SpeechNode = z.infer<typeof SpeechNodeSchema>;

export type AnyNode = SpeechNode | AnswerNode;
export type AnyNodeType = AnyNode["type"];

export type RFAnswerNode = Node<AnswerNode, AnswerNode["type"]>;
export type RFSpeechNode = Node<SpeechNode, SpeechNode["type"]>;

export type RFAnyNode = RFAnswerNode | RFSpeechNode;
