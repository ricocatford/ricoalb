"use client";

import { useEffect } from "react";
import { useGlobalStore } from "./GlobalStoreProvider";
import { IntroLoader } from "@/components/layout/loader/IntroLoader";

export const LoadingProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const isLoading = useGlobalStore((state) => state.isLoading);
    const finishLoading = useGlobalStore((state) => state.finishLoading);

    useEffect(() => {
        const timer = setTimeout(() => {
            finishLoading();
        }, 1000);

        return () => clearTimeout(timer);
    }, [finishLoading]);

    return (
        <>
            {isLoading && <IntroLoader />}
            {children}
        </>
    );
};
