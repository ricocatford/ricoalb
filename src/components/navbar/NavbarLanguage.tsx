import { useEffect, useState } from "react";
import { useGlobalStore } from "@/providers/GlobalStoreProvider";
import { useTranslations } from "@/providers/LanguageProvider";
import {
    NavAction,
    NavConfig,
    NavLanguageOption,
    NavThemeOption,
} from "@/types/NavConfig";
import { LanguageIcon } from "../icons/navbar/LanguageIcon";
import { DropdownIcon } from "../icons/common/DropdownIcon";
import styles from "@/assets/styles/components/navbar/Navbar.module.css";
import { CheckIcon } from "../icons/common/CheckIcon";

export const NavbarLanguage = (): React.JSX.Element => {
    const currentLanguage = useGlobalStore((state) => state.language);
    const setLanguage = useGlobalStore((state) => state.setLanguage);
    const [isToggled, setIsToggled] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsToggled(false);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const { translations } = useTranslations();
    const navConfig: NavConfig[] = translations.nav;

    const isNavAction = (item: NavConfig): item is NavAction => {
        return item.type === "settings";
    };

    const navActions: NavAction[] = navConfig.filter(isNavAction);
    const languageConfig = navActions.find(
        (action) => action.label === "Language" || action.label === "Idioma"
    );

    const isLanguageOptionArray = (
        options: NavLanguageOption[] | NavThemeOption[]
    ): options is NavLanguageOption[] => {
        return (
            options.length > 0 &&
            (options[0].value === "en" || options[0].value === "es")
        );
    };

    if (!languageConfig || !isLanguageOptionArray(languageConfig.options))
        return <></>;

    return (
        <>
            <button
                onClick={() =>
                    currentLanguage === "en"
                        ? setLanguage("es")
                        : setLanguage("en")
                }
                className={styles.settingButton}
                aria-label="Select Language"
            >
                <LanguageIcon width={24} height={24} />
            </button>
            <div
                className={styles.settingsContainer}
                onClick={() => setIsToggled(!isToggled)}
            >
                <div className={styles.settingsWrapper}>
                    <span className={styles.settingsIcon}>
                        <LanguageIcon width={24} height={24} />
                    </span>
                    <span>{languageConfig.label}</span>
                </div>
                <span
                    className={
                        !isToggled
                            ? styles.dropdownIcon
                            : styles.dropdownIconActive
                    }
                >
                    <DropdownIcon width={24} height={24} />
                </span>
            </div>
            <div
                className={
                    !isToggled
                        ? styles.optionsContainer
                        : styles.optionsContainerActive
                }
            >
                {languageConfig.options.map((option: NavLanguageOption) => {
                    return (
                        <button
                            key={option.id}
                            onClick={() => setLanguage(option.value)}
                            className={styles.optionButton}
                            aria-label="Select Language"
                        >
                            <span
                                className={
                                    currentLanguage === option.value
                                        ? styles.optionIconActive
                                        : styles.optionIconInactive
                                }
                            >
                                <CheckIcon width={24} height={24} />
                            </span>
                            <span className={styles.optionLabel}>
                                {option.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </>
    );
};
