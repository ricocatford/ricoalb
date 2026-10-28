export type ServiceIconKey = "UIUXIcon" | "DesignIcon" | "FrontendIcon" | "BackendIcon" | "InfraIcon" | "SEOIcon";

export type Service = {
    id: number;
    icon: ServiceIconKey;
    heading: string;
    paragraph: string;
}