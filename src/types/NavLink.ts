export type IconKey = "ProjectsIcon" | "BlogIcon" | "GithubIcon" | "LinkedinIcon";

export type NavLink = {
    id: number;
    label: string;
    type: "main" | "socials";
    href: string;
    icon: IconKey;
}