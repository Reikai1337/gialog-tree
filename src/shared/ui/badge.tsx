import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@shared/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        // ── shadcn originals ──────────────────────────────────────────────
        default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90",
        outline:
          "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        link: "text-primary underline-offset-4 [a&]:hover:underline",

        // ── color palette ─────────────────────────────────────────────────
        blue: "rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
        green:
          "rounded-md bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
        sky: "rounded-md bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
        purple:
          "rounded-md bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
        red: "rounded-md bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
        orange:
          "rounded-md bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
        yellow:
          "rounded-md bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
        pink: "rounded-md bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean };

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
