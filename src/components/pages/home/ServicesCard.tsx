import Link from "next/link";
import { BentoCard } from "@/components/layout/cards/BentoCard";
import { ServicesSection } from "@/types/HomeSection";
import { LinkIcon } from "@/components/layout/icons/common/LinkIcon";
import styles from "@/assets/styles/components/pages/home/ServicesCard.module.css";
import cardStyles from "@/assets/styles/components/layout/cards/BentoCard.module.css";

interface ServicesCardProps {
    section: ServicesSection;
}

export const ServicesCard = ({ section }: ServicesCardProps) => {
    return (
        <BentoCard variant="wide">
            <section className={styles.container}></section>
            <Link href={section.href} className={cardStyles.link}>
                <footer className={cardStyles.footer}>
                    <div className={cardStyles.labelContainer}>
                        <span className={cardStyles.label}>
                            {section.label}
                        </span>
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
