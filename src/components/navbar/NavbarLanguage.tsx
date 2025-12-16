import { useGlobalStore } from "@/providers/GlobalStoreProvider";
import { LanguageIcon } from "../icons/navbar/LanguageIcon";
import styles from "@/assets/styles/components/navbar/Navbar.module.css";

export const NavbarLanguage = () => {
    const language = useGlobalStore((state) => state.language);
    const setLanguage = useGlobalStore((state) => state.setLanguage);
    const selectLanguage = () =>
        language === "en" ? setLanguage("es") : setLanguage("en");

    return (
        <button
            onClick={selectLanguage}
            className={styles.languageButton}
            aria-label={"Select language"}
        >
            <span className={styles.languageButtonIcon}>
                <LanguageIcon width={24} height={24} />
            </span>
        </button>
    );
};
