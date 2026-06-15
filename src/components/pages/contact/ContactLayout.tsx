import { ContactHeader } from "./ContactHeader";
import { ContactForm } from "./ContactForm";
import { AvailabilityCard } from "./AvailabilityCard";
import { ChannelsCard } from "./ChannelsCard";
import styles from "@/assets/styles/components/pages/contact/ContactLayout.module.css";

export const ContactLayout = (): React.JSX.Element => {
    return (
        <>
            <div className={styles.grid}>
                <ContactForm />
                <aside className={styles.side}>
                    <AvailabilityCard />
                    <ChannelsCard />
                </aside>
            </div>
        </>
    );
};
