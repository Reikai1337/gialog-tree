import type { UserAccess } from "@shared/firebase/user-access";
import { Button } from "@shared/ui/button";
import { Toggle } from "@shared/ui/toggle";
import type {
  CellContext,
  ColumnDef,
  HeaderContext,
} from "@tanstack/react-table";
import { ArrowUpDown, Check, OctagonX } from "lucide-react";
import { useUsersTableStore } from "../providers";

export const COLUMNS: ColumnDef<UserAccess>[] = [
  {
    accessorKey: "hasAccess",
    cell: AccessToggleCell,
    // header: "AccessHeaderCell",
    header: AccessHeaderCell,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "displayName",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date: Date = row.getValue("createdAt");

      // return date;
      return new Intl.DateTimeFormat("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date); // → 10.05.2026
    },
  },
];

function AccessToggleCell({ row }: CellContext<UserAccess, unknown>) {
  const hasAccess: boolean = row.getValue("hasAccess");

  return (
    <Toggle size="sm">
      {hasAccess ? (
        <Check className="text-green-500" />
      ) : (
        <OctagonX className="text-orange-500" />
      )}
    </Toggle>
  );
}

function AccessHeaderCell({}: HeaderContext<UserAccess, unknown>) {
  const isActive = useUsersTableStore((s) => s.accessSort === "desc");
  const setAccessSort = useUsersTableStore((s) => s.setAccessSort);

  return (
    <div className="flex gap-2 items-center justify-between">
      <span>Access</span>
      <Button
        className={isActive ? "text-green-500" : "text-gray-500"}
        variant="ghost"
        size="icon-sm"
        onClick={() => setAccessSort(isActive ? "asc" : "desc")}
      >
        <ArrowUpDown />
      </Button>
    </div>
  );
}
