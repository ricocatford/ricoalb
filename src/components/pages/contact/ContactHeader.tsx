"use client";

import { useTranslations } from "@/providers/LanguageProvider";
import { asTranslations } from "@/lib/asTranslations";
import styles from "@/assets/styles/components/pages/contact/ContactHeader.module.css";

interface ContactHeaderTranslations {
    heading: string;
    replyWindow: string;
    schedule: string;
}

export const ContactHeader = (): React.JSX.Element => {
    const { translations } = useTranslations();
    const data = asTranslations<ContactHeaderTranslations>(
        translations.common?.contact
    );

    return (
        <header className={styles.container}>
            <div className={styles.left}>
                <h1 className={styles.heading}>
                    {data?.heading}
                    <em>.</em>
                </h1>
            </div>
            <div className={styles.right}>
                <span className={styles.reply}>{data?.replyWindow}</span>
                <span className={styles.schedule}>{data?.schedule}</span>
            </div>
        </header>
    );
};
