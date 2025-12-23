import { FooterLogo } from "./FooterLogo";
import { FooterCopyright } from "./FooterCopyright";
import styles from "@/assets/styles/components/layout/footer/Footer.module.css";
import { FooterLinks } from "./FooterLinks";

export const Footer = (): React.JSX.Element => {
    return (
        <footer role="contentinfo" className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.logoCopyrightContainer}>
                    <FooterLogo />
                    <FooterCopyright />
                </div>
                <FooterLinks />
            </div>
        </footer>
    );
};
