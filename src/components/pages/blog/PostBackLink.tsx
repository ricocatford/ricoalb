"use client";

import Link from "next/link";
import { useTranslations } from "@/providers/LanguageProvider";
import { asTranslations } from "@/lib/asTranslations";
import styles from "@/assets/styles/components/pages/blog/PostBackLink.module.css";

export const PostBackLink = (): React.JSX.Element => {
    const { translations } = useTranslations();
    const data = asTranslations<{ backToBlog: string }>(
        translations.common?.blog
    );

    return (
        <Link href="/blog" className={styles.link}>
            <span className={styles.arrow}>←</span>
            <span>{data?.backToBlog ?? "Back to blog"}</span>
        </Link>
    );
};
