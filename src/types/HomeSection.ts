export type HomeSection = {
    id: number;
}

export type LabelSection = {
    label: string;
    info: string;
}

export type LinkSection = {
    isLink: true;
    href: string;
}

export type IntroSection = HomeSection & {
    type: "intro";
    heading: string;
    subheading: string;
    location: string;
    paragraph: string;
    button: {
        icon: string;
        label: string;
        href: string;
    }
}

export type AboutSection = HomeSection & LabelSection & LinkSection & {
    type: "about";
}

export type ProjectsSection = HomeSection & LabelSection & LinkSection & {
    type: "projects";
    heading: string;
}

export type StatItem = {
    id: number;
    label: string;
    value: string;
}

export type StatsSection = HomeSection & LabelSection & {
    type: "stats";
    stats: StatItem[];
}

export type ServiceIconKey = "UIUXIcon" | "DesignIcon" | "FrontendIcon" | "BackendIcon" | "SEOIcon";

export type ServiceItem = {
    id: number;
    label: string;
    icon: ServiceIconKey;
    info: string;
}

export type ServicesSection = HomeSection & LabelSection & LinkSection & {
    type: "services";
    services: ServiceItem[];
}

export type SocialIconKey = "LinkedinIcon" | "GithubIcon" | "DiscordIcon";

export type SocialItem = {
    id: number;
    icon: SocialIconKey;
    href: string;
}

export type SocialsSection = HomeSection & LabelSection & {
    type: "socials";
    socials: SocialItem[];
}

export type BlogSection = HomeSection & LabelSection & LinkSection & {
    type: "blog";
}

export type ContactSection = HomeSection & LinkSection & {
    type: "contact";
    heading: string;
    paragraph: string;
}

export type Section =
    IntroSection |
    AboutSection |
    ProjectsSection |
    BlogSection |
    ServicesSection |
    SocialsSection |
    StatsSection |
    ContactSection;

export type HomeData = {
    sections: Section[];
};