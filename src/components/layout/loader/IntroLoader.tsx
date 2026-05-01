"use client";

import React from "react";
import styles from "./IntroLoader.module.css";
import { LogoIcon } from "../icons/common/LogoIcon";
import { Smoke } from "../background/Smoke";

export const IntroLoader = (): React.JSX.Element => {
    return (
        <Smoke>
            <div className={styles.overlay}>
                <div className={styles.container}>
                    <div className={styles.logoContainer}>
                        <span className={styles.logoIcon}>
                            <LogoIcon width={96} height={96} />
                        </span>
                    </div>
                </div>
            </div>
        </Smoke>
    );
};
