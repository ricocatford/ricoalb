import Link from "next/link";
import { BentoCard } from "@/components/layout/cards/BentoCard";
import { ServiceIconKey, ServicesSection } from "@/types/HomeSection";
import { LinkIcon } from "@/components/layout/icons/common/LinkIcon";
import styles from "@/assets/styles/components/pages/home/ServicesCard.module.css";
import cardStyles from "@/assets/styles/components/layout/cards/BentoCard.module.css";

const iconList: Record<ServiceIconKey, React.JSX.Element> = {
    UIUXIcon: <></>,
    DesignIcon: <></>,
    FrontendIcon: <></>,
    BackendIcon: <p>b</p>,
    SEOIcon: <></>,
};
interface ServicesCardProps {
    section: ServicesSection;
}

export const ServicesCard = ({ section }: ServicesCardProps) => {
    return (
        <BentoCard variant="wide">
            <section className={styles.container}>
                <dl className={styles.servicesList}>
                    {section.services.map((service) => (
                        <div key={service.id} className={styles.serviceItem}>
                            <dt className={styles.serviceLabel}>
                                {service.label}
                            </dt>
                            <dd className={styles.serviceIcon}>
                                {iconList[service.icon]}
                            </dd>
                        </div>
                    ))}
                </dl>
            </section>
            <Link href={section.href} className={cardStyles.link}>
                <footer className={cardStyles.footer}>
                    <div className={cardStyles.labelContainer}>
                        <span className={cardStyles.label}>
                            {section.label}
                        </span>
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
