export type IconKey = "ProjectsIcon" | "ServicesIcon" | "AboutIcon" | "BlogIcon" | "ContactIcon" | "LinkedinIcon" | "GithubIcon" | "DiscordIcon";

export type NavLink = {
    id: number;
    label: string;
    type: "main" | "social";
    href: string;
    icon: IconKey;
}