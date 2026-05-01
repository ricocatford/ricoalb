"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "@/providers/LanguageProvider";
import { Project } from "@/types/Project";
import { EmblaCarouselType } from "embla-carousel";
import { DotButton } from "./CarouselDotButton";
import useEmblaCarousel from "embla-carousel-react";
import styles from "@/assets/styles/components/pages/projects/Carousel.module.css";

export const Carousel = (): React.JSX.Element => {
    const { translations } = useTranslations();
    const projectsData = (translations.common?.portfolio as any)?.projects as
        | Project[]
        | undefined;
    const projects = projectsData || [];

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi);

    if (projects.length === 0) {
        return <div className="embla__fallback">Loading projects...</div>;
    }

    return (
        <div className={styles.carousel}>
            <div className={styles.viewport} ref={emblaRef}>
                <div className={styles.container}>
                    {projects.map((project) => (
                        <div className={styles.slide} key={project.id}>
                            <h3>{project?.name}</h3>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.controls}>
                <div className={styles.dots}>
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            isSelected={index === selectedIndex}
                            className={styles.dot}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const useDotButton = (emblaApi: EmblaCarouselType | undefined) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onDotButtonClick = useCallback(
        (index: number) => {
            if (!emblaApi) return;
            emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

    const updateSnaps = useCallback((api: EmblaCarouselType) => {
        setScrollSnaps(api.scrollSnapList());
    }, []);

    const updateIndex = useCallback((api: EmblaCarouselType) => {
        setSelectedIndex(api.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        updateSnaps(emblaApi);
        updateIndex(emblaApi);

        emblaApi.on("reInit", updateSnaps);
        emblaApi.on("reInit", updateIndex);
        emblaApi.on("select", updateIndex);

        return () => {
            emblaApi.off("reInit", updateSnaps);
            emblaApi.off("reInit", updateIndex);
            emblaApi.off("select", updateIndex);
        };
    }, [emblaApi, updateSnaps, updateIndex]);

    return { selectedIndex, scrollSnaps, onDotButtonClick };
};
