"use client";

import { useUserStore } from "@entities/user";
import { SidebarTrigger as BaseSidebarTrigger } from "@shared/ui/sidebar";
import React from "react";

export const SidebarTrigger = (
  props: React.ComponentProps<typeof BaseSidebarTrigger>,
) => {
  const user = useUserStore((s) => s.user);

  return <BaseSidebarTrigger disabled={!user} {...props} />;
};
