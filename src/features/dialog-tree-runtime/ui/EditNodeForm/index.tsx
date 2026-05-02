import {
  ScenarioNodeSchema,
  type ScenarioNodeType,
  QuestionNodeSchema,
  type QuestionNodeType,
  AnswerNodeSchema,
  type AnswerNodeType,
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

const SCENARIO_COLOR_OPTIONS: SelectFieldOption<ScenarioNodeType["color"]>[] = [
  { value: "default", label: "Default" },
  { value: "purple", label: "Purple" },
  { value: "green", label: "Green" },
  { value: "amber", label: "Amber" },
  { value: "red", label: "Red" },
];

const SCENARIO_INTERNAL_DEFAULTS: ScenarioNodeType = {
  type: "scenario",
  color: "purple",
  title: "",
  description: "",
  meta: [],
};

const ScenarioNodeForm = ({
  onSubmit,
  defaults,
}: FormProps<ScenarioNodeType>) => {
  return (
    <Form
      schema={ScenarioNodeSchema}
      defaults={defaults || SCENARIO_INTERNAL_DEFAULTS}
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
    >
      <TextField<ScenarioNodeType>
        name="title"
        label="Title"
        placeholder="Greeting"
      />

      <TextareaField<ScenarioNodeType>
        name="description"
        label="Description"
        placeholder="Good afternoon! My name is Sanya, I am a representative of the online project ‘Phoenix’"
        rows={3}
        className="max-h-60"
      />

      <SelectField<ScenarioNodeType, ScenarioNodeType["color"]>
        name="color"
        label="Color"
        options={SCENARIO_COLOR_OPTIONS}
      />

      <NodeMetaField />

      <SubmitButton>Save</SubmitButton>
    </Form>
  );
};

const QUESTION_INTERNAL_DEFAULTS: QuestionNodeType = {
  type: "question",
  title: "",
  description: "",
  meta: [],
};

const QuestionNodeForm = ({
  onSubmit,
  defaults,
}: FormProps<QuestionNodeType>) => {
  return (
    <Form
      schema={QuestionNodeSchema}
      defaults={defaults || QUESTION_INTERNAL_DEFAULTS}
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
    >
      <TextField<QuestionNodeType>
        name="title"
        label="Title"
        placeholder="Where did you play?"
      />

      <TextareaField<QuestionNodeType>
        name="description"
        label="Description"
        placeholder="Ask about your favorite slots"
        rows={3}
        className="max-h-60"
      />

      <NodeMetaField />

      <SubmitButton>Save</SubmitButton>
    </Form>
  );
};

const ANSWER_INTERNAL_DEFAULTS: AnswerNodeType = {
  type: "answer",
  title: "",
  description: "",
  meta: [],
};

const AnswerNodeForm = ({ onSubmit, defaults }: FormProps<AnswerNodeType>) => {
  return (
    <Form
      schema={AnswerNodeSchema}
      defaults={defaults || ANSWER_INTERNAL_DEFAULTS}
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
    >
      <TextField<AnswerNodeType>
        name="title"
        label="Title"
        placeholder="Played at our casinos"
      />

      <TextareaField<AnswerNodeType>
        name="description"
        label="Description"
        placeholder="Find out what he liked."
        rows={3}
        className="max-h-60"
      />

      <NodeMetaField />

      <SubmitButton>Save</SubmitButton>
    </Form>
  );
};

export const EDIT_NODE_FORM = {
  scenario: ScenarioNodeForm,
  answer: AnswerNodeForm,
  question: QuestionNodeForm,
} as const;
