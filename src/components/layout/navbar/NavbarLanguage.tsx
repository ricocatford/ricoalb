import { useEffect, useRef, useState } from "react";
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
import { CheckIcon } from "../icons/common/CheckIcon";
import styles from "@/assets/styles/components/layout/navbar/Navbar.module.css";

export const NavbarLanguage = (): React.JSX.Element => {
    const currentLanguage = useGlobalStore((state) => state.language);
    const setLanguage = useGlobalStore((state) => state.setLanguage);
    const optionsContainerRef = useRef<HTMLDivElement>(null);
    const [isToggled, setIsToggled] = useState<boolean>(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (
                window.innerWidth > 768 &&
                optionsContainerRef.current &&
                !optionsContainerRef.current.contains(event.target as Node)
            ) {
                setIsToggled(false);
            }
        };

        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsToggled(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
            window.removeEventListener("resize", handleResize);
        };
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

    const handleLanguageSelect = (value: "en" | "es") => {
        setLanguage(value);

        setTimeout(() => {
            setIsToggled(false);
        }, 150);
    };

    if (!languageConfig || !isLanguageOptionArray(languageConfig.options)) {
        return <></>;
    }

    return (
        <>
            <button
                onClick={() => setIsToggled(!isToggled)}
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
                className={`${styles.optionsContainer} ${
                    isToggled ? styles.optionsContainerActive : ""
                }`}
                ref={optionsContainerRef}
            >
                {languageConfig.options.map((option) => {
                    return (
                        <button
                            key={option.id}
                            onClick={() => handleLanguageSelect(option.value)}
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
