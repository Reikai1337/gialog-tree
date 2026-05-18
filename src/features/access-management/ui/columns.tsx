import type { User } from "@shared/firebase/users";
import { Button } from "@shared/ui/button";
import type {
  CellContext,
  ColumnDef,
  HeaderContext,
} from "@tanstack/react-table";
import { ArrowUpDown, Check, OctagonX } from "lucide-react";
import { useUsersTableStore } from "../providers";

export const COLUMNS: ColumnDef<User>[] = [
  {
    accessorKey: "hasAccess",
    cell: AccessToggleCell,
    header: AccessHeaderCell,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "displayName",
    header: "Name",
    meta: { className: "hidden sm:table-cell" },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    meta: { className: "hidden sm:table-cell" },
    cell: ({ row }) => {
      const date: string = row.getValue("createdAt");
      return date;
    },
  },
];

function AccessToggleCell({ row }: CellContext<User, unknown>) {
  const hasAccess: boolean = row.getValue("hasAccess");
  const updateUserAccess = useUsersTableStore((s) => s.updateUserAccess);

  return (
    <Button
      variant="outline"
      size="icon"
      className="max-sm:w-fit max-sm:h-fit max-sm:p-0.5"
      onClick={() => updateUserAccess(row.original.id, !hasAccess)}
    >
      {hasAccess ? (
        <Check className="text-green-500" />
      ) : (
        <OctagonX className="text-orange-500" />
      )}
    </Button>
  );
}

function AccessHeaderCell({}: HeaderContext<User, unknown>) {
  const isActive = useUsersTableStore((s) => s.accessSort === "asc");
  const setAccessSort = useUsersTableStore((s) => s.setAccessSort);

  return (
    <div className="flex gap-2 items-center justify-between">
      <span>Access</span>
      <Button
        className={isActive ? "text-orange-500" : "text-green-500"}
        variant="ghost"
        size="icon-sm"
        onClick={() => setAccessSort(isActive ? "desc" : "asc")}
      >
        <ArrowUpDown />
      </Button>
    </div>
  );
}
