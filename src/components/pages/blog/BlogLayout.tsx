"use client";

import { useMemo, useState } from "react";
import { useGlobalStore } from "@/providers/GlobalStoreProvider";
import { useTranslations } from "@/providers/LanguageProvider";
import { asTranslations } from "@/lib/asTranslations";
import { FeaturedPost } from "./FeaturedPost";
import { PostList } from "./PostList";
import { BlogAside } from "./BlogAside";
import type { PostMeta } from "@/types/Post";
import styles from "@/assets/styles/components/pages/blog/BlogLayout.module.css";

interface BlogLayoutProps {
    enPosts: PostMeta[];
    esPosts: PostMeta[];
}

interface BlogTranslations {
    featured: string;
    readArticle: string;
    noPostsYet: string;
    noMatches: string;
    search: string;
    searchPlaceholder: string;
    categories: string;
    allPosts: string;
    archive: string;
    tags: string;
    postCountOne: string;
    postCountMany: string;
}

const matchesSearch = (post: PostMeta, query: string): boolean => {
    if (!query) return true;
    const needle = query.toLowerCase();
    if (post.title.toLowerCase().includes(needle)) return true;
    if (post.excerpt.toLowerCase().includes(needle)) return true;
    if (post.category.toLowerCase().includes(needle)) return true;
    return post.tags.some((tag) => tag.toLowerCase().includes(needle));
};

const buildCategories = (
    posts: PostMeta[]
): Array<{ label: string; count: number }> => {
    const map = new Map<string, number>();
    for (const post of posts) {
        if (!post.category) continue;
        map.set(post.category, (map.get(post.category) ?? 0) + 1);
    }
    return [...map.entries()]
        .map(([label, count]) => ({ label, count }))
        .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
};

const buildArchive = (
    posts: PostMeta[],
    locale: "en" | "es"
): Array<{ label: string; count: number; key: string }> => {
    const map = new Map<string, { label: string; count: number }>();
    for (const post of posts) {
        const date = new Date(post.publishedAt);
        if (Number.isNaN(date.getTime())) continue;
        const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
        const label = new Intl.DateTimeFormat(locale, {
            month: "long",
            year: "numeric",
        }).format(date);
        const existing = map.get(key);
        if (existing) {
            existing.count += 1;
        } else {
            map.set(key, { label, count: 1 });
        }
    }
    return [...map.entries()]
        .sort((a, b) => (a[0] < b[0] ? 1 : -1))
        .map(([key, value]) => ({ key, ...value }));
};

const buildTagCloud = (posts: PostMeta[]): string[] => {
    const set = new Set<string>();
    for (const post of posts) {
        for (const tag of post.tags) set.add(tag);
    }
    return [...set].sort((a, b) => a.localeCompare(b));
};

export const BlogLayout = ({
    enPosts,
    esPosts,
}: BlogLayoutProps): React.JSX.Element => {
    const language = useGlobalStore((state) => state.language);
    const { translations } = useTranslations();
    const data = asTranslations<BlogTranslations>(translations.common?.blog);

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );

    const posts = language === "es" ? esPosts : enPosts;

    const categories = useMemo(() => buildCategories(posts), [posts]);
    const archive = useMemo(
        () => buildArchive(posts, language),
        [posts, language]
    );
    const tagCloud = useMemo(() => buildTagCloud(posts), [posts]);

    const isFiltering = search.length > 0 || selectedCategory !== null;

    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            if (selectedCategory && post.category !== selectedCategory) {
                return false;
            }
            return matchesSearch(post, search);
        });
    }, [posts, search, selectedCategory]);

    const featured = !isFiltering ? posts[0] : null;
    const listPosts = isFiltering ? filteredPosts : posts.slice(1);

    const asideTranslations = {
        search: data?.search ?? "Search",
        searchPlaceholder: data?.searchPlaceholder ?? "",
        categories: data?.categories ?? "Categories",
        allPosts: data?.allPosts ?? "All posts",
        archive: data?.archive ?? "Archive",
        tags: data?.tags ?? "Tags",
        postCountOne: data?.postCountOne ?? "{n} post",
        postCountMany: data?.postCountMany ?? "{n} posts",
    };

    return (
        <>
            <div className={styles.grid}>
                <section className={styles.main}>
                    {featured && (
                        <FeaturedPost
                            post={featured}
                            locale={language}
                            featuredLabel={data?.featured ?? "Featured"}
                            readArticleLabel={data?.readArticle ?? "Read"}
                        />
                    )}

                    {listPosts.length > 0 ? (
                        <PostList posts={listPosts} locale={language} />
                    ) : (
                        <p className={styles.empty}>
                            {isFiltering ? data?.noMatches : data?.noPostsYet}
                        </p>
                    )}
                </section>

                <BlogAside
                    translations={asideTranslations}
                    searchValue={search}
                    onSearchChange={setSearch}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                    archive={archive.map(({ label, count }) => ({
                        label,
                        count,
                    }))}
                    tags={tagCloud}
                    totalCount={posts.length}
                />
            </div>
        </>
    );
};
