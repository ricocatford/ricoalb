"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/layout/icons/common/ArrowUpRightIcon";
import type { PostLocale, PostMeta } from "@/types/Post";
import styles from "@/assets/styles/components/pages/blog/FeaturedPost.module.css";

interface FeaturedPostProps {
    post: PostMeta;
    locale: PostLocale;
    featuredLabel: string;
    readArticleLabel: string;
}

const formatLongDate = (iso: string, locale: PostLocale): string => {
    try {
        return new Intl.DateTimeFormat(locale, {
            month: "long",
            day: "numeric",
            year: "numeric",
        }).format(new Date(iso));
    } catch {
        return iso;
    }
};

export const FeaturedPost = ({
    post,
    locale,
    featuredLabel,
    readArticleLabel,
}: FeaturedPostProps): React.JSX.Element => {
    const [imageBroken, setImageBroken] = useState(false);
    const cover = post.coverImage;

    return (
        <article className={styles.card}>
            <Link href={`/blog/${post.slug}`} className={styles.visual}>
                <div className={styles.placeholder} aria-hidden="true" />
                {cover && !imageBroken && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={cover}
                        alt=""
                        className={styles.image}
                        loading="lazy"
                        onError={() => setImageBroken(true)}
                    />
                )}
                <span className={styles.tag}>{featuredLabel}</span>
            </Link>
            <div className={styles.body}>
                <div className={styles.meta}>
                    <span className={styles.category}>/ {post.category}</span>
                    <span>{formatLongDate(post.publishedAt, locale)}</span>
                </div>
                <h2 className={styles.title}>
                    <Link href={`/blog/${post.slug}`} className={styles.titleLink}>
                        {post.title}
                    </Link>
                </h2>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className={styles.readLink}>
                    {readArticleLabel}
                    <ArrowUpRightIcon width={14} height={14} />
                </Link>
            </div>
        </article>
    );
};
