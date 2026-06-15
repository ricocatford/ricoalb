"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useGlobalStore } from "@/providers/GlobalStoreProvider";
import { useTranslations } from "@/providers/LanguageProvider";
import { asTranslations } from "@/lib/asTranslations";
import { PostHeader } from "./PostHeader";
import { PostBody } from "./PostBody";
import { PostAside } from "./PostAside";
import { PostFooter } from "./PostFooter";
import type { Post, PostMeta, PostLocale } from "@/types/Post";
import styles from "@/assets/styles/components/pages/blog/PostView.module.css";

interface BlogTranslations {
    backToBlog: string;
    onThisPage: string;
    share: string;
    previous: string;
    next: string;
    authorName: string;
    authorBio: string;
    tags: string;
    minRead: string;
    allPosts: string;
}

interface PostViewProps {
    enPost: Post | null;
    esPost: Post | null;
    prevPost: PostMeta | null;
    nextPost: PostMeta | null;
}

const formatBarMeta = (iso: string): string => {
    try {
        const d = new Date(iso);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        return `${year} / ${month}`;
    } catch {
        return iso;
    }
};

export const PostView = ({
    enPost,
    esPost,
    prevPost,
    nextPost,
}: PostViewProps): React.JSX.Element => {
    const language = useGlobalStore((s) => s.language);
    const { translations } = useTranslations();
    const blogData = asTranslations<BlogTranslations>(translations.common?.blog) ?? null;

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const h = document.documentElement;
            const max = h.scrollHeight - h.clientHeight;
            setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const preferred = language === "es" ? esPost : enPost;
    const post = preferred ?? esPost ?? enPost;
    if (!post) return <></>;

    const postLocale: PostLocale =
        preferred === post ? language : enPost ? "en" : "es";

    return (
        <>
            <div
                className={styles.progress}
                style={{ width: `${progress}%` }}
                aria-hidden="true"
            />

            <div className={styles.bar}>
                <Link href="/blog" className={styles.backLink}>
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        className={styles.backArrow}
                    >
                        <path d="M19 12H5" />
                        <path d="M11 18l-6-6 6-6" />
                    </svg>
                    {blogData?.backToBlog ?? "Back to blog"}
                </Link>
                <span className={styles.barMeta}>
                    {formatBarMeta(post.publishedAt)} ·{" "}
                    <em>{post.category}</em>
                </span>
            </div>

            <PostHeader post={post} locale={postLocale} blogData={blogData} />

            <div className={styles.layout}>
                <PostBody content={post.content} />
                <PostAside
                    onThisPage={blogData?.onThisPage ?? "On this page"}
                    share={blogData?.share ?? "Share"}
                />
            </div>

            <PostFooter
                post={post}
                prevPost={prevPost}
                nextPost={nextPost}
                blogData={blogData}
            />
        </>
    );
};
