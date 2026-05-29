import "server-only";

import { createReader } from "@keystatic/core/reader";
import Markdoc, { type RenderableTreeNode } from "@markdoc/markdoc";
import keystaticConfig from "../../keystatic.config";
import type { Post, PostLocale, PostMeta } from "@/types/Post";

const reader = createReader(process.cwd(), keystaticConfig);

const collectionFor = (locale: PostLocale) =>
    locale === "en" ? reader.collections.postsEn : reader.collections.postsEs;

const sortByDateDesc = <T extends { publishedAt: string }>(a: T, b: T) =>
    a.publishedAt < b.publishedAt ? 1 : -1;

const toMeta = (
    slug: string,
    entry: {
        title: string;
        publishedAt: string;
        excerpt: string;
        category: string;
        tags: readonly string[];
        coverImage: string | null;
    }
): PostMeta => ({
    slug,
    title: entry.title,
    publishedAt: entry.publishedAt,
    excerpt: entry.excerpt,
    category: entry.category,
    tags: entry.tags,
    coverImage: entry.coverImage,
});

export const getPosts = async (locale: PostLocale): Promise<PostMeta[]> => {
    const entries = await collectionFor(locale).all();
    return entries
        .map(({ slug, entry }) => toMeta(slug, entry))
        .sort(sortByDateDesc);
};

const toRenderableTree = (
    rawContent: { node: unknown } | unknown
): RenderableTreeNode => {
    const ast =
        rawContent && typeof rawContent === "object" && "node" in rawContent
            ? (rawContent as { node: unknown }).node
            : rawContent;
    const transformed = Markdoc.transform(
        ast as Parameters<typeof Markdoc.transform>[0]
    );
    return JSON.parse(JSON.stringify(transformed)) as RenderableTreeNode;
};

export const getPost = async (
    locale: PostLocale,
    slug: string
): Promise<Post | null> => {
    const entry = await collectionFor(locale).read(slug);
    if (!entry) return null;
    const rawContent = await entry.content();
    return { ...toMeta(slug, entry), content: toRenderableTree(rawContent) };
};

export const getAllPostSlugs = async (): Promise<
    Array<{ locale: PostLocale; slug: string }>
> => {
    const [en, es] = await Promise.all([
        reader.collections.postsEn.list(),
        reader.collections.postsEs.list(),
    ]);
    return [
        ...en.map((slug) => ({ locale: "en" as const, slug })),
        ...es.map((slug) => ({ locale: "es" as const, slug })),
    ];
};

export const findPostByAnyLocale = async (
    slug: string,
    preferredLocale: PostLocale
): Promise<{ post: Post; locale: PostLocale } | null> => {
    const preferred = await getPost(preferredLocale, slug);
    if (preferred) return { post: preferred, locale: preferredLocale };
    const fallbackLocale: PostLocale = preferredLocale === "en" ? "es" : "en";
    const fallback = await getPost(fallbackLocale, slug);
    if (fallback) return { post: fallback, locale: fallbackLocale };
    return null;
};
