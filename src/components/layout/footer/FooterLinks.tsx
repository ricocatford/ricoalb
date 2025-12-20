"use client";

import Link from "next/link";
import { useTranslations } from "@/providers/LanguageProvider";
import { NavConfig, NavLink } from "@/types/NavConfig";
import { FooterConfig } from "@/types/FooterConfig";
import styles from "@/assets/styles/components/layout/footer/Footer.module.css";

const isNavLink = (item: NavConfig): item is NavLink => {
    return item.type === "main" || item.type === "social";
};

export const FooterLinks = (): React.JSX.Element => {
    const { translations } = useTranslations();
    const navConfig: NavConfig[] = translations.nav;
    const footerConfig = translations.common.footer as unknown as FooterConfig;

    const navLinksOnly: NavLink[] = navConfig.filter(isNavLink);

    const mainLinks: NavLink[] = navLinksOnly.filter(
        (link) => link.type === "main"
    );
    const socialLinks: NavLink[] = navLinksOnly.filter(
        (link) => link.type === "social"
    );

    if (!navLinksOnly || !footerConfig) return <></>;

    return (
        <>
            <div className={styles.linksContainer}>
                <h3 className={styles.linksHeading}>
                    {footerConfig.mainLinksHeading}
                </h3>
                <ul className={styles.linksList}>
                    {mainLinks.map((link) => (
                        <li key={link.id}>
                            <Link href={link.href} className={styles.linkLabel}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.linksContainer}>
                <h3 className={styles.linksHeading}>
                    {footerConfig.socialLinksHeading}
                </h3>
                <ul className={styles.linksList}>
                    {socialLinks.map((link) => (
                        <li key={link.id}>
                            <Link
                                target="_blank"
                                href={link.href}
                                className={styles.linkLabel}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};
