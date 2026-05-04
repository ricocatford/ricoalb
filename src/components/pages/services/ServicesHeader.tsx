"use client";

import { useTranslations } from "@/providers/LanguageProvider";
import styles from "@/assets/styles/components/pages/services/ServicesHeader.module.css";

export const ServicesHeader = (): React.JSX.Element => {
    const { translations } = useTranslations();
    const servicesData = translations.common?.services;

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>{servicesData?.heading}</h1>
            <p className={styles.paragraph}>{servicesData?.paragraph}</p>
        </div>
    );
};
