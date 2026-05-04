import { Service, ServiceIconKey } from "@/types/Service";
import { UIUXIcon } from "@/components/layout/icons/services/UIUXIcon";
import { DesignIcon } from "@/components/layout/icons/services/DesignIcon";
import { FrontendIcon } from "@/components/layout/icons/services/FrontendIcon";
import { BackendIcon } from "@/components/layout/icons/services/BackendIcon";
import { SEOIcon } from "@/components/layout/icons/services/SEOIcon";
import styles from "@/assets/styles/components/pages/services/ServiceCard.module.css";

const iconList: Record<ServiceIconKey, React.JSX.Element> = {
    UIUXIcon: <UIUXIcon width={32} height={32} />,
    DesignIcon: <DesignIcon width={32} height={32} />,
    FrontendIcon: <FrontendIcon width={32} height={32} />,
    BackendIcon: <BackendIcon width={32} height={32} />,
    SEOIcon: <SEOIcon width={32} height={32} />,
};

interface ServiceCardProps {
    service: Service;
}

export const ServiceCard = ({
    service,
}: ServiceCardProps): React.JSX.Element => {
    return (
        <div className={styles.card}>
            <dd className={styles.iconContainer}>
                <span className={styles.icon}>{iconList[service.icon]}</span>
            </dd>
            <dt className={styles.heading}>{service.heading}</dt>
            <dd className={styles.paragraph}>{service.paragraph}</dd>
        </div>
    );
};
