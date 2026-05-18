"use client";

import { useEffect, useState } from "react";
import { MoreHorizontalIcon, Plus } from "lucide-react";
import { Button } from "@shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shared/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/ui/table";
import { ScrollArea } from "@shared/ui/scroll-area";
import { PublishBadge, type Scenario } from "@entities/dialog-tree";
import Link from "next/link";
import { ADMIN_ROUTES } from "@shared/routes";
import { DeleteButton } from "./DeleteButton";
import { getScenarios } from "@shared/firebase/scenarios";
import { timeAgo } from "@shared/lib/utils/date";

export const ScenariosTable = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getScenarios();
      if (res.ok) setScenarios(res.data);
    };

    fetch();
  }, []);

  const handleDelete = (id: string) => {
    setScenarios((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <ScrollArea className="h-full w-full overflow-y-auto rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="flex justify-end gap-2 text-right items-center">
              Actions
              <Button variant={"outline"} size="icon-sm" asChild>
                <Link href={ADMIN_ROUTES.SCENARIOS_CREATE.href}>
                  <Plus />
                </Link>
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scenarios.map((s) => (
            <TableRow key={s.id}>
              <TableCell className="font-medium">{s.title}</TableCell>
              <TableCell>
                <PublishBadge isPublished={s.isPublished} />
              </TableCell>
              <TableCell>{timeAgo(s.updatedAt)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={ADMIN_ROUTES.SCENARIOS_EDIT.href(s.id)}>
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DeleteButton scenario={s} onDeleted={handleDelete} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
