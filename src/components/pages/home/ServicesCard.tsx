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
    UIUXIcon: <UIUXIcon width={22} height={22} />,
    DesignIcon: <DesignIcon width={22} height={22} />,
    FrontendIcon: <FrontendIcon width={22} height={22} />,
    BackendIcon: <BackendIcon width={22} height={22} />,
    SEOIcon: <SEOIcon width={22} height={22} />,
};

const largeIconList: Record<ServiceIconKey, React.JSX.Element> = {
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
    const [activeIndex, setActiveIndex] = useState(0);
    const services = section.services;
    const active = services[activeIndex];

    const onKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
        const step =
            event.key === "ArrowDown" || event.key === "ArrowRight"
                ? 1
                : event.key === "ArrowUp" || event.key === "ArrowLeft"
                  ? -1
                  : 0;
        if (step === 0) return;
        event.preventDefault();
        const next = (activeIndex + step + services.length) % services.length;
        setActiveIndex(next);
        const tabs =
            event.currentTarget.querySelectorAll<HTMLButtonElement>(
                "[role='tab']"
            );
        tabs[next]?.focus();
    };

    return (
        <BentoCard gridArea={section.type}>
            <div className={styles.container}>
                <ul
                    className={styles.tabList}
                    role="tablist"
                    aria-orientation="vertical"
                    onKeyDown={onKeyDown}
                >
                    {services.map((service, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <li
                                key={service.id}
                                className={styles.tabItem}
                                style={
                                    { "--index": index } as React.CSSProperties
                                }
                                role="presentation"
                            >
                                <button
                                    type="button"
                                    role="tab"
                                    id={`service-tab-${service.id}`}
                                    aria-selected={isActive}
                                    aria-controls="service-panel"
                                    tabIndex={isActive ? 0 : -1}
                                    className={styles.tab}
                                    data-active={isActive}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <span className={styles.tabIcon}>
                                        {iconList[service.icon]}
                                    </span>
                                    <span className={styles.tabLabel}>
                                        {service.label}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
                <div
                    id="service-panel"
                    role="tabpanel"
                    aria-labelledby={`service-tab-${active.id}`}
                    className={styles.panel}
                >
                    <div className={styles.panelContent} key={activeIndex}>
                        <span className={styles.panelIcon}>
                            {largeIconList[active.icon]}
                        </span>
                        <h3 className={styles.panelHeading}>{active.label}</h3>
                        <p className={styles.panelDescription}>
                            {active.description}
                        </p>
                        <ul className={styles.tags}>
                            {active.tags.map((tag) => (
                                <li key={tag} className={styles.tag}>
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </div>
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
