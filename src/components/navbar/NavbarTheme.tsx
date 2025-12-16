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

const iconList: Record<ThemeOptionIconKey, React.JSX.Element> = {
    DarkIcon: <DarkIcon width={24} height={24} />,
    LightIcon: <LightIcon width={24} height={24} />,
};

const isNavAction = (item: NavConfig): item is NavAction => {
    return item.type === "settings";
};

export const NavbarTheme = (): React.JSX.Element => {
    const currentTheme = useGlobalStore((state) => state.theme);
    const setTheme = useGlobalStore((state) => state.setTheme);
    const [isToggled, setIsToggled] = useState<boolean>(true);

    const { translations } = useTranslations();
    const navConfig: NavConfig[] = translations.nav;

    const navActions: NavAction[] = navConfig.filter(isNavAction);

    const themeConfig = navActions.find((action) => action.label === "Theme");

    if (!themeConfig) return <></>;

    return (
        <>
            <div
                className={styles.settingsContainer}
                onClick={() => setIsToggled(!isToggled)}
            >
                <span className={styles.settingsIcon}>
                    <ThemeIcon width={24} height={24} />
                </span>
                <span>{themeConfig.label}</span>
            </div>
            <div
                className={
                    !isToggled
                        ? styles.optionsContainer
                        : styles.optionsContainerActive
                }
            >
                {themeConfig.options.map((option: NavThemeOption) => {
                    const isActive = currentTheme === option.value;
                    const changeClassName = !isActive
                        ? styles.themeButtonActive
                        : styles.themeButton;

                    return (
                        <button
                            key={option.id}
                            onClick={() => setTheme(option.value)}
                            className={changeClassName}
                        >
                            <span className={styles.optionIcon}>
                                {iconList[option.icon]}
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
