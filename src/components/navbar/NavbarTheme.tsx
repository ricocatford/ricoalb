"use client";

import { useGlobalStore } from "@/providers/GlobalStoreProvider";
import { LightIcon } from "../icons/navbar/LightIcon";
import { DarkIcon } from "../icons/navbar/DarkIcon";
import styles from "@/assets/styles/components/navbar/Navbar.module.css";

export const NavbarTheme = (): React.JSX.Element => {
    const theme = useGlobalStore((state) => state.theme);
    const toggleTheme = useGlobalStore((state) => state.toggleTheme);
    const iconToRender =
        theme === "dark" ? (
            <LightIcon width={24} height={24} />
        ) : (
            <DarkIcon width={24} height={24} />
        );

    return (
        <button
            onClick={() => toggleTheme()}
            className={styles.themeButton}
            aria-label={`Switch to ${
                theme === "light" ? "dark" : "light"
            } theme`}
        >
            {iconToRender}
        </button>
    );
};
