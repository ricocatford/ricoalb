import { NavbarLogo } from "./NavbarLogo";
import { NavbarClient } from "./NavbarClient";
import styles from "@/assets/styles/components/navbar/Navbar.module.css";
import { NavbarTheme } from "./NavbarTheme";

export const Navbar = (): React.JSX.Element => {
    return (
        <header>
            <nav aria-label="Main navigation" className={styles.nav}>
                <div className={styles.container}>
                    <NavbarLogo />
                    <NavbarClient />
                </div>
            </nav>
        </header>
    );
};
