"use client";

// src/lib/create-zustand-context.tsx
import React, { createContext, useContext, useState } from "react";
import { useStore as useZustand } from "zustand";
import type { StoreApi } from "zustand/vanilla";

/**
 * createZustandContext
 *
 * createStoreFactory: (init?: Partial<State>) => StoreApi<State>
 *
 * Returned:
 *  - Provider: React component that creates one store instance per provider (useState + factory)
 *  - useStore: typed hook (selector) to read reactive state from that store
 *  - useStoreApi: access raw StoreApi (set/get/subscribe)
 *  - Context: контекст для возможной продвинутой интеграции
 */
export const createZustandContext = <S, State extends object>(
  createStoreFactory: (initState: State) => StoreApi<S>,
  name: string = "ZustandContext",
) => {
  type Store = StoreApi<S>;
  const Context = createContext<Store | undefined>(undefined);

  const Provider: React.FC<{
    children: React.ReactNode;
    initState: State;
  }> = ({ children, initState }) => {
    // храним созданную инстанцию в useState, чтобы создать её только один раз на клиенте per-provider
    const [store] = useState<Store>(() => createStoreFactory(initState));
    return <Context.Provider value={store}>{children}</Context.Provider>;
  };

  function useStore<R>(selector: (s: S) => R): R {
    const store = useContext(Context);
    if (!store) {
      throw new Error(
        `useStore must be used within the corresponding Provider (${name})`,
      );
    }
    return useZustand(store, selector);
  }

  function useStoreApi(): Store {
    const store = useContext(Context);
    if (!store) {
      throw new Error(
        `useStoreApi must be used within the corresponding Provider (${name})`,
      );
    }
    return store;
  }

  return { Provider, useStore, useStoreApi, Context } as const;
};
