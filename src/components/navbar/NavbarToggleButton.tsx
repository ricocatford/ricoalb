"use client";

import { MenuIcon } from "../icons/navbar/MenuIcon";
import { ExitIcon } from "../icons/navbar/ExitIcon";
import styles from "@/assets/styles/components/navbar/Navbar.module.css";

interface NavbarToggleButtonProps {
    isToggled: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const NavbarToggleButton = ({
    isToggled,
    onClick,
}: NavbarToggleButtonProps): React.JSX.Element => {
    const iconToRender = !isToggled ? (
        <MenuIcon width={24} height={24} />
    ) : (
        <ExitIcon width={24} height={24} />
    );

    return (
        <button className={styles.mobileButton} onClick={onClick}>
            {iconToRender}
        </button>
    );
};
