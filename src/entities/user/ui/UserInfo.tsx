"use client";

import { signInWithGoogle, signOut } from "@shared/api/firebase/auth";
import { useUserStore, useUserStoreApi } from "../providers";
import Image from "next/image";
import { Button } from "@shared/ui/button";

export const UserInfo = () => {
  const user = useUserStore((s) => s.user);
  const isLoading = useUserStore((s) => s.isLoading);

  console.log("user STORE", user);

  const handleSignOut = () => {
    signOut();
  };

  const handleSignIn = () => {
    signInWithGoogle();
  };

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
