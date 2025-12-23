import { NavbarLogo } from "./NavbarLogo";
import { NavbarClient } from "./NavbarClient";
import styles from "@/assets/styles/components/layout/navbar/Navbar.module.css";

export const Navbar = (): React.JSX.Element => {
    return (
        <header>
            <nav
                aria-label="Main navigation"
                role="navigation"
                className={styles.nav}
            >
                <div className={styles.container}>
                    <NavbarLogo />
                    <NavbarClient />
                </div>
            </nav>
        </header>
    );
};
