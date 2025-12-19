import { BentoCard } from "@/components/layout/cards/BentoCard";
import { StatsSection } from "@/types/HomeSection";
import styles from "@/assets/styles/components/pages/home/StatsCard.module.css";

interface StatsCardProps {
    section: StatsSection;
}

export const StatsCard = ({ section }: StatsCardProps) => {
    return (
        <BentoCard variant="wide">
            <div className={styles.container}>
                <p>Stats</p>
            </div>
        </BentoCard>
    );
};
