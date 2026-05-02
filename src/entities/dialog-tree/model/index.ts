import * as z from "zod";

const NodeMetaSchema = z.object({
  id: z.string(),
  title: z.string(),
});

export const QuestionNodeSchema = z.object({
  type: z.literal("question"),
  title: z.string().min(1, "Required").max(100, "Too long"),
  description: z.string().max(500, "Too long"),

  meta: z.array(NodeMetaSchema),
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

const ScenarioNodeColorKeySchema = z.enum([
  "green",
  "amber",
  "red",
  "purple",
  "default",
]);
export const ScenarioNodeSchema = z.object({
  type: z.literal("scenario"),
  title: z.string().min(1, "Required").max(100, "Too long"),
  description: z.string().max(500, "Too long"),

  color: ScenarioNodeColorKeySchema,
  meta: z.array(NodeMetaSchema),
});

export type NodeMeta = z.infer<typeof NodeMetaSchema>;

export type QuestionNode = z.infer<typeof QuestionNodeSchema>;
export type AnswerNodeColor = z.infer<typeof AnswerNodeColorKeySchema>;
export type AnswerNode = z.infer<typeof AnswerNodeSchema>;
export type ScenarioNodeColor = z.infer<typeof ScenarioNodeColorKeySchema>;
export type ScenarioNode = z.infer<typeof ScenarioNodeSchema>;
export type SpeechNode = z.infer<typeof SpeechNodeSchema>;

export type AnyNode = SpeechNode | AnswerNode;
export type AnyNodeType = (SpeechNode | AnswerNode)["type"];
