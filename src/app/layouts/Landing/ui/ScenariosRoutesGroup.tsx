"use client";

import { useUserStore } from "@entities/user";
import { AUTH_ROUTES, PUBLIC_ROUTES } from "@shared/routes";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@shared/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";
import type { Scenario } from "@entities/dialog-tree";
import { getPublishedScenarios } from "@shared/new-fb/services/scenarios";

export function ScenariosRoutesGroup() {
  const user = useUserStore((s) => s.user);

  if (!user) return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Scenarios</SidebarGroupLabel>
      <SidebarMenu>
        <List />
      </SidebarMenu>
    </SidebarGroup>
  );
}

function List() {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetch = async () => {
      const res = await getPublishedScenarios();
      if (res.ok) setScenarios(res.data);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!scenarios.length) return <div>No scenarios found.</div>;

  return (
    <SidebarMenu>
      {scenarios.map((s) => {
        const href = AUTH_ROUTES.SCENARIOS_USE.href(s.id);
        return (
          <SidebarMenuItem key={s.id}>
            <SidebarMenuButton asChild isActive={pathname === href}>
              <Link href={href}>{s.title}</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
