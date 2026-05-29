"use client";

import { useTranslations } from "@/providers/LanguageProvider";
import { asTranslations } from "@/lib/asTranslations";
import type { Translations } from "@/types/Translations";
import styles from "@/assets/styles/components/pages/about/StackCard.module.css";

interface StackTranslations {
    label: string;
    rows: Array<{ key: string; value: string }>;
}

export const StackCard = (): React.JSX.Element => {
    const { translations } = useTranslations();
    const about = asTranslations<Translations>(translations.common?.about);
    const data = asTranslations<StackTranslations>(about?.stack);

    return (
        <section className={styles.card}>
            <span className={styles.label}>{data?.label}</span>
            <ul className={styles.list}>
                {data?.rows?.map((row) => (
                    <li key={row.key} className={styles.row}>
                        <span className={styles.key}>{row.key}</span>
                        <span className={styles.value}>{row.value}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};
