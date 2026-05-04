export type ServiceIconKey = "UIUXIcon" | "DesignIcon" | "FrontendIcon" | "BackendIcon" | "SEOIcon";

export type Service = {
    id: number;
    icon: ServiceIconKey;
    heading: string;
    paragraph: string;
}