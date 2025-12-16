"use client";

import { useEffect, useState } from "react";
import { NavbarLinks } from "./NavbarLinks";
import { NavbarActions } from "./NavbarActions";
import { NavbarToggleButton } from "./NavbarToggleButton";
import styles from "@/assets/styles/components/navbar/Navbar.module.css";

export const NavbarClient = (): React.JSX.Element => {
    const [isToggled, setIsToggled] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsToggled(false);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
