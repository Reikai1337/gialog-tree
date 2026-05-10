import { ThemeSelect } from "@entities/theme";
import { Button } from "@shared/ui/button";
import { Layout } from "@shared/ui/layout";
import { SidebarProvider, SidebarTrigger } from "@shared/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { Sidebar } from "./ui/Sidebar";
import { UserDropdownMenu } from "./ui/UserDropdownMenu";

type Props = {
  children?: React.ReactNode;
};

export const LandingLayout: React.FC<Props> = ({ children }) => {
  return (
    <SidebarProvider>
      <Layout
        headerClassName="justify-between"
        renderHeader={
          <>
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <ThemeSelect />
              <UserDropdownMenu />
            </div>
          </>
        }
      >
        <Sidebar />
        {children}
      </Layout>
    </SidebarProvider>
  );
};
