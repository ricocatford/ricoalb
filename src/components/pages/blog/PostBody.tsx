"use client";

import { useEffect, useRef, useState } from "react";
import Markdoc, { type RenderableTreeNode } from "@markdoc/markdoc";
import React from "react";
import styles from "@/assets/styles/components/pages/blog/PostBody.module.css";

interface PostBodyProps {
    content: RenderableTreeNode;
}

const slugify = (text: string): string =>
    text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");

const extractText = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (React.isValidElement(node)) {
        return extractText((node.props as { children?: React.ReactNode }).children);
    }
    return "";
};

const CodeBlock = ({
    children,
    language,
}: {
    children?: string;
    language?: string;
}): React.JSX.Element => {
    const [copied, setCopied] = useState(false);
    const code = typeof children === "string" ? children : "";

    const copy = () => {
        if (navigator.clipboard) navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
    };

    return (
        <div className={styles.codeBlock}>
            <div className={styles.codeHead}>
                <div className={styles.codeLeft}>
                    <div className={styles.codeDots}>
                        <span />
                        <span />
                        <span />
                    </div>
                    {language && (
                        <span className={styles.codeName}>{language}</span>
                    )}
                </div>
                <button className={styles.copyBtn} onClick={copy} type="button">
                    {copied ? (
                        <>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                                <path d="M5 13l4 4L19 7" />
                            </svg>
                            Copied
                        </>
                    ) : (
                        <>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="11" height="11" rx="2" />
                                <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                            </svg>
                            Copy
                        </>
                    )}
                </button>
            </div>
            <pre className={styles.codePre}>
                <code>{code}</code>
            </pre>
        </div>
    );
};

const makeHeading = (level: 2 | 3) => {
    const Heading = ({
        children,
    }: {
        children?: React.ReactNode;
    }): React.JSX.Element => {
        const id = slugify(extractText(children));
        const Tag = `h${level}` as "h2" | "h3";
        return <Tag id={id}>{children}</Tag>;
    };
    Heading.displayName = `Heading${level}`;
    return Heading;
};

const COMPONENTS = {
    Fence: CodeBlock,
    fence: CodeBlock,
    Heading2: makeHeading(2),
    Heading3: makeHeading(3),
};

export const PostBody = ({ content }: PostBodyProps): React.JSX.Element => {
    const proseRef = useRef<HTMLDivElement>(null);

    // Inject IDs on headings that didn't get them via custom components
    useEffect(() => {
        const el = proseRef.current;
        if (!el) return;
        el.querySelectorAll<HTMLElement>("h2, h3").forEach((heading) => {
            if (!heading.id) {
                heading.id = slugify(heading.textContent ?? "");
            }
        });
    }, [content]);

    const rendered = Markdoc.renderers.react(content, React, {
        components: COMPONENTS,
    });

    return (
        <div className={styles.prose} ref={proseRef}>
            {rendered}
        </div>
    );
};
