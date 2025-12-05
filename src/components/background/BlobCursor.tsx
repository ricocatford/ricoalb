"use client";

import { useState, useEffect } from "react";
import styles from "@/assets/styles/components/background/BlobCursor.module.css";

type Position = {
    x: number;
    y: number;
};

export const BlobCursor: React.FC = () => {
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const cursorStyle = {
        "--mouse-x": `${position.x}px`,
        "--mouse-y": `${position.y}px`,
    } as React.CSSProperties;

    return <div className={styles.container} style={cursorStyle}></div>;
};
