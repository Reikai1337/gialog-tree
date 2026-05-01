"use client";

import { useUserStore } from "@entities/user";
import { useAuth } from "@features/auth";
import { Button } from "@shared/ui/button";
import { Spinner } from "@shared/ui/spinner";

export const SignInButton = () => {
  const isLoading = useUserStore((s) => s.isLoading);
  const hasUser = useUserStore((s) => s.hasUser);
  const { signIn } = useAuth();

  return (
    <Button onClick={signIn} disabled={isLoading || hasUser}>
      {isLoading ? <Spinner /> : "Sign In"}
    </Button>
  );
};
