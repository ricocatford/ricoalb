"use client";

import { useTranslations } from "@/providers/LanguageProvider";
import { IconKey, NavLink } from "@/types/NavLink";
import { ProjectsIcon } from "../icons/ProjectsIcon";
import { BlogIcon } from "../icons/BlogIcon";
import { GithubIcon } from "../icons/GithubIcon";
import { LinkedinIcon } from "../icons/LinkedinIcon";
import styles from "@/assets/styles/components/navbar/Navbar.module.css";
import { DiscordIcon } from "../icons/DiscordIcon";

const iconList: Record<IconKey, React.JSX.Element> = {
    ProjectsIcon: <ProjectsIcon width={24} height={24} />,
    BlogIcon: <BlogIcon width={24} height={24} />,
    LinkedinIcon: <LinkedinIcon width={24} height={24} />,
    GithubIcon: <GithubIcon width={24} height={24} />,
    DiscordIcon: <DiscordIcon width={24} height={24} />,
};

export const NavbarClient = (): React.JSX.Element => {
    const { translations } = useTranslations();
    const navLinks: NavLink[] = translations.nav;

    return (
        <div>
            <ul className={styles.linksList}>
                {navLinks.map((link) => (
                    <li key={link.id} className={styles.linkLabel}>
                        <span>{iconList[link.icon]}</span>
                        {link.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};
