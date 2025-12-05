import { DarkIcon } from "@/components/icons/DarkIcon";
import { LanguageIcon } from "@/components/icons/LanguageIcon";
import { LightIcon } from "@/components/icons/LightIcon";

export default function HomePage() {
    return (
        <>
            <LightIcon width={24} height={24} />
            <DarkIcon />
            <LanguageIcon />
        </>
    );
}
