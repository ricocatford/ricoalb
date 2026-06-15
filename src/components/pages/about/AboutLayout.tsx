import { AboutBio } from "./AboutBio";
import { PhilosophyCard } from "./PhilosophyCard";
import { StackCard } from "./StackCard";
import { TimelineCard } from "./TimelineCard";
import styles from "@/assets/styles/components/pages/about/AboutLayout.module.css";

export const AboutLayout = (): React.JSX.Element => {
    return (
        <>
            <div className={styles.grid}>
                <AboutBio />
                <aside className={styles.side}>
                    <PhilosophyCard />
                    <StackCard />
                </aside>
            </div>
            <TimelineCard />
        </>
    );
};
