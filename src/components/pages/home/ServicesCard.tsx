import "@/lib/i18nClient";
import { Trans } from "react-i18next";
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
    UIUXIcon: <UIUXIcon width={40} height={40} />,
    DesignIcon: <DesignIcon width={40} height={40} />,
    FrontendIcon: <FrontendIcon width={40} height={40} />,
    BackendIcon: <BackendIcon width={40} height={40} />,
    SEOIcon: <SEOIcon width={40} height={40} />,
};
interface ServicesCardProps {
    section: ServicesSection;
}

export const ServicesCard = ({ section }: ServicesCardProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const renderRichText = (content: string) => (
        <Trans
            defaults={content}
            components={{
                bold: <span className={styles.bold} />,
            }}
        >
            {content}
        </Trans>
    );

    return (
        <BentoCard gridArea={section.type}>
            <section
                className={styles.container}
                onMouseLeave={() => setActiveIndex(null)}
                onTouchStart={(e) => {
                    if (e.target === e.currentTarget) {
                        setActiveIndex(null);
                    }
                }}
            >
                <dl className={styles.servicesList}>
                    {section.services.map((service, index) => (
                        <div
                            key={service.id}
                            className={styles.serviceItem}
                            style={{ "--index": index } as React.CSSProperties}
                            onMouseEnter={() => setActiveIndex(index)}
                            onTouchStart={(e) => {
                                setActiveIndex(index);
                            }}
                        >
                            <dt className={styles.serviceLabel}>
                                {service.label}
                            </dt>
                            <dd className={styles.serviceIcon}>
                                {iconList[service.icon]}
                            </dd>
                        </div>
                    ))}
                </dl>
                <div className={styles.serviceInfoContainer}>
                    {activeIndex !== null && (
                        <p className={styles.serviceInfo} key={activeIndex}>
                            {renderRichText(section.services[activeIndex].info)}
                        </p>
                    )}
                </div>
            </section>
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
