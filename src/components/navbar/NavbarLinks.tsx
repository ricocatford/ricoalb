import { useGlobalStore } from "@/providers/GlobalStoreProvider";
import { useTranslations } from "@/providers/LanguageProvider";
import styles from "@/assets/styles/components/navbar/Navbar.module.css";

export const NavbarLinks = (): React.JSX.Element => {
    const { translations } = useTranslations();
    const toggleTheme = useGlobalStore((state) => state.toggleTheme);

    return (
        <>
            <button onClick={() => toggleTheme()} className={styles.button}>
                Click
            </button>
        </>
    );
};
