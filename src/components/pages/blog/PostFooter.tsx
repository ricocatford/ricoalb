"use client";

import Link from "next/link";
import type { Post, PostMeta } from "@/types/Post";
import styles from "@/assets/styles/components/pages/blog/PostFooter.module.css";

interface BlogTranslations {
    tags?: string;
    authorName?: string;
    authorBio?: string;
    previous?: string;
    next?: string;
    allPosts?: string;
}

interface PostFooterProps {
    post: Post;
    prevPost: PostMeta | null;
    nextPost: PostMeta | null;
    blogData: BlogTranslations | null;
}

const BigHexAvatar = (): React.JSX.Element => (
    <span className={styles.bigAvatar} aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 100 100" fill="currentColor">
            <polygon
                points="50,8 86,28 86,72 50,92 14,72 14,28"
                opacity="0.25"
            />
            <polygon points="50,24 72,37 72,63 50,76 28,63 28,37" />
        </svg>
    </span>
);

export const PostFooter = ({
    post,
    prevPost,
    nextPost,
    blogData,
}: PostFooterProps): React.JSX.Element => {
    const tagsLabel = blogData?.tags ?? "Tags";
    const authorName = blogData?.authorName ?? "Ricardo Albarenque";
    const authorBio = blogData?.authorBio ?? "";
    const prevLabel = blogData?.previous ?? "Previous";
    const nextLabel = blogData?.next ?? "Next";
    const allLabel = blogData?.allPosts ?? "All posts";

    return (
        <footer className={styles.footer}>
            {post.tags.length > 0 && (
                <div className={styles.tags}>
                    <span className={styles.tagsLabel}>{tagsLabel}</span>
                    {post.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            <div className={styles.authorCard}>
                <BigHexAvatar />
                <div className={styles.authorInfo}>
                    <h4 className={styles.authorName}>{authorName}</h4>
                    {authorBio && (
                        <p className={styles.authorBio}>{authorBio}</p>
                    )}
                </div>
            </div>

            <div className={styles.postNav}>
                <Link
                    href={prevPost ? `/blog/${prevPost.slug}` : "/blog"}
                    className={`${styles.navLink} ${styles.navPrev}`}
                >
                    <span className={styles.navDir}>← {prevLabel}</span>
                    <span className={styles.navTitle}>
                        {prevPost
                            ? prevPost.title
                            : blogData?.allPosts ?? "Browse all posts"}
                    </span>
                </Link>
                <Link
                    href={nextPost ? `/blog/${nextPost.slug}` : "/blog"}
                    className={`${styles.navLink} ${styles.navNext}`}
                >
                    <span className={styles.navDir}>{nextLabel} →</span>
                    <span className={styles.navTitle}>
                        {nextPost ? nextPost.title : allLabel}
                    </span>
                </Link>
            </div>
        </footer>
    );
};
