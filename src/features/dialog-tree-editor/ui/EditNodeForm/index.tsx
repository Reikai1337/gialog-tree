import {
  OutcomeNodeSchema,
  type OutcomeNodeData,
  SpeechNodeSchema,
  type SpeechNodeData,
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

const OUTCOME_COLOR_OPTIONS: SelectFieldOption<OutcomeNodeData["color"]>[] = [
  { value: "default", label: "Default" },
  { value: "purple", label: "Purple" },
  { value: "green", label: "Green" },
  { value: "amber", label: "Amber" },
  { value: "red", label: "Red" },
];

const OUTCOME_INTERNAL_DEFAULTS: OutcomeNodeData = {
  type: "outcome",
  text: "",
  hint: "",
  color: "default",
  meta: [],
};

const OutcomeNodeForm = ({
  onSubmit,
  defaults,
}: FormProps<OutcomeNodeData>) => {
  return (
    <Form
      schema={OutcomeNodeSchema}
      defaults={defaults || OUTCOME_INTERNAL_DEFAULTS}
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
    >
      <TextField<OutcomeNodeData>
        name="text"
        label="Text"
        placeholder="Not now, im busy"
      />
      <TextField<OutcomeNodeData>
        name="hint"
        label="Hint"
        placeholder="Try to persuade"
      />

      <SelectField<OutcomeNodeData, OutcomeNodeData["color"]>
        name="color"
        label="Color"
        options={OUTCOME_COLOR_OPTIONS}
      />

      <NodeMetaField />

      <SubmitButton>Save</SubmitButton>
    </Form>
  );
};

const SPEECH_INTERNAL_DEFAULTS: SpeechNodeData = {
  type: "speech",
  hint: "",
  text: "",
  meta: [],
};

const SpeechNodeForm = ({ onSubmit, defaults }: FormProps<SpeechNodeData>) => {
  return (
    <Form
      schema={SpeechNodeSchema}
      defaults={defaults || SPEECH_INTERNAL_DEFAULTS}
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
    >
      <TextareaField<SpeechNodeData>
        name="text"
        label="What needs to be said"
        placeholder="Hello, what about some money?"
        className="max-h-60"
      />

      <TextField<SpeechNodeData>
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
  outcome: OutcomeNodeForm,
  speech: SpeechNodeForm,
} as const;
