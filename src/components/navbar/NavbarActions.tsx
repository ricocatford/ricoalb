import { NavbarLinks } from "./NavbarLinks";
import { NavbarTheme } from "./NavbarTheme";
import styles from "@/assets/styles/components/navbar/Navbar.module.css";

export const NavbarActions = (): React.JSX.Element => {
    return (
        <>
            <div className={styles.actionsContainer}>
                <NavbarLinks />
                <NavbarTheme />
            </div>
        </>
    );
};
