"use client";

import { useTranslations } from "@/providers/LanguageProvider";
import { asTranslations } from "@/lib/asTranslations";
import type { Translations } from "@/types/Translations";
import styles from "@/assets/styles/components/pages/contact/AvailabilityCard.module.css";

interface AvailabilityTranslations {
    heading: string;
    paragraph: string;
}

export const AvailabilityCard = (): React.JSX.Element => {
    const { translations } = useTranslations();
    const contact = asTranslations<Translations>(translations.common?.contact);
    const data = asTranslations<AvailabilityTranslations>(contact?.availability);

    return (
        <section className={styles.card}>
            <span className={styles.dot} aria-hidden="true" />
            <div className={styles.text}>
                <h2 className={styles.heading}>{data?.heading}</h2>
                <p className={styles.paragraph}>{data?.paragraph}</p>
            </div>
        </section>
    );
};
