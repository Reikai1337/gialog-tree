import { useUserStore } from "@entities/user";
import { ADMIN_ROUTES } from "@shared/routes";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@shared/ui/sidebar";
import { GitBranch, ShieldUser } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ADMIN_LINKS = [
  {
    ...ADMIN_ROUTES.SCENARIOS,
    icon: <GitBranch />,
  },
  {
    ...ADMIN_ROUTES.ACCESS_MANAGEMENT,
    icon: <ShieldUser />,
  },
];

export function AdminRoutesGroup() {
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
