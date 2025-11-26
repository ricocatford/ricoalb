import Link from "next/link";
import styles from "@/assets/styles/components/navbar/Navbar.module.css";

export const NavbarLogo = (): React.JSX.Element => {
    return (
        <Link href="/">
            <span className={styles.logo}>Ricardo Albarenque</span>
        </Link>
    );
};
