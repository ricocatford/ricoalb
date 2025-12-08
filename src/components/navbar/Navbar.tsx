import { NavbarLogo } from "./NavbarLogo";
import { NavbarActions } from "./NavbarActions";
import styles from "@/assets/styles/components/navbar/Navbar.module.css";

export const Navbar = (): React.JSX.Element => {
    return (
        <header>
            <nav aria-label="Main navigation" className={styles.nav}>
                <div className={styles.container}>
                    <NavbarLogo />
                    <NavbarActions />
                </div>
            </nav>
        </header>
    );
};
