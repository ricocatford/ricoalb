import type { RenderableTreeNode } from "@markdoc/markdoc";

export type PostLocale = "en" | "es";

export type PostMeta = {
    slug: string;
    title: string;
    publishedAt: string;
    excerpt: string;
    category: string;
    tags: readonly string[];
    coverImage: string | null;
};

export type Post = PostMeta & {
    content: RenderableTreeNode;
    readTimeMinutes: number;
};
