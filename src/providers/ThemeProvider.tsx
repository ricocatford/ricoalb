"use client";

import { useEffect, type ReactNode } from "react";
import { useGlobalStore } from "@/providers/GlobalStoreProvider";

type ThemeProviderProps = {
    children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const theme = useGlobalStore((state) => state.theme);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
    }, [theme]);

    return <>{children}</>;
};
