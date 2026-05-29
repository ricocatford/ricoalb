"use client";

import { Hex } from "@/components/layout/background/Hex";
import { LogoIcon } from "@/components/layout/icons/common/LogoIcon";
import { useTranslations } from "@/providers/LanguageProvider";
import { asTranslations } from "@/lib/asTranslations";
import type { Translations } from "@/types/Translations";
import styles from "@/assets/styles/components/pages/about/PhilosophyCard.module.css";

interface PhilosophyTranslations {
    label: string;
    heading: string;
    paragraph: string;
}

export const PhilosophyCard = (): React.JSX.Element => {
    const { translations } = useTranslations();
    const about = asTranslations<Translations>(translations.common?.about);
    const data = asTranslations<PhilosophyTranslations>(about?.philosophy);

    return (
        <section className={styles.card}>
            <Hex color="var(--color-1)" />
            <div className={styles.logoStage}>
                <span className={styles.logoBubble}>
                    <LogoIcon width={96} height={96} />
                </span>
            </div>
            <div className={styles.text}>
                <h3 className={styles.heading}>{data?.heading}</h3>
                <p className={styles.paragraph}>{data?.paragraph}</p>
            </div>
        </section>
    );
};
