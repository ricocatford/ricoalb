import "@/lib/i18nClient";
import { Trans } from "react-i18next";
import Link from "next/link";
import { BentoCard } from "@/components/layout/cards/BentoCard";
import { ContactSection } from "@/types/HomeSection";
import { LinkIcon } from "@/components/layout/icons/common/LinkIcon";
import styles from "@/assets/styles/components/pages/home/ContactCard.module.css";
import cardStyles from "@/assets/styles/components/layout/cards/BentoCard.module.css";

interface ContactCardProps {
    section: ContactSection;
}

export const ContactCard = ({ section }: ContactCardProps) => {
    const renderRichText = (content: string) => (
        <Trans
            defaults={content}
            components={{
                highlight: <span className={styles.highlight} />,
                bold: <span className={styles.bold} />,
            }}
        >
            {content}
        </Trans>
    );

    return (
        <BentoCard gridArea={section.type}>
            <section className={styles.container}>
                <header>
                    <h2 className={styles.heading}>
                        {renderRichText(section.heading)}
                    </h2>
                </header>
                <p className={styles.paragraph}>
                    {renderRichText(section.paragraph)}
                </p>
            </section>
            <Link href={section.href} className={cardStyles.link}>
                <footer className={cardStyles.footer}>
                    <div></div>
                    <span className={cardStyles.icon}>
                        <LinkIcon />
                    </span>
                </footer>
            </Link>
        </BentoCard>
    );
};
