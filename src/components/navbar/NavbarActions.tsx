import { NavbarTheme } from "./NavbarTheme";
import { NavbarLanguage } from "./NavbarLanguage";
import styles from "@/assets/styles/components/navbar/Navbar.module.css";

interface NavbarActionsProps {
    isToggled: boolean;
    setIsToggled: (toggle: boolean) => void;
}

export const NavbarActions = ({
    isToggled,
    setIsToggled,
}: NavbarActionsProps): React.JSX.Element => {
    return (
        <div className={styles.actionsContainer}>
            <NavbarTheme />
            <NavbarLanguage />
        </div>
    );
};
