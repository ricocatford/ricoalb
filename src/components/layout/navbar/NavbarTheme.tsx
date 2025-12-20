import { useEffect, useState } from "react";
import { useGlobalStore } from "@/providers/GlobalStoreProvider";
import { useTranslations } from "@/providers/LanguageProvider";
import {
    NavAction,
    NavConfig,
    NavLanguageOption,
    NavThemeOption,
} from "@/types/NavConfig";
import { ThemeIcon } from "../icons/navbar/ThemeIcon";
import { LightIcon } from "../icons/navbar/LightIcon";
import { DarkIcon } from "../icons/navbar/DarkIcon";
import { CheckIcon } from "../icons/common/CheckIcon";
import { DropdownIcon } from "../icons/common/DropdownIcon";
import styles from "@/assets/styles/components/layout/navbar/Navbar.module.css";

export const NavbarTheme = (): React.JSX.Element => {
    const currentTheme = useGlobalStore((state) => state.theme);
    const toggleTheme = useGlobalStore((state) => state.toggleTheme);
    const setTheme = useGlobalStore((state) => state.setTheme);
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

    const themeConfig = navActions.find(
        (action) => action.label === "Theme" || action.label === "Tema"
    );

    const isThemeOptionArray = (
        options: NavThemeOption[] | NavLanguageOption[]
    ): options is NavThemeOption[] => {
        return (
            options.length > 0 &&
            (options[0].value === "dark" || options[0].value === "light")
        );
    };

    const handleThemeSelect = (value: "dark" | "light") => {
        setTheme(value);

        setTimeout(() => {
            setIsToggled(false);
        }, 150);
    };

    if (!themeConfig || !isThemeOptionArray(themeConfig.options)) {
        return <></>;
    }

    return (
        <>
            <button
                className={styles.settingButton}
                onClick={toggleTheme}
                aria-label="Toggle Theme"
            >
                {currentTheme === "dark" ? (
                    <span>
                        <LightIcon width={24} height={24} />
                    </span>
                ) : (
                    <span>
                        <DarkIcon width={24} height={24} />
                    </span>
                )}
            </button>
            <div
                className={styles.settingsContainer}
                onClick={() => setIsToggled(!isToggled)}
            >
                <div className={styles.settingsWrapper}>
                    <span className={styles.settingsIcon}>
                        <ThemeIcon width={24} height={24} />
                    </span>
                    <span>{themeConfig.label}</span>
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
            >
                {themeConfig.options.map((option) => {
                    return (
                        <button
                            key={option.id}
                            onClick={() => handleThemeSelect(option.value)}
                            className={styles.optionButton}
                            aria-label="Select Theme"
                        >
                            <span
                                className={
                                    currentTheme === option.value
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
