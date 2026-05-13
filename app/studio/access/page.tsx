import {
  UsersDataTable,
  UsersTableProvider,
  Pagination,
  SearchInput,
} from "@features/access-management";

export const AccessPage = async () => {
  return (
    <main className="p-2 flex-1 min-h-0 grid grid-rows-[auto_1fr] grid-cols-1 gap-2">
      <UsersTableProvider initState={{ pageSize: 20 }}>
        <div className="flex items-center gap-2 justify-between">
          <SearchInput />
          <Pagination />
        </div>
        <UsersDataTable />
      </UsersTableProvider>
    </main>
  );
};

export default AccessPage;
