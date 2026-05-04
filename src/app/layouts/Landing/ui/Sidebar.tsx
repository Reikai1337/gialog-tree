"use client";

import { cn } from "@shared/lib/utils";
import { ROUTES } from "@shared/routes";
import { Button } from "@shared/ui/button";
import {
  Sidebar as BaseSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@shared/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
  label: string;
  href: string;
};

const LINKS: NavLink[] = [
  {
    label: "Home",
    href: ROUTES.HOME.href,
  },
  {
    label: "EX",
    href: "/example",
  },
  {
    label: "DASHBOARD",
    href: ROUTES.DASHBOARD.href,
  },
  {
    label: "NEW DASHBOARD",
    href: ROUTES.NEW_DASHBOARD.href,
  },
  {
    label: "LOGIN",
    href: ROUTES.LOGIN.href,
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <BaseSidebar>
      <SidebarHeader>SidebarHeader</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {LINKS.map((l) => (
            <Button
              variant="link"
              key={l.label}
              className={cn("justify-start", {
                ["bg-sidebar-border"]: pathname === l.href,
              })}
              asChild
            >
              <Link href={l.href}>{l.label}</Link>
            </Button>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>SidebarFooter</SidebarFooter>
    </BaseSidebar>
  );
};
