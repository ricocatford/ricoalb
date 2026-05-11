import "@/lib/i18nClient";
import { Trans } from "react-i18next";
import { BentoCard } from "@/components/layout/cards/BentoCard";
import { IntroSection } from "@/types/HomeSection";
import { LocationIcon } from "@/components/layout/icons/common/LocationIcon";
import styles from "@/assets/styles/components/pages/home/IntroCard.module.css";

interface IntroCardProps {
    section: IntroSection;
}

export const IntroCard = ({ section }: IntroCardProps) => {
    const renderRichText = (content: string) => (
        <Trans
            defaults={content}
            components={{
                highlight: <span className={styles.highlight} />,
                bold: <span className={styles.bold} />,
            }}
        >
            {content}
        </Trans>
    );

    return (
        <BentoCard gridArea={section.type}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.headingsContainer}>
                        <h1 className={styles.heading}>{section.heading}</h1>
                        <h2 className={styles.subheading}>
                            {renderRichText(section.subheading)}
                        </h2>
                    </div>
                    <div className={styles.locationContainer}>
                        <span className={styles.locationIcon}>
                            <LocationIcon width={20} height={20} />
                        </span>
                        <span className={styles.location}>
                            {section.location}
                        </span>
                    </div>
                </header>
                <p className={styles.paragraph}>
                    {renderRichText(section.paragraph)}
                </p>
            </div>
        </BentoCard>
    );
};
