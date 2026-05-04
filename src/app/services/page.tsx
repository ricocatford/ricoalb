import { ServicesHeader } from "@/components/pages/services/ServicesHeader";
import { ServicesList } from "@/components/pages/services/ServicesList";

export default function ServicesPage(): React.JSX.Element {
    return (
        <div className="container">
            <ServicesHeader />
            <ServicesList />
        </div>
    );
}
