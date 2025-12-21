"use client";

import { useTranslations } from "@/providers/LanguageProvider";
import { HomeData, Section } from "@/types/HomeSection";
import { IntroCard } from "./IntroCard";
import styles from "@/assets/styles/components/pages/home/Hero.module.css";
import { AboutCard } from "./AboutCard";
import { ProjectsCard } from "./ProjectsCard";
import { BlogCard } from "./BlogCard";
import { ServicesCard } from "./ServicesCard";
import { SocialsCard } from "./SocialsCard";
import { StatsCard } from "./StatsCard";
import { ContactCard } from "./ContactCard";

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
                        case "about":
                            return (
                                <AboutCard key={section.id} section={section} />
                            );
                        case "projects":
                            return (
                                <ProjectsCard
                                    key={section.id}
                                    section={section}
                                />
                            );
                        case "stats":
                            return (
                                <StatsCard key={section.id} section={section} />
                            );
                        case "services":
                            return (
                                <ServicesCard
                                    key={section.id}
                                    section={section}
                                />
                            );
                        case "socials":
                            return (
                                <SocialsCard
                                    key={section.id}
                                    section={section}
                                />
                            );
                        case "blog":
                            return (
                                <BlogCard key={section.id} section={section} />
                            );
                        case "contact":
                            return (
                                <ContactCard
                                    key={section.id}
                                    section={section}
                                />
                            );
                        default:
                            return null;
                    }
                })}
            </div>
        </section>
    );
};
