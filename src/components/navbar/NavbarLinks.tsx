import { useGlobalStore } from "@/providers/GlobalStoreProvider";
import { useTranslations } from "@/providers/LanguageProvider";

export const NavbarLinks = (): React.JSX.Element => {
    const { translations } = useTranslations();
    const toggleTheme = useGlobalStore((state) => state.toggleTheme);

    return (
        <>
            <button onClick={() => toggleTheme()}>Click</button>
        </>
    );
};
