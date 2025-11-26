"use client";

import { type ReactNode, createContext, useMemo, useContext } from "react";
import useStore from "@/store/useStore";
import {
    createGlobalStore,
    GlobalStore,
    initGlobalStore,
} from "@/store/GlobalStore";

export type GlobalStoreApi = ReturnType<typeof createGlobalStore>;

export const GlobalStoreContext = createContext<GlobalStoreApi | undefined>(
    undefined
);

export type GlobalStoreProviderProps = {
    children: ReactNode;
};

export const GlobalStoreProvider = ({ children }: GlobalStoreProviderProps) => {
    const store = useMemo(() => createGlobalStore(initGlobalStore()), []);
    return (
        <GlobalStoreContext.Provider value={store}>
            {children}
        </GlobalStoreContext.Provider>
    );
};

export const useGlobalStore = <T,>(selector: (store: GlobalStore) => T): T => {
    const globalStoreContext = useContext(GlobalStoreContext);

    if (!globalStoreContext) {
        throw new Error(
            `useGlobalStore must be used within GlobalStoreProvider`
        );
    }

    return useStore(globalStoreContext, selector);
};
