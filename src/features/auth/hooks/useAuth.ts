"use client";

import { useUserStore } from "@entities/user";
import {
  signInWithGoogle,
  signOut as signOutFB,
} from "@shared/api/firebase/auth";
import { ROUTES } from "@shared/routes";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useAuth = () => {
  const router = useRouter();
  const setLoading = useUserStore((s) => s.setLoading);
  const isLoading = useUserStore((s) => s.isLoading);

  const signIn = useCallback(async () => {
    if (isLoading) return;
    setLoading(true);
    await signInWithGoogle();
    setLoading(false);
    router.push(ROUTES.DASHBOARD.href);
  }, [isLoading, setLoading, router]);

  const signOut = useCallback(async () => {
    if (isLoading) return;
    setLoading(true);
    await signOutFB();
    setLoading(false);
    router.push(ROUTES.LOGIN.href);
  }, [isLoading, setLoading, router]);

  return { signIn, signOut };
};
