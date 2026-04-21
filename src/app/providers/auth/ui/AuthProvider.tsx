"use client";

import { UserStoreProvider, useUserStore } from "@entities/user/providers";
import { PropsWithChildren, useEffect } from "react";
import { onIdTokenChanged } from "@shared/api/firebase/auth";
import { deleteCookie, setCookie } from "cookies-next";

export const AuthProviderInner = ({ children }: PropsWithChildren) => {
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    const un = onIdTokenChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        await setCookie("__session", idToken);

        setUser({
          displayName: user.displayName || "unknown displayName",
          email: user.email || "unknown email",
          photoURL: user.photoURL || "unknown photoURL",
          uid: user.uid,
        });
      } else {
        await deleteCookie("__session");
        setUser(null);
      }
    });

    return un;
  }, []);

  return children;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  return (
    <UserStoreProvider initState={{ isLoading: true, user: null }}>
      <AuthProviderInner>{children}</AuthProviderInner>
    </UserStoreProvider>
  );
};
