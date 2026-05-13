"use client";

import { useUserStore } from "@entities/user";
import { ADMIN_ROUTES, AUTH_ROUTES, PUBLIC_ROUTES } from "@shared/routes";
import {
  Sidebar as BaseSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@shared/ui/sidebar";
import { GitBranch, MessageCircleMore, ShieldUser } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavLink = {
  label: string;
  href: string;
  icon: ReactNode;
};

export const Sidebar = () => {
  return (
    <BaseSidebar>
      <SidebarContent>
        <AdminRoutesGroup />
        <ScenariosRoutesGroup />
      </SidebarContent>
      <SidebarFooter>SidebarFooter</SidebarFooter>
    </BaseSidebar>
  );
};

const ADMIN_LINKS: NavLink[] = [
  {
    ...ADMIN_ROUTES.SCENARIOS,
    icon: <GitBranch />,
  },
  {
    ...ADMIN_ROUTES.ACCESS_MANAGEMENT,
    icon: <ShieldUser />,
  },
];

function AdminRoutesGroup() {
  const isAdmin = useUserStore((s) => s.isAdmin);
  const pathname = usePathname();

  if (!isAdmin) return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Admin studio</SidebarGroupLabel>
      <SidebarMenu>
        {ADMIN_LINKS?.map((link) => (
          <SidebarMenuItem key={link.href}>
            <SidebarMenuButton asChild isActive={pathname === link.href}>
              <Link href={link.href}>
                {link.icon}
                <span>{link.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

const SCENARIOS_LINKS: NavLink[] = [
  {
    ...AUTH_ROUTES.SPEECH,
    icon: <MessageCircleMore />,
  },
  {
    ...PUBLIC_ROUTES.HOME,
    icon: <ShieldUser />,
  },
  {
    ...PUBLIC_ROUTES.LOGIN,
    icon: <ShieldUser />,
  },
];

function ScenariosRoutesGroup() {
  const user = useUserStore((s) => s.user);
  const pathname = usePathname();

  if (!user) return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Scenarios</SidebarGroupLabel>
      <SidebarMenu>
        {SCENARIOS_LINKS?.map((link) => (
          <SidebarMenuItem key={link.href}>
            <SidebarMenuButton asChild isActive={pathname === link.href}>
              <Link href={link.href}>
                {link.icon}
                <span>{link.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
