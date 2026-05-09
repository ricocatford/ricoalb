import { BentoCard } from "@/components/layout/cards/BentoCard";
import { StatsSection } from "@/types/HomeSection";
import styles from "@/assets/styles/components/pages/home/StatsCard.module.css";
import cardStyles from "@/assets/styles/components/layout/cards/BentoCard.module.css";

interface StatsCardProps {
    section: StatsSection;
}

export const StatsCard = ({ section }: StatsCardProps) => {
    return (
        <BentoCard gridArea={section.type}>
            <div className={styles.container}>
                <dl className={styles.statsList}>
                    {section.stats.map((stat) => (
                        <div key={stat.id} className={styles.statItem}>
                            <dt className={styles.statLabel}>{stat.label}</dt>
                            <dd className={styles.statValue}>{stat.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
            <footer className={cardStyles.footer}>
                <h2 className={cardStyles.label}>{section.label}</h2>
                <span className={cardStyles.icon}></span>
            </footer>
        </BentoCard>
    );
};
