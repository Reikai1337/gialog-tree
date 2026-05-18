"use client";

import { useUserStore } from "@entities/user/providers";
import { type PropsWithChildren, useEffect, useRef } from "react";
import { deleteCookie, setCookie } from "cookies-next";
import { uuid } from "@shared/lib/utils/uuid";
import { SESSION_UUID_STORAGE_KEY } from "../constants";
import { isAdmin, onIdTokenChanged, signOut } from "@shared/firebase/auth";
import {
  subscribeToUserSession,
  upsertUserSession,
} from "@shared/firebase/user-session";
import { SESSION_COOKIE_NAME } from "@shared/firebase/lib";

export const UserSessionProvider = ({ children }: PropsWithChildren) => {
  const setUser = useUserStore((s) => s.setUser);
  const setIsAdmin = useUserStore((s) => s.setIsAdmin);
  const currentUser = useUserStore((s) => s.user);
  const sessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(async (user) => {
      if (!user) {
        await deleteCookie(SESSION_COOKIE_NAME);
        localStorage.removeItem(SESSION_UUID_STORAGE_KEY);
        sessionIdRef.current = null;
        setUser(null);
        return;
      }

      const [idToken, isUserAdministrator] = await Promise.all([
        user.getIdToken(),
        isAdmin(user),
      ]);

      await setCookie(SESSION_COOKIE_NAME, idToken);
      setIsAdmin(isUserAdministrator);

      if (currentUser?.uid !== user.uid) {
        const sessionId = uuid();
        sessionIdRef.current = sessionId;
        localStorage.setItem(SESSION_UUID_STORAGE_KEY, sessionId);
        await upsertUserSession({ sessionId, userId: user.uid });
        window.location.reload();
      }
    });

    return unsubscribe;
  }, [setUser, currentUser, setIsAdmin]);

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = subscribeToUserSession(
      currentUser.uid,
      async (session) => {
        const localSessionId = localStorage.getItem(SESSION_UUID_STORAGE_KEY);
        if (session && session.sessionId !== localSessionId) {
          await signOut();
          window.location.reload();
        }
      },
    );

    return unsubscribe;
  }, [currentUser]);

  return children;
};
