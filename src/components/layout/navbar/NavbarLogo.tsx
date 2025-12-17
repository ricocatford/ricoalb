import Link from "next/link";
import { LogoIcon } from "../icons/common/LogoIcon";
import styles from "@/assets/styles/components/layout/navbar/Navbar.module.css";

export const NavbarLogo = (): React.JSX.Element => {
    return (
        <div className={styles.logoContainer}>
            <Link href="/">
                <span className={styles.logoIcon}>
                    <LogoIcon />
                </span>
            </Link>
        </div>
    );
};
