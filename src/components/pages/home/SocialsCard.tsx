import { BentoCard } from "@/components/layout/cards/BentoCard";
import { SocialIconKey, SocialItem, SocialsSection } from "@/types/HomeSection";
import { LinkedinIcon } from "@/components/layout/icons/navbar/LinkedinIcon";
import { GithubIcon } from "@/components/layout/icons/navbar/GithubIcon";
import { DiscordIcon } from "@/components/layout/icons/navbar/DiscordIcon";
import styles from "@/assets/styles/components/pages/home/SocialsCard.module.css";
import cardStyles from "@/assets/styles/components/layout/cards/BentoCard.module.css";
import Link from "next/link";

const iconList: Record<SocialIconKey, React.JSX.Element> = {
    LinkedinIcon: <LinkedinIcon width={40} height={40} />,
    GithubIcon: <GithubIcon width={40} height={40} />,
    DiscordIcon: <DiscordIcon width={40} height={40} />,
};
interface SocialsCardProps {
    section: SocialsSection;
}

export const SocialsCard = ({ section }: SocialsCardProps) => {
    return (
        <BentoCard gridArea={section.type}>
            <section className={styles.container}>
                <ul className={styles.socialLinkList}>
                    {section.socials.map((social) => (
                        <li key={social.id} className={styles.socialLink}>
                            <Link href={social.href}>
                                <div className={styles.socialIconContainer}>
                                    <span className={styles.socialIcon}>
                                        {iconList[social.icon]}
                                    </span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
            <footer className={cardStyles.footer}>
                <div className={cardStyles.labelContainer}>
                    <span className={cardStyles.label}>{section.label}</span>
                    <span className={cardStyles.info}>{section.info}</span>
                </div>
            </footer>
        </BentoCard>
    );
};
