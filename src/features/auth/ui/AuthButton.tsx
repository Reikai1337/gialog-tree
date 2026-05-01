"use client";

import { useUserStore } from "@entities/user";
import { Button } from "@shared/ui/button";
import { signInWithGoogle, signOut } from "@shared/api/firebase/auth";
import { Spinner } from "@shared/ui/spinner";
import { useRouter } from "next/navigation";
import { ROUTES } from "@shared/routes";
import { LogIn, LogOut } from "lucide-react";

export const AuthButton = () => {
  const n = useRouter();

  const hasUser = useUserStore((s) => s.hasUser);
  const setLoading = useUserStore((s) => s.setLoading);
  const isLoading = useUserStore((s) => s.isLoading);

  const handleSignIn = async () => {
    if (isLoading) return;
    setLoading(true);
    await signInWithGoogle();
    setLoading(false);
  };

  const handleSignOut = async () => {
    if (isLoading) return;
    setLoading(true);
    await signOut();
    setLoading(false);
    n.push(ROUTES.LOGIN.href);
  };

  if (hasUser)
    return (
      <Button size="icon" disabled={isLoading} onClick={handleSignOut}>
        <LogOut />
      </Button>
    );

  return (
    <Button size="icon" onClick={handleSignIn} disabled={isLoading}>
      {isLoading ? <Spinner data-icon="inline-start" /> : <LogIn />}
    </Button>
  );
};
