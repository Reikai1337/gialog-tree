"use client";

import { useUserStore } from "@entities/user/providers";
import { type PropsWithChildren, useEffect } from "react";
import { onIdTokenChanged } from "@shared/api/firebase/auth";
import { deleteCookie, setCookie } from "cookies-next";
import { type User } from "@entities/user";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const setUser = useUserStore((s) => s.setUser);
  const setLoading = useUserStore((s) => s.setLoading);

  useEffect(() => {
    const un = onIdTokenChanged(async (user) => {
      // console.log("onIdTokenChanged", user);
      // if (!user) {
      //   await deleteCookie("__session");
      //   setUser(null);
      // } else {
      //   const idToken = await user.getIdToken();
      //   await setCookie("__session", idToken);
      //   const u: User = {
      //     displayName: user.displayName || "unknown displayName",
      //     email: user.email || "unknown email",
      //     photoURL: user.photoURL || "unknown photoURL",
      //     uid: user.uid,
      //   };
      //   setUser(u);
      // }
      // setLoading(false);
    });

    return un;
  }, [setUser, setLoading]);

  return children;
};
