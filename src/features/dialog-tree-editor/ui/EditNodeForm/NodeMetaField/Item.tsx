import { Item, ItemActions, ItemContent, ItemTitle } from "@shared/ui/item";
import type { NodeMeta } from "@entities/dialog-tree";
import {
  useForm,
  useWatch,
  type Control,
  type UseFieldArrayRemove,
  type UseFieldArrayUpdate,
} from "react-hook-form";
import { Button } from "@shared/ui/button";
import { Edit, Trash } from "lucide-react";
import type { NodeWithMeta } from ".";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import { Field } from "@shared/ui/field";
import { Label } from "@shared/ui/label";
import { Input } from "@shared/ui/input";
import { useState } from "react";

type Props = {
  update: UseFieldArrayUpdate<NodeWithMeta, "meta">;
  remove: UseFieldArrayRemove;
  index: number;
  item: NodeMeta;
  control: Control<NodeWithMeta, any, NodeWithMeta>;
};

const Title = ({ control, index }: Pick<Props, "control" | "index">) => {
  const data = useWatch({
    control,
    name: `meta.${index}`,
  });
  return <ItemTitle>{data?.title}</ItemTitle>;
};

export const MetaItem = ({ control, index, update, remove, item }: Props) => {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: item,
  });

  const handleSave = handleSubmit((data) => {
    update(index, data);
    setOpen(false);
  });

  const handleDelete = () => {
    remove(index);
    setOpen(false);
  };

  return (
    <Item className="p-1.5" variant="muted" size="sm">
      <ItemContent>
        <Title control={control} index={index} />
      </ItemContent>
      <ItemActions>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button type="button" size="icon-xs" variant="outline">
              <Edit />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Edit name</DialogTitle>
            </DialogHeader>
            <Field>
              <Label htmlFor="username-1">Name</Label>
              <Input {...register(`title`, { required: true })} />
            </Field>
            <DialogFooter className="grid grid-cols-[min-content_1fr]">
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
              >
                <Trash />
              </Button>
              <Button onClick={handleSave} type="button">
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ItemActions>
    </Item>
  );
};
