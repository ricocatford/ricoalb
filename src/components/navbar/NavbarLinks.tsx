"use client";

import { useTranslations } from "@/providers/LanguageProvider";
import { IconKey, NavLink } from "@/types/NavLink";
import { ProjectsIcon } from "../icons/navbar/ProjectsIcon";
import { BlogIcon } from "../icons/navbar/BlogIcon";
import { ContactIcon } from "../icons/navbar/ContactIcon";
import { LinkedinIcon } from "../icons/navbar/LinkedinIcon";
import { GithubIcon } from "../icons/navbar/GithubIcon";
import { DiscordIcon } from "../icons/navbar/DiscordIcon";
import Link from "next/link";
import styles from "@/assets/styles/components/navbar/Navbar.module.css";
import { ServicesIcon } from "../icons/navbar/ServicesIcon";
import { AboutIcon } from "../icons/navbar/AboutIcon";

const iconList: Record<IconKey, React.JSX.Element> = {
    ProjectsIcon: <ProjectsIcon width={24} height={24} />,
    ServicesIcon: <ServicesIcon width={24} height={24} />,
    AboutIcon: <AboutIcon width={24} height={24} />,
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
