"use client";

import { useGlobalStore } from "@/providers/GlobalStoreProvider";
import { PostHeader } from "./PostHeader";
import { PostBody } from "./PostBody";
import type { Post, PostLocale } from "@/types/Post";

interface PostViewProps {
    enPost: Post | null;
    esPost: Post | null;
}

export const PostView = ({
    enPost,
    esPost,
}: PostViewProps): React.JSX.Element => {
    const language = useGlobalStore((s) => s.language);

    const preferred = language === "es" ? esPost : enPost;
    const post = preferred ?? esPost ?? enPost;
    if (!post) return <></>;

    const postLocale: PostLocale =
        preferred === post ? language : enPost ? "en" : "es";

    return (
        <article>
            <PostHeader post={post} locale={postLocale} />
            <PostBody content={post.content} />
        </article>
    );
};
