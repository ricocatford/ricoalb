"use client";

import { useTranslations } from "@/providers/LanguageProvider";
import { asTranslations } from "@/lib/asTranslations";
import { ProjectCard } from "@/components/pages/projects/ProjectCard";
import type { Project } from "@/types/Project";
import styles from "@/assets/styles/components/pages/projects/ProjectsList.module.css";

interface PortfolioTranslations {
    projects: Project[];
    actions: {
        live: string;
        repository: string;
    };
}

export const ProjectsList = (): React.JSX.Element | null => {
    const { translations } = useTranslations();
    const data = asTranslations<PortfolioTranslations>(
        translations.common?.portfolio
    );

    if (!data?.projects?.length) {
        return null;
    }

    return (
        <ul className={styles.list}>
            {data.projects.map((project, index) => (
                <li key={project.id} className={styles.item}>
                    <ProjectCard
                        project={project}
                        index={index}
                        liveLabel={data.actions?.live ?? "Live preview"}
                        repositoryLabel={
                            data.actions?.repository ?? "Repository"
                        }
                    />
                </li>
            ))}
        </ul>
    );
};
