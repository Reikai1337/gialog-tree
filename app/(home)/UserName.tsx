"use client";
import { useUserStore } from "@entities/user";

export const UserName = () => {
  const user = useUserStore((s) => s.user);
  const isAdmin = useUserStore((s) => s.isAdmin);
  return (
    <div>
      <p className={isAdmin ? "text-green-400" : "text-blue-400"}>
        {user?.displayName}
      </p>
    </div>
  );
};
