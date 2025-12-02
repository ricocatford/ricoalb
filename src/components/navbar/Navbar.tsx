import { NavbarLogo } from "./NavbarLogo";
import { NavbarClient } from "./NavbarClient";
import styles from "@/assets/styles/components/navbar/Navbar.module.css";

export const Navbar = (): React.JSX.Element => {
    return (
        <header>
            <nav aria-label="Main navigation">
                <div className={styles.container}>
                    <NavbarLogo />
                    <NavbarClient />
                </div>
            </nav>
        </header>
    );
};
