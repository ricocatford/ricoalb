export type IconKey = "ProjectsIcon" | "BlogIcon" | "LinkedinIcon" | "GithubIcon" | "DiscordIcon";

export type NavLink = {
    id: number;
    label: string;
    type: "main" | "socials";
    href: string;
    icon: IconKey;
}