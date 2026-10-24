import Link from "next/link";
import { BentoCard } from "@/components/layout/cards/BentoCard";
import { ProjectsSection } from "@/types/HomeSection";
import { LinkIcon } from "@/components/layout/icons/common/LinkIcon";
import { ProjectsCarousel } from "@/components/pages/home/ProjectsCarousel";
import cardStyles from "@/assets/styles/components/layout/cards/BentoCard.module.css";

interface ProjectsCardProps {
    section: ProjectsSection;
}

export const ProjectsCard = ({ section }: ProjectsCardProps) => {
    return (
        <BentoCard gridArea={section.type}>
            <ProjectsCarousel />
            <Link href={section.href} className={cardStyles.link}>
                <footer className={cardStyles.footer}>
                    <h2 className={cardStyles.label}>{section.label}</h2>
                    <span className={cardStyles.icon}>
                        <LinkIcon />
                    </span>
                </footer>
            </Link>
        </BentoCard>
    );
};
