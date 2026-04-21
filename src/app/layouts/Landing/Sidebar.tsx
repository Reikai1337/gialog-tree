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
    label: "STUDIO",
    href: ROUTES.STUDIO.href,
  },
  {
    label: "Fantasy",
    href: ROUTES.GENRE.href("fantasy"),
  },
  {
    label: "Horror",
    href: ROUTES.GENRE.href("horror"),
  },
  {
    label: "SSG",
    href: ROUTES.SERVER_RENDER.href("ssg"),
  },
  {
    label: "SSR",
    href: ROUTES.SERVER_RENDER.href("ssr"),
  },
  {
    label: "ISR",
    href: ROUTES.SERVER_RENDER.href("isr"),
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
