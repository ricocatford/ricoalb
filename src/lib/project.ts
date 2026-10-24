import type { ProjectLink } from "@/types/Project";

export const isRepoLink = (link: ProjectLink): boolean =>
    /github|repo/i.test(link.label) || /github\.com/i.test(link.href);

export const normalizeImagePath = (raw: string): string =>
    raw.replace(/^(\.\.\/)?public\//, "/");
