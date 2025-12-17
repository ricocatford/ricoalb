export type LinkIconKey = "ProjectsIcon" | "ServicesIcon" | "AboutIcon" | "BlogIcon" | "ContactIcon" | "LinkedinIcon" | "GithubIcon" | "DiscordIcon";

export type NavLink = {
    id: number;
    label: string;
    type: "main" | "social";
    href: string;
    icon: LinkIconKey;
}

export type ActionIconKey = "ThemeIcon" | "LanguageIcon";

export type NavAction = {
    id: number;
    label: string;
    type: "settings";
    icon: ActionIconKey;
    options: NavThemeOption[] | NavLanguageOption[];
}

export type ThemeOptionIconKey = "DarkIcon" | "LightIcon";

export type NavThemeOption = {
    id: number;
    label: string;
    value: "dark" | "light";
    icon: ThemeOptionIconKey;
}

export type NavLanguageOption = {
    id: number;
    label: string;
    value: "en" | "es";
}

export type NavConfig = NavLink | NavAction;