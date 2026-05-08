import { Translations } from "@/types/Translations";

export function asTranslations<T>(
    value: string | Translations | undefined
): T | undefined {
    return typeof value === "object" && value !== null ? (value as T) : undefined;
}