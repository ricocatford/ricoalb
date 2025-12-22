import Link from "next/link";
import { BentoCard } from "@/components/layout/cards/BentoCard";
import { BlogSection } from "@/types/HomeSection";
import { LinkIcon } from "@/components/layout/icons/common/LinkIcon";
import styles from "@/assets/styles/components/pages/home/BlogCard.module.css";
import cardStyles from "@/assets/styles/components/layout/cards/BentoCard.module.css";

interface BlogCardProps {
    section: BlogSection;
}

export const BlogCard = ({ section }: BlogCardProps) => {
    return (
        <BentoCard gridArea={section.type}>
            <section className={styles.container}></section>
            <Link href={section.href} className={cardStyles.link}>
                <footer className={cardStyles.footer}>
                    <div className={cardStyles.labelContainer}>
                        <span className={cardStyles.label}>
                            {section.label}
                        </span>
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
