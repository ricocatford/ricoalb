"use client";

import { useTranslations } from "@/providers/LanguageProvider";
import { ServiceCard } from "./ServiceCard";
import { Service } from "@/types/Service";
import { asTranslations } from "@/lib/asTranslations";
import styles from "@/assets/styles/components/pages/services/ServicesList.module.css";

export const ServicesList = (): React.JSX.Element => {
    const { translations } = useTranslations();
    const services = asTranslations<{ list: Service[] }>(
        translations.common?.services
    );
    const servicesList = services?.list;

    if (!Array.isArray(servicesList)) {
        return <div className={styles.container}>No services found.</div>;
    }

    return (
        <div className={styles.list}>
            {servicesList.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
            ))}
        </div>
    );
};
