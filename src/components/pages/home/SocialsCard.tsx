import { BentoCard } from "@/components/layout/cards/BentoCard";
import { SocialsSection } from "@/types/HomeSection";
import styles from "@/assets/styles/components/pages/home/SocialsCard.module.css";
import cardStyles from "@/assets/styles/components/layout/cards/BentoCard.module.css";

interface SocialsCardProps {
    section: SocialsSection;
}

export const SocialsCard = ({ section }: SocialsCardProps) => {
    return (
        <BentoCard variant="regular">
            <section className={styles.container}></section>
            <footer className={cardStyles.footer}>
                <div className={cardStyles.labelContainer}>
                    <span className={cardStyles.label}>{section.label}</span>
                    <span className={cardStyles.info}>{section.info}</span>
                </div>
            </footer>
        </BentoCard>
    );
};
