"use client";

import {
    useEffect,
    type ReactNode,
    createContext,
    useContext,
    useState,
    useCallback,
} from "react";
import { useGlobalStore } from "@/providers/GlobalStoreProvider";
import { NavConfig } from "@/types/NavConfig";
import { Translations } from "@/types/Translations";

type CombinedTranslations = {
    nav: NavConfig[];
    common: Translations;
};

const TranslationContext = createContext<CombinedTranslations>({
    nav: [],
    common: {},
});

type LanguageProviderProps = {
    children: ReactNode;
};

const safeImport = async <T,>(
    locale: string,
    file: string,
    fallbackLocale: string
): Promise<T> => {
    try {
        const importedModule = await import(`@/locales/${locale}/${file}.json`);
        return importedModule.default as T;
    } catch (error) {
        console.error(
            `Failed to load ${file} for locale: ${locale}. Falling back to ${fallbackLocale}.`,
            error
        );
        const fallbackModule = await import(
            `@/locales/${fallbackLocale}/${file}.json`
        );
        return fallbackModule.default as T;
    }
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
    const currentLanguage = useGlobalStore((state) => state.language);

    const [translations, setTranslations] = useState<CombinedTranslations>(
        () => ({
            nav: [],
            common: {},
        })
    );

    const loadTranslations = useCallback(async (locale: string) => {
        const fallbackLocale = "en";

        try {
            const commonTranslations = await safeImport<Translations>(
                locale,
                "common",
                fallbackLocale
            );

            const navTranslations = await safeImport<NavConfig[]>(
                locale,
                "nav",
                fallbackLocale
            );

            setTranslations({
                nav: navTranslations,
                common: commonTranslations,
            });
        } catch (error) {
            console.error("Critical error loading all translations.", error);
            setTranslations({ nav: [], common: {} });
        }
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        root.setAttribute("lang", currentLanguage);
        loadTranslations(currentLanguage);
    }, [currentLanguage, loadTranslations]);

    return (
        <TranslationContext.Provider value={translations}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslations = () => {
    const translations = useContext(TranslationContext);

    const t = (key: string): string => {
        const keys = key.split(".");
        let current: Translations | string | NavConfig[] | undefined =
            translations.common;

        for (const k of keys) {
            if (
                current &&
                typeof current === "object" &&
                !Array.isArray(current) &&
                k in current
            ) {
                current = (current as Translations)[k];
            } else {
                return key;
            }
        }
        return typeof current === "string" ? current : key;
    };

    return { t, translations };
};
