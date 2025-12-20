"use client";

import { useTranslations } from "@/providers/LanguageProvider";
import { FooterConfig } from "@/types/FooterConfig";
import styles from "@/assets/styles/components/layout/footer/Footer.module.css";

export const FooterCopyright = (): React.JSX.Element => {
    const { translations } = useTranslations();
    const footerConfig = translations.common.footer as unknown as FooterConfig;

    if (!footerConfig) return <></>;

    return (
        <div className={styles.copyrightContainer}>
            <p>{footerConfig.copyrightText}</p>
            <p>{footerConfig.attribution}</p>
        </div>
    );
};
