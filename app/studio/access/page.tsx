import { DataTable } from "@features/access-management";
import { UsersTableProvider } from "@features/access-management/providers";
import { UsersTable } from "@features/access-management/ui/UsersTable";

export const AccessPage = async () => {
  return (
    <div className="container mx-auto py-10">
      <UsersTableProvider initState={{ pageLimit: 20 }}>
        <UsersTable />
      </UsersTableProvider>
    </div>
  );
};

export default AccessPage;
