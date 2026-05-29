import { PostCard } from "./PostCard";
import type { PostLocale, PostMeta } from "@/types/Post";
import styles from "@/assets/styles/components/pages/blog/PostList.module.css";

interface PostListProps {
    posts: PostMeta[];
    locale: PostLocale;
}

export const PostList = ({
    posts,
    locale,
}: PostListProps): React.JSX.Element => {
    return (
        <div className={styles.list}>
            {posts.map((post, index) => (
                <PostCard
                    key={post.slug}
                    post={post}
                    index={index}
                    locale={locale}
                />
            ))}
        </div>
    );
};
