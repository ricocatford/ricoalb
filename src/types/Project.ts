export interface ProjectLink {
    id: number;
    label: string;
    href: string;
}

export interface Project {
    id: number;
    name: string;
    description: string;
    stack: string[];
    image_url: string;
    links: ProjectLink[];
}
