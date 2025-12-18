"use client";

import { useTranslations } from "@/providers/LanguageProvider";
import { HomeData, Section } from "@/types/HomeSection";
import { IntroCard } from "./IntroCard";
import styles from "@/assets/styles/components/pages/home/Hero.module.css";

export const Hero = (): React.JSX.Element => {
    const { translations } = useTranslations();
    const data = translations.common.home as unknown as HomeData;

    if (!data) return <></>;

    return (
        <section className="container">
            <div className={styles.grid}>
                {data.sections.map((section: Section) => {
                    switch (section.type) {
                        case "intro":
                            return (
                                <IntroCard key={section.id} section={section} />
                            );
                        default:
                            return null;
                    }
                })}
            </div>
        </section>
    );
};
