"use client";

import { useTranslations } from "@/providers/LanguageProvider";
import { IconKey, NavLink } from "@/types/NavLink";
import BlogIcon from "../icons/BlogIcon";
import ProjectsIcon from "../icons/ProjectsIcon";
import GithubIcon from "../icons/GithubIcon";
import LinkedinIcon from "../icons/LinkedinIcon";
import styles from "@/assets/styles/components/navbar/Navbar.module.css";

const iconList: Record<IconKey, React.JSX.Element> = {
    ProjectsIcon: <ProjectsIcon />,
    BlogIcon: <BlogIcon />,
    GithubIcon: <GithubIcon />,
    LinkedinIcon: <LinkedinIcon />,
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
