import { ThemeSelect } from "@entities/theme";
import { Layout } from "@shared/ui/layout";
import { SidebarProvider } from "@shared/ui/sidebar";
import { Sidebar } from "./ui/Sidebar";
import { UserDropdownMenu } from "./ui/UserDropdownMenu";
import { SidebarTrigger } from "./ui/SidebarTrigger";

type Props = {
  children?: React.ReactNode;
};

export const LandingLayout: React.FC<Props> = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <Layout
        headerClassName="justify-between"
        renderHeader={
          <>
            <SidebarTrigger />
            <UserDropdownMenu />
          </>
        }
      >
        <Sidebar />
        {children}
      </Layout>
    </SidebarProvider>
  );
};
