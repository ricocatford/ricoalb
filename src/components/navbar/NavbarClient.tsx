"use client";

import { useState } from "react";
import { NavbarLinks } from "./NavbarLinks";
import { NavbarActions } from "./NavbarActions";
import styles from "@/assets/styles/components/navbar/Navbar.module.css";
import { NavbarToggleButton } from "./NavbarToggleButton";

export const NavbarClient = (): React.JSX.Element => {
    const [isToggled, setIsToggled] = useState<boolean>(false);

    const changeClassName = !isToggled
        ? styles.clientContainer
        : styles.clientContainerActive;

    return (
        <>
            <div className={changeClassName}>
                <NavbarLinks setIsToggled={setIsToggled} />
                <NavbarActions
                    isToggled={isToggled}
                    setIsToggled={setIsToggled}
                />
            </div>
            <NavbarToggleButton
                isToggled={isToggled}
                onClick={() => setIsToggled(!isToggled)}
            />
        </>
    );
};
