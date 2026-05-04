"use client";

import { useTranslations } from "@/providers/LanguageProvider";
import styles from "@/assets/styles/components/pages/services/ServicesList.module.css";
import { ServiceCard } from "./ServiceCard";
import { Service } from "@/types/Service";

export const ServicesList = (): React.JSX.Element => {
    const { translations } = useTranslations();
    const servicesList: Service[] = translations.common?.services?.list;

    if (!Array.isArray(servicesList)) {
        return <div className={styles.container}>No services found.</div>;
    }

    return (
        <dl className={styles.list}>
            {servicesList.map((service) => (
                <ServiceCard key={service.id} service={service} />
            ))}
        </dl>
    );
};
