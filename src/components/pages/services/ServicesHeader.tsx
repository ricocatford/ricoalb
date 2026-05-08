"use client";

import { useTranslations } from "@/providers/LanguageProvider";
import { asTranslations } from "@/lib/asTranslations";
import styles from "@/assets/styles/components/pages/services/ServicesHeader.module.css";

interface ServicesTranslations {
    heading: string;
    paragraph: string;
}

export const ServicesHeader = (): React.JSX.Element => {
    const { translations } = useTranslations();
    const servicesData = asTranslations<ServicesTranslations>(
        translations.common?.services
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>{servicesData?.heading}</h1>
            <p className={styles.paragraph}>{servicesData?.paragraph}</p>
        </div>
    );
};
