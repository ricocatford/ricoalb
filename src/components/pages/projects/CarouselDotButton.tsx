import { ComponentPropsWithRef, useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";

export const useDotButton = (emblaApi: EmblaCarouselType | undefined) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onDotButtonClick = useCallback(
        (index: number) => {
            if (!emblaApi) return;
            emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

    const onInit = useCallback((api: EmblaCarouselType) => {
        setScrollSnaps(api.scrollSnapList());
    }, []);

    const onSelect = useCallback((api: EmblaCarouselType) => {
        setSelectedIndex(api.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        onInit(emblaApi);
        onSelect(emblaApi);

        emblaApi
            .on("reInit", onInit)
            .on("reInit", onSelect)
            .on("select", onSelect);

        return () => {
            emblaApi
                .off("reInit", onInit)
                .off("reInit", onSelect)
                .off("select", onSelect);
        };
    }, [emblaApi, onInit, onSelect]);

    return {
        selectedIndex,
        scrollSnaps,
        onDotButtonClick,
    };
};

type Props = ComponentPropsWithRef<"button"> & {
    isSelected: boolean;
};

export const DotButton: React.FC<Props> = ({
    isSelected,
    className,
    ...restProps
}) => {
    return (
        <button
            type="button"
            data-selected={isSelected}
            className={className}
            {...restProps}
        />
    );
};
