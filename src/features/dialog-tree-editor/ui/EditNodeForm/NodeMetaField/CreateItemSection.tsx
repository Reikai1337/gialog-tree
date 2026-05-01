import { Button } from "@shared/ui/button";
import { Field } from "@shared/ui/field";
import { Input } from "@shared/ui/input";
import { useState } from "react";

type Props = {
  onCreate: (title: string) => void;
};

export const CreateItemSection = ({ onCreate }: Props) => {
  const [title, setTitle] = useState("");

  const handleCreate = () => {
    if (!title.trim()) return;
    onCreate(title);
    setTitle("");
  };

  return (
    <Field orientation="horizontal">
      <Input
        placeholder="Favorite slots"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button disabled={!title} type="button" onClick={handleCreate} size="sm">
        Add
      </Button>
    </Field>
  );
};
