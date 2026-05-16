import Link from "next/link";
import { BentoCard } from "@/components/layout/cards/BentoCard";
import { ProjectsSection } from "@/types/HomeSection";
import { LinkIcon } from "@/components/layout/icons/common/LinkIcon";
import styles from "@/assets/styles/components/pages/home/ProjectsCard.module.css";
import cardStyles from "@/assets/styles/components/layout/cards/BentoCard.module.css";
import { Carousel } from "@/components/pages/projects/Carousel";

interface ProjectsCardProps {
    section: ProjectsSection;
}

export const ProjectsCard = ({ section }: ProjectsCardProps) => {
    return (
        <BentoCard gridArea={section.type}>
            <Carousel />
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
