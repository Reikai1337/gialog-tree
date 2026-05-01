/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  useForm,
  type UseFormReturn,
  type DefaultValues,
  type FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createContext, useContext, type Context } from "react";

const FormContext = createContext<UseFormReturn<FieldValues>>(null!);

export const useFormCtx = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>() =>
  useContext(
    FormContext as Context<
      UseFormReturn<TFieldValues, TContext, TTransformedValues>
    >,
  );

interface FormProps<T> {
  schema: T;
  defaults?: DefaultValues<z.infer<T>>;
  onSubmit: (data: z.infer<T>) => void;
  children: React.ReactNode;
  className?: string;
}

export function Form<T extends FieldValues>({
  schema,
  defaults,
  onSubmit,
  children,
  className,
}: FormProps<T>) {
  const form = useForm<z.infer<T>>({
    // @ts-ignore
    resolver: zodResolver(schema),
    defaultValues: defaults,
    mode: "onChange",
  });

  return (
    // @ts-ignore
    <FormContext.Provider value={form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormContext.Provider>
  );
}
