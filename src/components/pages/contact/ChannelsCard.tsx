"use client";

import { EmailIcon } from "@/components/layout/icons/navbar/EmailIcon";
import { LinkedinIcon } from "@/components/layout/icons/navbar/LinkedinIcon";
import { GithubIcon } from "@/components/layout/icons/navbar/GithubIcon";
import { DiscordIcon } from "@/components/layout/icons/navbar/DiscordIcon";
import { useTranslations } from "@/providers/LanguageProvider";
import { asTranslations } from "@/lib/asTranslations";
import type { Translations } from "@/types/Translations";
import styles from "@/assets/styles/components/pages/contact/ChannelsCard.module.css";

type ChannelKey = "email" | "linkedin" | "github" | "discord";

interface ChannelsTranslations {
    heading: string;
    footer: string;
    items: Record<ChannelKey, string>;
}

interface HeroSocial {
    id: number;
    icon: string;
    href: string;
}

interface HeroEntry {
    type?: string;
    socials?: HeroSocial[];
}

interface HeroBlock {
    list?: HeroEntry[];
}

const ICONS: Record<ChannelKey, React.JSX.Element> = {
    email: <EmailIcon width={28} height={28} />,
    linkedin: <LinkedinIcon width={28} height={28} />,
    github: <GithubIcon width={28} height={28} />,
    discord: <DiscordIcon width={28} height={28} />,
};

const ICON_KEY_TO_CHANNEL: Record<string, ChannelKey> = {
    LinkedinIcon: "linkedin",
    GithubIcon: "github",
    DiscordIcon: "discord",
};

export const ChannelsCard = (): React.JSX.Element => {
    const { translations } = useTranslations();
    const contact = asTranslations<Translations>(translations.common?.contact);
    const data = asTranslations<ChannelsTranslations>(contact?.channels);
    const email = typeof contact?.email === "string" ? contact.email : "";

    const hero = translations.common?.hero as unknown as HeroBlock | undefined;
    const socials =
        hero?.list?.find((entry) => entry.type === "socials")?.socials ?? [];

    const hrefFor = (channel: ChannelKey): string => {
        if (channel === "email") return email ? `mailto:${email}` : "#";
        const match = socials.find(
            (item) => ICON_KEY_TO_CHANNEL[item.icon] === channel
        );
        return match?.href ?? "#";
    };

    const order: ChannelKey[] = ["email", "github", "linkedin", "discord"];

    return (
        <section className={styles.card}>
            <h2 className={styles.heading}>{data?.heading}</h2>
            <ul className={styles.grid}>
                {order.map((channel) => (
                    <li key={channel}>
                        <a
                            className={styles.channel}
                            href={hrefFor(channel)}
                            target={channel === "email" ? undefined : "_blank"}
                            rel={
                                channel === "email"
                                    ? undefined
                                    : "noreferrer noopener"
                            }
                        >
                            <span className={styles.iconContainer}>
                                <span className={styles.icon}>
                                    {ICONS[channel]}
                                </span>
                            </span>
                            <span className={styles.label}>
                                {data?.items?.[channel]}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
            <footer className={styles.footer}>
                <span>{email}</span>
                <span className={styles.footerLink}>{data?.footer}</span>
            </footer>
        </section>
    );
};
