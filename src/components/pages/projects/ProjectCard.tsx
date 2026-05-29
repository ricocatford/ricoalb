"use client";

import { useState } from "react";
import { ArrowUpRightIcon } from "@/components/layout/icons/common/ArrowUpRightIcon";
import { GithubIcon } from "@/components/layout/icons/navbar/GithubIcon";
import type { Project, ProjectLink } from "@/types/Project";
import styles from "@/assets/styles/components/pages/projects/ProjectCard.module.css";

interface ProjectCardProps {
    project: Project;
    index: number;
    liveLabel: string;
    repositoryLabel: string;
}

const isRepoLink = (link: ProjectLink): boolean =>
    /github|repo/i.test(link.label) || /github\.com/i.test(link.href);

const normalizeImagePath = (raw: string): string =>
    raw.replace(/^(\.\.\/)?public\//, "/");

export const ProjectCard = ({
    project,
    index,
    liveLabel,
    repositoryLabel,
}: ProjectCardProps): React.JSX.Element => {
    const [imageBroken, setImageBroken] = useState(false);
    const repoLink = project.links.find(isRepoLink);
    const liveLink = project.links.find((link) => !isRepoLink(link));
    const imageSrc = normalizeImagePath(project.image_url);

    const reversed = index % 2 === 1;

    return (
        <article
            className={`${styles.card}${reversed ? ` ${styles.cardReversed}` : ""}`}
            style={{ "--index": index } as React.CSSProperties}
        >
            <div className={styles.info}>
                <h2 className={styles.name}>{project.name}</h2>
                <p className={styles.description}>{project.description}</p>
                <ul className={styles.stack}>
                    {project.stack.map((tech, techIndex) => (
                        <li
                            key={tech}
                            className={`${styles.tag}${techIndex === 0 ? ` ${styles.tagAccent}` : ""}`}
                        >
                            {tech}
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.visual}>
                <div className={styles.placeholder} aria-hidden="true" />
                {!imageBroken && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={imageSrc}
                        alt=""
                        className={styles.image}
                        loading="lazy"
                        onError={() => setImageBroken(true)}
                    />
                )}
                <div className={styles.overlay} aria-hidden="true" />
                <div className={styles.actions}>
                    {liveLink && (
                        <a
                            className={`${styles.actionBtn} ${styles.actionPrimary}`}
                            href={liveLink.href}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <ArrowUpRightIcon width={20} height={20} />
                            {liveLabel}
                        </a>
                    )}
                    {repoLink && (
                        <a
                            className={styles.actionBtn}
                            href={repoLink.href}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <GithubIcon width={20} height={20} />
                            {repositoryLabel}
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
};
