import Link from "next/link";
import { BentoCard } from "@/components/layout/cards/BentoCard";
import { ProjectsSection } from "@/types/HomeSection";
import { LinkIcon } from "@/components/layout/icons/common/LinkIcon";
import styles from "@/assets/styles/components/pages/home/ProjectsCard.module.css";
import cardStyles from "@/assets/styles/components/layout/cards/BentoCard.module.css";

interface ProjectsCardProps {
    section: ProjectsSection;
}

export const ProjectsCard = ({ section }: ProjectsCardProps) => {
    return (
        <BentoCard gridArea={section.type}>
            <div className={styles.container}>
                <h3 className={styles.heading}>{section.heading}</h3>
            </div>
            <Link href={section.href} className={cardStyles.link}>
                <footer className={cardStyles.footer}>
                    <div className={cardStyles.labelContainer}>
                        <h2 className={cardStyles.label}>{section.label}</h2>
                        <span className={cardStyles.info}>{section.info}</span>
                    </div>
                    <span className={cardStyles.icon}>
                        <LinkIcon />
                    </span>
                </footer>
            </Link>
        </BentoCard>
    );
};
