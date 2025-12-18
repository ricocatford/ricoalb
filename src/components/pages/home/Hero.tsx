import styles from "@/assets/styles/components/pages/home/Hero.module.css";

export const Hero = (): React.JSX.Element => {
    return (
        <section className="container">
            <div className={styles.grid}>
                <article className={styles.testCard}></article>
                <article className={styles.testCard1}></article>
                <article className={styles.testCard1}></article>
                <article className={styles.testCard1}></article>
                <article className={styles.testCard}></article>
                <article className={styles.testCard1}></article>
                <article className={styles.testCard}></article>
                <article className={styles.testCard}></article>
            </div>
        </section>
    );
};
