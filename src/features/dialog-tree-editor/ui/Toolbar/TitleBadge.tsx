import { Badge } from "@shared/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@shared/ui/dialog";
import {
  Form as BaseForm,
  TextField,
  SubmitButton,
} from "@shared/components/form";
import { useEditorStore } from "../../providers/EditorStoreProvider";
import { ScenarioSchema, type Scenario } from "@entities/dialog-tree";
import { useState } from "react";

const ScenarioTitleSchema = ScenarioSchema.pick({ title: true });
type FromData = Pick<Scenario, "title">;

export const TitleBadge = () => {
  const title = useEditorStore((s) => s.title);
  const setTitle = useEditorStore((s) => s.setTitle);
  const [open, setOpen] = useState(false);

  const handleSubmit = (newTitle: string) => {
    setTitle(newTitle);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Badge className="text-md cursor-pointer md:text-sm">{title}</Badge>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit title</DialogTitle>
        </DialogHeader>
        <From initialTitle={title} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  onSubmit: (title: string) => void;
  initialTitle: string;
};

function From({ onSubmit, initialTitle }: Props) {
  return (
    <BaseForm
      schema={ScenarioTitleSchema}
      defaults={{ title: initialTitle }}
      onSubmit={({ title }) => onSubmit(title)}
      className="flex flex-col gap-4"
    >
      <TextField<FromData> name="title" label="Title" />

      <SubmitButton>Save</SubmitButton>
    </BaseForm>
  );
}
