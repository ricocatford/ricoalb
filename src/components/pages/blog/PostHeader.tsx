"use client";

import Image from "next/image";
import { useTranslations } from "@/providers/LanguageProvider";
import { asTranslations } from "@/lib/asTranslations";
import type { PostLocale, PostMeta } from "@/types/Post";
import styles from "@/assets/styles/components/pages/blog/PostHeader.module.css";

interface PostHeaderProps {
    post: PostMeta;
    locale: PostLocale;
}

const formatDate = (iso: string, locale: PostLocale): string => {
    try {
        return new Intl.DateTimeFormat(locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(new Date(iso));
    } catch {
        return iso;
    }
};

export const PostHeader = ({
    post,
    locale,
}: PostHeaderProps): React.JSX.Element => {
    const { translations } = useTranslations();
    const data = asTranslations<{ publishedOn: string }>(
        translations.common?.blog
    );

    return (
        <header className={styles.container}>
            <div className={styles.meta}>
                <span>
                    {data?.publishedOn} {formatDate(post.publishedAt, locale)}
                </span>
                {post.tags.length > 0 && (
                    <ul className={styles.tags}>
                        {post.tags.map((tag) => (
                            <li key={tag} className={styles.tag}>
                                {tag}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <h1 className={styles.title}>{post.title}</h1>
            {post.excerpt && (
                <p className={styles.excerpt}>{post.excerpt}</p>
            )}
            {post.coverImage && (
                <div className={styles.coverWrapper}>
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        width={1280}
                        height={720}
                        className={styles.cover}
                        priority
                    />
                </div>
            )}
        </header>
    );
};
