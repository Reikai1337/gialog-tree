"use client";
import { useUserStore } from "@entities/user";

export const UserName = () => {
  const user = useUserStore((s) => s.user);
  return <div>{user?.displayName}</div>;
};
