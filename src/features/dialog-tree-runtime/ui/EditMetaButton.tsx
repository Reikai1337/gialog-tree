"use client";

import { useMemo } from "react";
import { useRuntimeStore } from "../providers/RuntimeStoreProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { Form } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "@shared/ui/field";
import { CopyBadge } from "@shared/components/CopyBagde";

export const EditMetaButton = () => {
  const metaFields = useRuntimeStore((s) => s.metaFields);
  const setMetaFieldValue = useRuntimeStore((s) => s.setMetaFieldValue);

  const { flatMetaFields, hasEmpty } = useMemo(() => {
    const flatMetaFields = Array.from(metaFields.entries()).flatMap(
      ([nodeId, fields]) => fields.map((field) => ({ ...field, nodeId })),
    );
    const hasEmpty = flatMetaFields.some((f) => !f.value?.trim());

    return { flatMetaFields, hasEmpty };
  }, [metaFields]);

  if (flatMetaFields.length === 0) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant={hasEmpty ? "destructive" : "outline"}>
          <Form />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto md:max-w-md">
        <DialogHeader>
          <DialogTitle>The current path contains metadata</DialogTitle>
        </DialogHeader>
        <FieldGroup className="flex flex-col gap-4 pt-2">
          {flatMetaFields.map(({ nodeId, id, title, value }) => (
            <Field key={`${nodeId}-${id}`}>
              <FieldLabel htmlFor={`meta-${nodeId}-${id}`}>
                {title}
                <CopyBadge value={value || ""} className="ml-auto" />
              </FieldLabel>
              <Input
                id={`meta-${nodeId}-${id}`}
                value={value ?? ""}
                onChange={(e) => setMetaFieldValue(nodeId, id, e.target.value)}
                placeholder={`Enter ${title.toLowerCase()}…`}
              />
            </Field>
          ))}
        </FieldGroup>
      </DialogContent>
    </Dialog>
  );
};
