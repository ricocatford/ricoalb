"use client";

import { useTranslations } from "@/providers/LanguageProvider";
import { IconKey, NavLink } from "@/types/NavLink";
import { ProjectsIcon } from "../icons/ProjectsIcon";
import { BlogIcon } from "../icons/BlogIcon";
import { ContactIcon } from "../icons/ContactIcon";
import { LinkedinIcon } from "../icons/LinkedinIcon";
import { GithubIcon } from "../icons/GithubIcon";
import { DiscordIcon } from "../icons/DiscordIcon";
import styles from "@/assets/styles/components/navbar/Navbar.module.css";
import Link from "next/link";

const iconList: Record<IconKey, React.JSX.Element> = {
    ProjectsIcon: <ProjectsIcon width={24} height={24} />,
    BlogIcon: <BlogIcon width={24} height={24} />,
    ContactIcon: <ContactIcon width={24} height={24} />,
    LinkedinIcon: <LinkedinIcon width={24} height={24} />,
    GithubIcon: <GithubIcon width={24} height={24} />,
    DiscordIcon: <DiscordIcon width={24} height={24} />,
};

export const NavbarLinks = (): React.JSX.Element => {
    const { translations } = useTranslations();
    const navLinks: NavLink[] = translations.nav;

    const mainLinks: NavLink[] = navLinks.filter(
        (link) => link.type === "main"
    );
    const socialLinks: NavLink[] = navLinks.filter(
        (link) => link.type === "social"
    );

    return (
        <div className={styles.linksContainer}>
            <ul className={styles.mainLinkList}>
                {mainLinks.map((link) => (
                    <li key={link.id}>
                        <Link href={link.href} className={styles.mainLink}>
                            <span className={styles.mainLinkIcon}>
                                {iconList[link.icon]}
                            </span>
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <ul className={styles.socialLinkList}>
                {socialLinks.map((link) => (
                    <li key={link.id}>
                        <Link href={link.href} className={styles.socialLink}>
                            <span className={styles.socialLinkIcon}>
                                {iconList[link.icon]}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
