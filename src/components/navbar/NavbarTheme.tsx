import { useState } from "react";
import { useGlobalStore } from "@/providers/GlobalStoreProvider";
import { useTranslations } from "@/providers/LanguageProvider";
import {
    NavAction,
    NavConfig,
    NavThemeOption,
    ThemeOptionIconKey,
} from "@/types/NavConfig";
import { ThemeIcon } from "../icons/navbar/ThemeIcon";
import { LightIcon } from "../icons/navbar/LightIcon";
import { DarkIcon } from "../icons/navbar/DarkIcon";
import styles from "@/assets/styles/components/navbar/Navbar.module.css";
import { CheckIcon } from "../icons/common/CheckIcon";
import { DropdownIcon } from "../icons/common/DropdownIcon";

const isNavAction = (item: NavConfig): item is NavAction => {
    return item.type === "settings";
};

export const NavbarTheme = (): React.JSX.Element => {
    const currentTheme = useGlobalStore((state) => state.theme);
    const toggleTheme = useGlobalStore((state) => state.toggleTheme);
    const setTheme = useGlobalStore((state) => state.setTheme);
    const [isToggled, setIsToggled] = useState<boolean>(false);

    const { translations } = useTranslations();
    const navConfig: NavConfig[] = translations.nav;

    const navActions: NavAction[] = navConfig.filter(isNavAction);

    const themeConfig = navActions.find(
        (action) => action.label === "Theme" || "Tema"
    );

    if (!themeConfig) return <></>;

    return (
        <>
            <button
                className={styles.themeButton}
                onClick={toggleTheme}
                aria-label="Toggle Theme"
            >
                {currentTheme === "dark" ? (
                    <LightIcon width={24} height={24} />
                ) : (
                    <DarkIcon width={24} height={24} />
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
                className={
                    !isToggled
                        ? styles.optionsContainer
                        : styles.optionsContainerActive
                }
            >
                {themeConfig.options.map((option: NavThemeOption) => {
                    return (
                        <button
                            key={option.id}
                            onClick={() => setTheme(option.value)}
                            className={styles.optionButton}
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
