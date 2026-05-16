import "@/lib/i18nClient";
import { useState } from "react";
import Link from "next/link";
import { BentoCard } from "@/components/layout/cards/BentoCard";
import { ServiceIconKey, ServicesSection } from "@/types/HomeSection";
import { LinkIcon } from "@/components/layout/icons/common/LinkIcon";
import { UIUXIcon } from "@/components/layout/icons/services/UIUXIcon";
import { DesignIcon } from "@/components/layout/icons/services/DesignIcon";
import { FrontendIcon } from "@/components/layout/icons/services/FrontendIcon";
import { BackendIcon } from "@/components/layout/icons/services/BackendIcon";
import { SEOIcon } from "@/components/layout/icons/services/SEOIcon";
import styles from "@/assets/styles/components/pages/home/ServicesCard.module.css";
import cardStyles from "@/assets/styles/components/layout/cards/BentoCard.module.css";

const iconList: Record<ServiceIconKey, React.JSX.Element> = {
    UIUXIcon: <UIUXIcon width={28} height={28} />,
    DesignIcon: <DesignIcon width={28} height={28} />,
    FrontendIcon: <FrontendIcon width={28} height={28} />,
    BackendIcon: <BackendIcon width={28} height={28} />,
    SEOIcon: <SEOIcon width={28} height={28} />,
};

interface ServicesCardProps {
    section: ServicesSection;
}

export const ServicesCard = ({ section }: ServicesCardProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <BentoCard gridArea={section.type}>
            <div
                className={styles.container}
                onMouseLeave={() => setActiveIndex(null)}
                onTouchStart={(e) => {
                    if (e.target === e.currentTarget) {
                        setActiveIndex(null);
                    }
                }}
            >
                <ul className={styles.hexGrid}>
                    {section.services.map((service, index) => (
                        <li
                            key={service.id}
                            className={styles.hexItem}
                            style={{ "--index": index } as React.CSSProperties}
                            onMouseEnter={() => setActiveIndex(index)}
                            onTouchStart={() => setActiveIndex(index)}
                        >
                            <svg
                                className={styles.hexShape}
                                viewBox="0 0 86.6 100"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                            >
                                <polygon points="43.3,0 86.6,25 86.6,75 43.3,100 0,75 0,25" />
                            </svg>
                            <span className={styles.hexIcon}>
                                {iconList[service.icon]}
                            </span>
                        </li>
                    ))}
                </ul>
                <div className={styles.serviceLabelContainer}>
                    {activeIndex !== null && (
                        <p className={styles.serviceLabel} key={activeIndex}>
                            {section.services[activeIndex].label}
                        </p>
                    )}
                </div>
            </div>
            <Link href={section.href} className={cardStyles.link}>
                <footer className={cardStyles.footer}>
                    <h2 className={cardStyles.label}>{section.label}</h2>
                    <span className={cardStyles.icon}>
                        <LinkIcon />
                    </span>
                </footer>
            </Link>
        </BentoCard>
    );
};
