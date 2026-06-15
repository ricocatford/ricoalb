"use client";

import { useTranslations } from "@/providers/LanguageProvider";
import { asTranslations } from "@/lib/asTranslations";
import type { Translations } from "@/types/Translations";
import styles from "@/assets/styles/components/pages/about/TimelineCard.module.css";

interface TimelineTranslations {
    label: string;
    rows: Array<{
        when: string;
        what: string;
        note: string;
        where: string;
    }>;
}

export const TimelineCard = (): React.JSX.Element => {
    const { translations } = useTranslations();
    const about = asTranslations<Translations>(translations.common?.about);
    const data = asTranslations<TimelineTranslations>(about?.timeline);

    return (
        <section className={styles.card}>
            <span className={styles.label}>{data?.label}</span>
            <ul className={styles.list}>
                {data?.rows?.map((row) => (
                    <li key={row.when + row.what} className={styles.row}>
                        <span className={styles.when}>{row.when}</span>
                        <span className={styles.what}>
                            {row.what}
                            <em className={styles.note}>{row.note}</em>
                        </span>
                        <span className={styles.where}>{row.where}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};
