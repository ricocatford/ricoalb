import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/layout/icons/common/ArrowUpRightIcon";
import type { PostLocale, PostMeta } from "@/types/Post";
import styles from "@/assets/styles/components/pages/blog/PostCard.module.css";

interface PostCardProps {
    post: PostMeta;
    index: number;
    locale: PostLocale;
}

const formatShortDate = (iso: string, locale: PostLocale): string => {
    try {
        return new Intl.DateTimeFormat(locale, {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }).format(new Date(iso));
    } catch {
        return iso;
    }
};

export const PostCard = ({
    post,
    index,
    locale,
}: PostCardProps): React.JSX.Element => {
    return (
        <article
            className={styles.card}
            style={{ "--index": index } as React.CSSProperties}
        >
            <Link href={`/blog/${post.slug}`} className={styles.link}>
                <div className={styles.date}>
                    {formatShortDate(post.publishedAt, locale)}
                </div>
                <div className={styles.body}>
                    <h2 className={styles.title}>{post.title}</h2>
                    <div className={styles.sub}>
                        <span className={styles.category}>
                            / {post.category}
                        </span>
                        {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className={styles.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <span className={styles.arrow} aria-hidden="true">
                    <ArrowUpRightIcon width={14} height={14} />
                </span>
            </Link>
        </article>
    );
};
