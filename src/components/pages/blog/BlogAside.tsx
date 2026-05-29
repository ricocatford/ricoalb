"use client";

import styles from "@/assets/styles/components/pages/blog/BlogAside.module.css";

export interface CategoryItem {
    label: string;
    count: number;
}

export interface ArchiveItem {
    label: string;
    count: number;
}

interface BlogAsideTranslations {
    search: string;
    searchPlaceholder: string;
    categories: string;
    allPosts: string;
    archive: string;
    tags: string;
    postCountOne: string;
    postCountMany: string;
}

interface BlogAsideProps {
    translations: BlogAsideTranslations;
    searchValue: string;
    onSearchChange: (value: string) => void;
    categories: CategoryItem[];
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
    archive: ArchiveItem[];
    tags: string[];
    totalCount: number;
}

const formatCount = (n: number, one: string, many: string): string =>
    (n === 1 ? one : many).replace("{n}", String(n));

export const BlogAside = ({
    translations,
    searchValue,
    onSearchChange,
    categories,
    selectedCategory,
    onSelectCategory,
    archive,
    tags,
    totalCount,
}: BlogAsideProps): React.JSX.Element => {
    return (
        <aside className={styles.aside}>
            <section className={styles.card}>
                <h5 className={styles.title}>{translations.search}</h5>
                <div className={styles.searchBox}>
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={styles.searchIcon}
                        aria-hidden="true"
                    >
                        <circle cx="11" cy="11" r="7" />
                        <path d="M21 21l-4-4" />
                    </svg>
                    <input
                        className={styles.searchInput}
                        placeholder={translations.searchPlaceholder}
                        value={searchValue}
                        onChange={(event) => onSearchChange(event.target.value)}
                        aria-label={translations.search}
                    />
                    <kbd className={styles.kbd}>⌘K</kbd>
                </div>
            </section>

            {categories.length > 0 && (
                <section className={styles.card}>
                    <h5 className={styles.title}>{translations.categories}</h5>
                    <ul className={styles.catList}>
                        <li>
                            <button
                                type="button"
                                onClick={() => onSelectCategory(null)}
                                className={`${styles.catItem}${selectedCategory === null ? ` ${styles.catItemActive}` : ""}`}
                            >
                                <span>{translations.allPosts}</span>
                                <span className={styles.count}>
                                    {totalCount}
                                </span>
                            </button>
                        </li>
                        {categories.map((category) => (
                            <li key={category.label}>
                                <button
                                    type="button"
                                    onClick={() =>
                                        onSelectCategory(category.label)
                                    }
                                    className={`${styles.catItem}${selectedCategory === category.label ? ` ${styles.catItemActive}` : ""}`}
                                >
                                    <span>{category.label}</span>
                                    <span className={styles.count}>
                                        {category.count}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {archive.length > 0 && (
                <section className={styles.card}>
                    <h5 className={styles.title}>{translations.archive}</h5>
                    <ul className={styles.archiveList}>
                        {archive.map((month) => (
                            <li key={month.label} className={styles.archiveItem}>
                                <span className={styles.archiveLabel}>
                                    {month.label}
                                </span>
                                <span className={styles.count}>
                                    {formatCount(
                                        month.count,
                                        translations.postCountOne,
                                        translations.postCountMany
                                    )}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {tags.length > 0 && (
                <section className={styles.card}>
                    <h5 className={styles.title}>{translations.tags}</h5>
                    <ul className={styles.tagCloud}>
                        {tags.map((tag) => (
                            <li key={tag} className={styles.tagPill}>
                                #{tag.toLowerCase()}
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </aside>
    );
};
