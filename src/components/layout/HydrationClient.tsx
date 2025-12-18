// src/components/HydrationClient.tsx
"use client";

import { useState, useEffect } from "react";

interface HydrationClientProps {
    children: React.ReactNode;
}

export function HydrationClient({ children }: HydrationClientProps) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return <>{children}</>;
}
