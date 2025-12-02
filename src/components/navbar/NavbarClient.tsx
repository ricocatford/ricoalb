"use client";

import { useTranslations } from "@/providers/LanguageProvider";
import { NavLink } from "@/types/NavLink";
import styles from "@/assets/styles/components/navbar/Navbar.module.css";

export const NavbarClient = (): React.JSX.Element => {
    const { translations } = useTranslations();
    const navLinks: NavLink[] = translations.nav;
    console.log(navLinks);

    return (
        <div>
            <ul className={styles.linksList}>
                {navLinks.map((link) => (
                    <li key={link.id} className={styles.linkLabel}>
                        {link.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};
