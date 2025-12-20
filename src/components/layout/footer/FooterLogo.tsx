import Link from "next/link";
import { LogoIcon } from "../icons/common/LogoIcon";
import styles from "@/assets/styles/components/layout/footer/Footer.module.css";

export const FooterLogo = (): React.JSX.Element => {
    return (
        <Link href="/" className={styles.logoLink}>
            <span className={styles.logoIcon}>
                <LogoIcon width={48} height={48} />
            </span>
            <div className={styles.logoNameWrapper}>
                <span className={styles.logoName}>RICARDO</span>
                <span className={styles.logoName}>ALBARENQUE</span>
            </div>
        </Link>
    );
};
