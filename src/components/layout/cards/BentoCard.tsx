import styles from "@/assets/styles/components/layout/cards/BentoCard.module.css";

interface BentoCardProps {
    gridArea: string;
    children: React.ReactNode;
}

export const BentoCard = ({
    gridArea,
    children,
}: BentoCardProps): React.JSX.Element => {
    return (
        <article className={styles.container} style={{ gridArea: gridArea }}>
            {children}
        </article>
    );
};
