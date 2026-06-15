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
    const data = asTranslations<ServicesTranslations>(
        translations.common?.services
    );

    return (
        <header className={styles.container}>
            <h1 className={styles.heading}>{data?.heading}</h1>
            <p className={styles.paragraph}>{data?.paragraph}</p>
        </header>
    );
};
