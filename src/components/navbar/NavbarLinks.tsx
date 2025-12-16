import Link from "next/link";
import { useTranslations } from "@/providers/LanguageProvider";
import { LinkIconKey, NavConfig, NavLink } from "@/types/NavConfig";
import { ProjectsIcon } from "../icons/navbar/ProjectsIcon";
import { ServicesIcon } from "../icons/navbar/ServicesIcon";
import { AboutIcon } from "../icons/navbar/AboutIcon";
import { BlogIcon } from "../icons/navbar/BlogIcon";
import { ContactIcon } from "../icons/navbar/ContactIcon";
import { LinkedinIcon } from "../icons/navbar/LinkedinIcon";
import { GithubIcon } from "../icons/navbar/GithubIcon";
import { DiscordIcon } from "../icons/navbar/DiscordIcon";
import styles from "@/assets/styles/components/navbar/Navbar.module.css";

const iconList: Record<LinkIconKey, React.JSX.Element> = {
    ProjectsIcon: <ProjectsIcon width={24} height={24} />,
    ServicesIcon: <ServicesIcon width={24} height={24} />,
    AboutIcon: <AboutIcon width={24} height={24} />,
    BlogIcon: <BlogIcon width={24} height={24} />,
    ContactIcon: <ContactIcon width={24} height={24} />,
    LinkedinIcon: <LinkedinIcon width={24} height={24} />,
    GithubIcon: <GithubIcon width={24} height={24} />,
    DiscordIcon: <DiscordIcon width={24} height={24} />,
};

interface NavbarLinksProps {
    setIsToggled: (toggle: boolean) => void;
}

const isNavLink = (item: NavConfig): item is NavLink => {
    return item.type === "main" || item.type === "social";
};

export const NavbarLinks = ({
    setIsToggled,
}: NavbarLinksProps): React.JSX.Element => {
    const { translations } = useTranslations();
    const navConfig: NavConfig[] = translations.nav;

    const navLinksOnly: NavLink[] = navConfig.filter(isNavLink);

    const mainLinks: NavLink[] = navLinksOnly.filter(
        (link) => link.type === "main"
    );
    const socialLinks: NavLink[] = navLinksOnly.filter(
        (link) => link.type === "social"
    );

    return (
        <div className={styles.linksContainer}>
            <ul className={styles.mainLinkList}>
                {mainLinks.map((link) => (
                    <li key={link.id} className={styles.linkListItem}>
                        <Link
                            href={link.href}
                            className={styles.mainLink}
                            onClick={() => setIsToggled(false)}
                        >
                            <span className={styles.mainLinkIcon}>
                                {iconList[link.icon]}
                            </span>
                            <span className={styles.mainLinkLabel}>
                                {link.label}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
            <ul className={styles.socialLinkList}>
                {socialLinks.map((link) => (
                    <li key={link.id} className={styles.linkListItem}>
                        <Link
                            href={link.href}
                            className={styles.socialLink}
                            onClick={() => setIsToggled(false)}
                        >
                            <span className={styles.socialLinkIcon}>
                                {iconList[link.icon]}
                            </span>
                            <span className={styles.socialLinkLabel}>
                                {link.label}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
