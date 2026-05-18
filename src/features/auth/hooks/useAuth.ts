"use client";

import { useUserStore } from "@entities/user";
import { signInWithGoogle, signOut as signOutFB } from "@shared/firebase/auth";
import { useCallback } from "react";

export const useAuth = () => {
  const setLoading = useUserStore((s) => s.setLoading);
  const isLoading = useUserStore((s) => s.isLoading);

  const signIn = useCallback(async () => {
    if (isLoading) return;
    setLoading(true);
    await signInWithGoogle();
    setLoading(false);
  }, [isLoading, setLoading]);

  const signOut = useCallback(async () => {
    if (isLoading) return;
    setLoading(true);
    await signOutFB();
    window.location.reload();
  }, [isLoading, setLoading]);

  return { signIn, signOut };
};
