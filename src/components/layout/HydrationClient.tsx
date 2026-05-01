"use client";

import { useState, useEffect, useContext } from "react";
import {
    useGlobalStore,
    GlobalStoreContext,
} from "@/providers/GlobalStoreProvider";
import { IntroLoader } from "./loader/IntroLoader";
import styles from "@/assets/styles/components/HydrationClient.module.css";

interface HydrationClientProps {
    children: React.ReactNode;
}

export function HydrationClient({ children }: HydrationClientProps) {
    const [hasMounted, setHasMounted] = useState(false);

    const store = useContext(GlobalStoreContext);

    const isLoading = useGlobalStore((state) => state.isLoading);
    const finishLoading = useGlobalStore((state) => state.finishLoading);

    useEffect(() => {
        setHasMounted(true);

        if (!store) return;

        const unsub = store.persist.onFinishHydration(() => {
            setTimeout(() => {
                finishLoading();
            }, 600);
        });

        if (store.persist.hasHydrated()) {
            setTimeout(() => {
                finishLoading();
            }, 600);
        }

        return () => unsub();
    }, [finishLoading, store]);

    if (!hasMounted) {
        return <IntroLoader />;
    }

    return (
        <>
            {isLoading && <IntroLoader />}
            <div
                className={`${styles.container} ${
                    isLoading ? styles.hidden : styles.visible
                }`}
            >
                {children}
            </div>
        </>
    );
}
