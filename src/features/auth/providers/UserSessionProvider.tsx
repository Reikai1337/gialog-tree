"use client";

import { useUserStore } from "@entities/user/providers";
import { type PropsWithChildren, useEffect, useRef } from "react";
import { onIdTokenChanged, signOut } from "@shared/api/firebase/auth";
import { deleteCookie, setCookie } from "cookies-next";
import {
  upsertSession,
  subscribeToSession,
} from "@shared/api/new-firebase/sessions";
import { uuid } from "@shared/lib/utils/uuid";
import { SESSION_COOKIE_NAME, SESSION_UUID_STORAGE_KEY } from "../constants";

export const UserSessionProvider = ({ children }: PropsWithChildren) => {
  const setUser = useUserStore((s) => s.setUser);
  const currentUser = useUserStore((s) => s.user);
  const sessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(async (user) => {
      console.log("onIdTokenChanged =>", user?.displayName);

      if (!user) {
        await deleteCookie(SESSION_COOKIE_NAME);
        localStorage.removeItem(SESSION_UUID_STORAGE_KEY);
        sessionIdRef.current = null;
        setUser(null);
        return;
      }

      const idToken = await user.getIdToken();
      await setCookie(SESSION_COOKIE_NAME, idToken);

      // новая сессия только при смене пользователя
      if (currentUser?.uid !== user.uid) {
        const sessionId = uuid();
        sessionIdRef.current = sessionId;
        localStorage.setItem(SESSION_UUID_STORAGE_KEY, sessionId);
        await upsertSession(user.uid, sessionId);
        window.location.reload();
      }
    });

    return unsubscribe;
  }, [setUser, currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = subscribeToSession(currentUser.uid, (session) => {
      const localSessionId = localStorage.getItem(SESSION_UUID_STORAGE_KEY);
      if (session && session.sessionId !== localSessionId) {
        signOut();
      }
    });

    return unsubscribe;
  }, [currentUser]);

  return children;
};
