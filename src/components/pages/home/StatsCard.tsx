import { BentoCard } from "@/components/layout/cards/BentoCard";
import { StatsSection } from "@/types/HomeSection";
import styles from "@/assets/styles/components/pages/home/StatsCard.module.css";

interface StatsCardProps {
    section: StatsSection;
}

export const StatsCard = ({ section }: StatsCardProps) => {
    console.log("Section stats: ", section.stats);
    return (
        <BentoCard variant="wide">
            <div className={styles.container}>
                <dl className={styles.statsList}>
                    {section.stats.map((stat) => (
                        <div key={stat.id} className={styles.statItem}>
                            <dt className={styles.statValue}>{stat.value}</dt>
                            <dd className={styles.statLabel}>{stat.label}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </BentoCard>
    );
};
