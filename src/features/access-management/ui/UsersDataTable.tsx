"use client";

import { useUsersTableStore } from "../providers";
import { DataTable } from "./DataTable";
import { COLUMNS } from "./columns";
import { useEffect, type PropsWithChildren } from "react";
import { ScrollArea } from "@shared/ui/scroll-area";
import { cn } from "@shared/lib/utils";
import { Spinner } from "@shared/ui/spinner";

export const UsersDataTable = () => {
  const users = useUsersTableStore((s) => s.users);
  const fetchFirstPage = useUsersTableStore((s) => s.fetchFirstPage);

  useEffect(() => {
    fetchFirstPage();
  }, []);

  return (
    <LoadingOverlay>
      <DataTable columns={COLUMNS} data={users} />
    </LoadingOverlay>
  );
};

function LoadingOverlay({ children }: PropsWithChildren) {
  const isLoading = useUsersTableStore((s) => s.isLoading);
  const modifiers = {
    "opacity-50 pointer-events-none": isLoading,
  };

  return (
    <ScrollArea
      className={cn("p-2 overflow-auto rounded-md border", modifiers)}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 z-10 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {children}
    </ScrollArea>
  );
}
