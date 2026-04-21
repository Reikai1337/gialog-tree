import { ThemeSelect } from "@entities/theme";
import { Button } from "@shared/ui/button";
import { Layout } from "@shared/ui/layout";
import { SidebarProvider, SidebarTrigger } from "@shared/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { Sidebar } from "./Sidebar";

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
            <Button asChild variant="ghost" className="p-1">
              <Link href="/">
                <Image
                  className="rounded-sm"
                  src="/amazon-logo-amazon-icon-free-free-vector.jpg"
                  alt="logo"
                  width={70}
                  height={30}
                />
              </Link>
            </Button>
            <ThemeSelect />
          </>
        }
        // renderFooter={<div>Landing Footer</div>}
      >
        <Sidebar />
        <main>{children}</main>
      </Layout>
    </SidebarProvider>
  );
};
