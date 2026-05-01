import { Field, FieldGroup, FieldLabel } from "@shared/ui/field";
import { ScrollArea } from "@shared/ui/scroll-area";
import { useFormCtx } from "@shared/components/form";
import { useFieldArray } from "react-hook-form";
import type { NodeMeta } from "@entities/dialog-tree/model";
import { MetaItem } from "./Item";
import { CreateItemSection } from "./CreateItemSection";
import { uuid } from "@shared/lib/utils/uuid";
import { EmptyState } from "./EmptyState";

const KEY_ID_NAME = "keyId";
const METAFIELDS_KEY_NAME = "meta";

export type NodeWithMeta = {
  meta: NodeMeta[];
};

export const NodeMetaField = () => {
  const { control } = useFormCtx<NodeWithMeta>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: METAFIELDS_KEY_NAME,
    keyName: KEY_ID_NAME,
  });

  return (
    <FieldGroup className="gap-3">
      <Field>
        <FieldLabel>Meta data</FieldLabel>
        <CreateItemSection
          onCreate={(title) => {
            append({ id: uuid(), title });
          }}
        />
      </Field>

      <Field>
        {fields.length ? (
          <ScrollArea className="h-40 rounded-lg border">
            <div className="flex p-2 gap-2 flex-col-reverse">
              {fields.map((item, i) => (
                <MetaItem
                  key={item.keyId}
                  control={control}
                  update={update}
                  remove={remove}
                  index={i}
                  item={item}
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <EmptyState />
        )}
      </Field>
    </FieldGroup>
  );
};
