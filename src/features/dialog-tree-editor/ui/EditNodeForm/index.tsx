import {
  AnswerNodeSchema,
  type AnswerNode,
  SpeechNodeSchema,
  type SpeechNode,
} from "@entities/dialog-tree";
import {
  Form,
  SelectField,
  TextareaField,
  TextField,
  type SelectFieldOption,
  SubmitButton,
} from "@shared/components/form";
import { NodeMetaField } from "./NodeMetaField";

type FormProps<T> = {
  onSubmit: (scenario: T) => void;
  defaults?: T;
};

const ANSWER_COLOR_OPTIONS: SelectFieldOption<AnswerNode["color"]>[] = [
  { value: "default", label: "Default" },
  { value: "purple", label: "Purple" },
  { value: "green", label: "Green" },
  { value: "amber", label: "Amber" },
  { value: "red", label: "Red" },
];

const ANSWER_INTERNAL_DEFAULTS: AnswerNode = {
  type: "answer",
  text: "",
  hint: "",
  color: "default",
  meta: [],
};

const AnswerNodeForm = ({ onSubmit, defaults }: FormProps<AnswerNode>) => {
  return (
    <Form
      schema={AnswerNodeSchema}
      defaults={defaults || ANSWER_INTERNAL_DEFAULTS}
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
    >
      <TextField<AnswerNode>
        name="text"
        label="Text"
        placeholder="Not now, im busy"
      />
      <TextField<AnswerNode>
        name="hint"
        label="Hint"
        placeholder="Try to persuade"
      />

      <SelectField<AnswerNode, AnswerNode["color"]>
        name="color"
        label="Color"
        options={ANSWER_COLOR_OPTIONS}
      />

      <NodeMetaField />

      <SubmitButton>Save</SubmitButton>
    </Form>
  );
};

const SPEECH_INTERNAL_DEFAULTS: SpeechNode = {
  type: "speech",
  hint: "",
  text: "",
  meta: [],
};

const SpeechNodeForm = ({ onSubmit, defaults }: FormProps<SpeechNode>) => {
  return (
    <Form
      schema={SpeechNodeSchema}
      defaults={defaults || SPEECH_INTERNAL_DEFAULTS}
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
    >
      <TextareaField<SpeechNode>
        name="text"
        label="What needs to be said"
        placeholder="Hello, what about some money?"
        className="max-h-60"
      />

      <TextField<SpeechNode>
        name="hint"
        label="Hint"
        placeholder="Don`t forget give coco to client"
      />

      <NodeMetaField />

      <SubmitButton>Save</SubmitButton>
    </Form>
  );
};

export const EDIT_NODE_FORM = {
  answer: AnswerNodeForm,
  speech: SpeechNodeForm,
} as const;
