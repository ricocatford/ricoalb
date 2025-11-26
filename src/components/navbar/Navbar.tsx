"use client";

import { NavbarLinks } from "./NavbarLinks";
import { NavbarLogo } from "./NavbarLogo";
import styles from "@/assets/styles/components/navbar/Navbar.module.css";

export const Navbar = (): React.JSX.Element => {
    return (
        <header>
            <nav aria-label="Main navigation" className={styles.container}>
                <NavbarLogo />
                <NavbarLinks />
            </nav>
        </header>
    );
};
