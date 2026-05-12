"use client";

import { useUserStore } from "@entities/user";
import { useAuth } from "@features/auth";
import { Button } from "@shared/ui/button";
import { Spinner } from "@shared/ui/spinner";

export const SignInButton = () => {
  const isLoading = useUserStore((s) => s.isLoading);
  const user = useUserStore((s) => s.user);
  const { signIn } = useAuth();

  return (
    <Button onClick={signIn} disabled={isLoading || !!user}>
      {isLoading ? <Spinner /> : "Sign In"}
    </Button>
  );
};
