"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import { useTranslations } from "@/providers/LanguageProvider";
import { asTranslations } from "@/lib/asTranslations";
import { isRepoLink, normalizeImagePath } from "@/lib/project";
import { ArrowUpRightIcon } from "@/components/layout/icons/common/ArrowUpRightIcon";
import type { Project } from "@/types/Project";
import styles from "@/assets/styles/components/pages/home/ProjectsCarousel.module.css";

const MAX_TAGS = 3;

interface PortfolioTranslations {
    projects: Project[];
    actions: {
        live: string;
    };
}

export const ProjectsCarousel = (): React.JSX.Element | null => {
    const { translations } = useTranslations();
    const data = asTranslations<PortfolioTranslations>(
        translations.common?.portfolio
    );
    const projects = data?.projects ?? [];

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const selectedIndex = useSelectedIndex(emblaApi);
    const [brokenImages, setBrokenImages] = useState<number[]>([]);

    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    if (projects.length === 0) {
        return null;
    }

    return (
        <div className={styles.carousel}>
            <div className={styles.viewport} ref={emblaRef}>
                <div className={styles.container}>
                    {projects.map((project, index) => {
                        const liveLink = project.links.find(
                            (link) => !isRepoLink(link)
                        );
                        const showImage = !brokenImages.includes(project.id);
                        return (
                            <article
                                className={styles.slide}
                                key={project.id}
                                aria-roledescription="slide"
                                aria-label={`${index + 1} / ${projects.length}`}
                            >
                                <div
                                    className={styles.placeholder}
                                    aria-hidden="true"
                                />
                                {showImage && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={normalizeImagePath(
                                            project.image_url
                                        )}
                                        alt=""
                                        className={styles.image}
                                        loading="lazy"
                                        onError={() =>
                                            setBrokenImages((ids) => [
                                                ...ids,
                                                project.id,
                                            ])
                                        }
                                    />
                                )}
                                <div
                                    className={styles.overlay}
                                    aria-hidden="true"
                                />
                                {liveLink && (
                                    <a
                                        className={styles.liveLink}
                                        href={liveLink.href}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        aria-label={`${data?.actions.live}: ${project.name}`}
                                        tabIndex={
                                            index === selectedIndex ? 0 : -1
                                        }
                                    >
                                        <ArrowUpRightIcon
                                            width={18}
                                            height={18}
                                        />
                                    </a>
                                )}
                                <div className={styles.content}>
                                    <h3 className={styles.name}>
                                        {project.name}
                                    </h3>
                                    <p className={styles.description}>
                                        {project.description}
                                    </p>
                                    <ul className={styles.tags}>
                                        {project.stack
                                            .slice(0, MAX_TAGS)
                                            .map((tech) => (
                                                <li
                                                    key={tech}
                                                    className={styles.tag}
                                                >
                                                    {tech}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>

            <div className={styles.indicators}>
                {projects.map((project, index) => (
                    <button
                        key={project.id}
                        type="button"
                        className={styles.indicator}
                        data-selected={index === selectedIndex}
                        aria-label={project.name}
                        aria-current={index === selectedIndex}
                        onClick={() => emblaApi?.scrollTo(index)}
                    >
                        {index === selectedIndex && (
                            <span
                                className={styles.indicatorFill}
                                onAnimationEnd={scrollNext}
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

const useSelectedIndex = (emblaApi: EmblaCarouselType | undefined) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = (api: EmblaCarouselType) =>
            setSelectedIndex(api.selectedScrollSnap());

        onSelect(emblaApi);
        emblaApi.on("reInit", onSelect).on("select", onSelect);

        return () => {
            emblaApi.off("reInit", onSelect).off("select", onSelect);
        };
    }, [emblaApi]);

    return selectedIndex;
};
