// // page.tsx
// export  function UsersPage() {
//   return (
//     <UsersTableProvider initState={{ pageLimit: 20 }}>
//       <UsersTable />
//     </UsersTableProvider>
//   );
// }
"use client";

import { useEffect } from "react";
import { useUsersTableStore } from "../providers";
import { Input } from "@shared/ui/input";
import { DataTable } from "./DataTable";
import { Button } from "@shared/ui/button";
import type { UserAccess } from "@shared/firebase/user-access";
import {
  type CellContext,
  type ColumnDef,
  type Row,
} from "@tanstack/react-table";
import { Toggle } from "@shared/ui/toggle";
import { ArrowUpDown, BookmarkIcon, Check, OctagonX } from "lucide-react";
import { TEST_U } from "./d";
import { SearchInput } from "./SearchInput";
import { Pagination } from "./Pagination";
import { COLUMNS } from "./columns";

export const UsersTable = () => {
  const users = useUsersTableStore((s) => s.users);
  // const users = TEST_U;
  // const isLoading = useUsersTableStore((s) => s.isLoading);
  // const fetchUsers = useUsersTableStore((s) => s.fetchFirstPage);
  // const setSearch = useUsersTableStore((s) => s.setSearch);
  // const fetchNextPage = useUsersTableStore((s) => s.fetchNextPage);

  console.log("users", users);

  // useEffect(() => {
  //   fetchUsers();
  // }, [fetchUsers]);

  return (
    <div className="flex flex-col gap-2 p-3">
      <SearchInput />
      <DataTable columns={COLUMNS} data={users} />
      <Pagination />
    </div>
  );
};
