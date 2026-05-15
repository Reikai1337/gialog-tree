"use client";

import { Sidebar as BaseSidebar, SidebarContent } from "@shared/ui/sidebar";
import { AdminRoutesGroup } from "./AdminRoutesGroup";
import { ScenariosRoutesGroup } from "./ScenariosRoutesGroup";
import { SidebarTrigger } from "./SidebarTrigger";

export const Sidebar = () => {
  return (
    <BaseSidebar>
      <SidebarTrigger className="absolute right-4 top-2 z-10" />
      <SidebarContent>
        <AdminRoutesGroup />
        <ScenariosRoutesGroup />
      </SidebarContent>
    </BaseSidebar>
  );
};
