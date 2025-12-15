import Link from "next/link";
import { LogoIcon } from "../icons/navbar/LogoIcon";
import styles from "@/assets/styles/components/navbar/Navbar.module.css";

export const NavbarLogo = (): React.JSX.Element => {
    return (
        <div className={styles.logoContainer}>
            <Link href="/">
                <LogoIcon />
            </Link>
        </div>
    );
};
