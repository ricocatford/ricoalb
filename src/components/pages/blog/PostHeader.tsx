"use client";

import Image from "next/image";
import type { PostLocale, PostMeta } from "@/types/Post";
import styles from "@/assets/styles/components/pages/blog/PostHeader.module.css";

interface BlogTranslations {
    publishedOn?: string;
    minRead?: string;
    authorName?: string;
}

interface PostHeaderProps {
    post: PostMeta & { readTimeMinutes: number };
    locale: PostLocale;
    blogData: BlogTranslations | null;
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

const HexAvatar = (): React.JSX.Element => (
    <span className={styles.avatar} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 100 100" fill="currentColor">
            <polygon
                points="50,8 86,28 86,72 50,92 14,72 14,28"
                opacity="0.25"
            />
            <polygon points="50,24 72,37 72,63 50,76 28,63 28,37" />
        </svg>
    </span>
);

export const PostHeader = ({
    post,
    locale,
    blogData,
}: PostHeaderProps): React.JSX.Element => {
    const readTimeText = blogData?.minRead?.replace(
        "{n}",
        String(post.readTimeMinutes)
    ) ?? `${post.readTimeMinutes} min read`;

    return (
        <header className={styles.container}>
            <span className={styles.categoryPill}>
                <span className={styles.categoryDot} />
                {post.category}
            </span>

            <h1 className={styles.title}>{post.title}</h1>

            {post.excerpt && (
                <p className={styles.excerpt}>{post.excerpt}</p>
            )}

            <div className={styles.byline}>
                <span className={styles.author}>
                    <HexAvatar />
                    {blogData?.authorName ?? "Ricardo Albarenque"}
                </span>
                <span className={styles.sep} aria-hidden="true" />
                <span>{formatDate(post.publishedAt, locale)}</span>
                <span className={styles.sep} aria-hidden="true" />
                <span>{readTimeText}</span>
            </div>

            <div className={styles.hero}>
                {post.coverImage ? (
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        width={1280}
                        height={720}
                        className={styles.heroImg}
                        priority
                    />
                ) : (
                    <div className={styles.heroPlaceholder} aria-hidden="true" />
                )}
                <div className={styles.heroCaption}>
                    {"// "}
                    {post.title} — {post.category}
                </div>
            </div>
        </header>
    );
};
