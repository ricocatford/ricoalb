import Link from "next/link";
import { BentoCard } from "@/components/layout/cards/BentoCard";
import { AboutSection } from "@/types/HomeSection";
import { LogoIcon } from "@/components/layout/icons/common/LogoIcon";
import { LinkIcon } from "@/components/layout/icons/common/LinkIcon";
import styles from "@/assets/styles/components/pages/home/AboutCard.module.css";
import cardStyles from "@/assets/styles/components/layout/cards/BentoCard.module.css";

interface AboutCardProps {
    section: AboutSection;
}

export const AboutCard = ({ section }: AboutCardProps) => {
    return (
        <BentoCard gridArea={section.type}>
            <div className={styles.container}>
                <div className={styles.logoContainer}>
                    <div className={styles.snake}></div>
                    <span className={styles.logoIcon}>
                        <LogoIcon width={96} height={96} />
                    </span>
                </div>
            </div>
            <Link href={section.href} className={cardStyles.link}>
                <footer className={cardStyles.footer}>
                    <div className={cardStyles.labelContainer}>
                        <h2 className={cardStyles.label}>{section.label}</h2>
                        <span className={cardStyles.info}>{section.info}</span>
                    </div>
                    <span className={cardStyles.icon}>
                        <LinkIcon />
                    </span>
                </footer>
            </Link>
        </BentoCard>
    );
};
