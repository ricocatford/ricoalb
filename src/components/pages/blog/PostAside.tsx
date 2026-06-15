"use client";

import { useEffect, useState } from "react";
import styles from "@/assets/styles/components/pages/blog/PostAside.module.css";

interface TocItem {
    id: string;
    label: string;
    level: number;
}

interface PostAsideProps {
    onThisPage: string;
    share: string;
}

export const PostAside = ({
    onThisPage,
    share,
}: PostAsideProps): React.JSX.Element => {
    const [toc, setToc] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState("");

    // Build TOC from rendered headings
    useEffect(() => {
        const els = Array.from(
            document.querySelectorAll<HTMLElement>("h2[id], h3[id]")
        );

        const items: TocItem[] = els.map((el) => ({
                id: el.id,
                label: el.textContent ?? "",
                level: Number(el.tagName[1]),
            }));

        setToc(items);
        if (items.length > 0) setActiveId(items[0].id);
    }, []);

    // Track active heading on scroll
    useEffect(() => {
        if (toc.length === 0) return;

        const onScroll = () => {
            let current = toc[0]?.id ?? "";
            toc.forEach(({ id }) => {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top < 160) {
                    current = id;
                }
            });
            setActiveId(current);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, [toc]);

    const jump = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
    };

    const copyLink = () => {
        if (navigator.clipboard) navigator.clipboard.writeText(window.location.href);
    };

    return (
        <aside className={styles.aside}>
            {toc.length > 0 && (
                <nav className={styles.toc} aria-label={onThisPage}>
                    <h5 className={styles.tocTitle}>{onThisPage}</h5>
                    <div className={styles.tocList}>
                        {toc.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={jump(item.id)}
                                className={`${styles.tocLink} ${item.level === 3 ? styles.tocSub : ""} ${activeId === item.id ? styles.tocActive : ""}`}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </nav>
            )}

            <div className={styles.shareBlock}>
                <h5 className={styles.tocTitle}>{share}</h5>
                <div className={styles.shareRow}>
                    <a
                        className={styles.shareBtn}
                        href={`https://x.com/intent/post?url=${typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ""}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        title="Share on X"
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2H21.5l-7.34 8.39L23 22h-6.797l-5.327-6.96L4.78 22H1.522l7.85-8.97L1 2h6.93l4.815 6.36L18.244 2z" />
                        </svg>
                    </a>
                    <a
                        className={styles.shareBtn}
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ""}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        title="Share on LinkedIn"
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <rect x="3" y="3" width="18" height="18" rx="3" />
                            <line x1="7.5" y1="10" x2="7.5" y2="17" />
                            <circle cx="7.5" cy="6.8" r="1.1" fill="currentColor" />
                            <path d="M11.5 17v-5a2.5 2.5 0 0 1 5 0v5" />
                            <line x1="11.5" y1="10" x2="11.5" y2="17" />
                        </svg>
                    </a>
                    <button
                        className={styles.shareBtn}
                        onClick={copyLink}
                        title="Copy link"
                        type="button"
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
                            <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
                        </svg>
                    </button>
                </div>
            </div>
        </aside>
    );
};
