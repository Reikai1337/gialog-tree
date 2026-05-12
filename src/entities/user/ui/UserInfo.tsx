"use client";

import { useUserStore } from "../providers";
import Image from "next/image";

export const UserInfo = () => {
  const user = useUserStore((s) => s.user);
  const isLoading = useUserStore((s) => s.isLoading);

  if (isLoading) return <div>isLoading</div>;

  if (!user) return <div>none</div>;

  return (
    <div>
      <p>
        <Image
          height={40}
          width={40}
          src={user.photoURL || "/file.svg"}
          alt={user.email || ""}
        />
        {user.displayName}
      </p>
    </div>
  );
};
