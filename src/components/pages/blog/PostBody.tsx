"use client";

import Markdoc, { type RenderableTreeNode } from "@markdoc/markdoc";
import React from "react";
import styles from "@/assets/styles/components/pages/blog/PostBody.module.css";

interface PostBodyProps {
    content: RenderableTreeNode;
}

export const PostBody = ({ content }: PostBodyProps): React.JSX.Element => {
    const rendered = Markdoc.renderers.react(content, React);
    return <div className={styles.prose}>{rendered}</div>;
};
