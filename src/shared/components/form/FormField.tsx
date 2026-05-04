/* eslint-disable @typescript-eslint/ban-ts-comment */
// Типизированные поля — знают схему формы
import { Controller, type Path, useFormState } from "react-hook-form";
import { useFormCtx } from "./Form";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@shared/ui/field";
import { Input } from "@shared/ui/input";
import { Textarea } from "@shared/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@shared/ui/select";
import type { ComponentProps, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import { Button, type buttonVariants } from "@shared/ui/button";

interface BaseFieldProps<T> {
  name: Path<T>;
  label: string;
  description?: string;
  placeholder?: string;
  className?: string;
}

export function TextField<T>({
  name,
  label,
  description,
  placeholder,
  className,
}: BaseFieldProps<T>) {
  const form = useFormCtx();

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          <FieldLabel>{label}</FieldLabel>
          <Input
            {...field}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export function TextareaField<T>({
  name,
  label,
  description,
  placeholder,
  rows = 4,
  className,
}: BaseFieldProps<T> & { rows?: number }) {
  const form = useFormCtx();

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          <FieldLabel>{label}</FieldLabel>
          <Textarea
            {...field}
            placeholder={placeholder}
            rows={rows}
            aria-invalid={fieldState.invalid}
            className="resize-none"
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export type SelectFieldOption<T extends string = string> = {
  value: T;
  label: string;
};

interface SelectFieldProps<
  T,
  V extends string = string,
> extends BaseFieldProps<T> {
  options: SelectFieldOption<V>[];
}
export function SelectField<T, V extends string = string>({
  name,
  label,
  description,
  placeholder,
  options,
  className,
}: SelectFieldProps<T, V>) {
  const form = useFormCtx();

  return (
    <Controller
      name={name}
      // @ts-ignore
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          <FieldLabel>{label}</FieldLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger aria-invalid={fieldState.invalid}>
              <SelectValue placeholder={placeholder ?? "Select..."} />
            </SelectTrigger>
            <SelectContent>
              {options.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

type SubmitButtonProps = Omit<ComponentProps<"button">, "type" | "disabled"> &
  VariantProps<typeof buttonVariants> & {
    children?: ReactNode;
  };

export function SubmitButton({
  children = "Save",
  variant = "default",
  size = "default",
  className,
  ...props
}: SubmitButtonProps) {
  const form = useFormCtx();
  const { isDirty, isValid, isSubmitting } = useFormState({
    control: form.control,
  });

  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      className={className}
      disabled={!isDirty || !isValid || isSubmitting}
      {...props}
    >
      {children}
    </Button>
  );
}
