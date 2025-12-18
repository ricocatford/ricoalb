import styles from "@/assets/styles/components/layout/cards/BentoCard.module.css";

interface BentoCardProps {
    variant: "regular" | "wide";
    children: React.ReactNode;
}

export const BentoCard = ({
    variant,
    children,
}: BentoCardProps): React.JSX.Element => {
    const variantStyles = {
        regular: styles.containerRegular,
        wide: styles.containerWide,
    };

    return (
        <article className={`${styles.container} ${variantStyles[variant]}`}>
            {children}
        </article>
    );
};
