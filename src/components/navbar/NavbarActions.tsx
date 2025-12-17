import { NavbarTheme } from "./NavbarTheme";
import { NavbarLanguage } from "./NavbarLanguage";
import styles from "@/assets/styles/components/navbar/Navbar.module.css";

export const NavbarActions = (): React.JSX.Element => {
    return (
        <div className={styles.actionsContainer}>
            <NavbarTheme />
            <NavbarLanguage />
        </div>
    );
};
