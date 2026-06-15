"use client";

import "@/lib/i18nClient";
import { Trans } from "react-i18next";
import { useTranslations } from "@/providers/LanguageProvider";
import { asTranslations } from "@/lib/asTranslations";
import styles from "@/assets/styles/components/pages/about/AboutBio.module.css";

interface AboutBioTranslations {
    eyebrow: string;
    headline: string;
    paragraphs: string[];
}

export const AboutBio = (): React.JSX.Element => {
    const { translations } = useTranslations();
    const data = asTranslations<AboutBioTranslations>(
        translations.common?.about
    );

    const renderRichText = (content: string) => (
        <Trans
            defaults={content}
            components={{
                highlight: <span className={styles.highlight} />,
                bold: <strong className={styles.bold} />,
            }}
        >
            {content}
        </Trans>
    );

    return (
        <section className={styles.card}>
            <h2 className={styles.headline}>
                {data?.headline && renderRichText(data.headline)}
            </h2>
            <div className={styles.body}>
                {data?.paragraphs?.map((paragraph, index) => (
                    <p key={index} className={styles.paragraph}>
                        {renderRichText(paragraph)}
                    </p>
                ))}
            </div>
        </section>
    );
};
