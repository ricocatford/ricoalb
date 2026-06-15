import "@/assets/styles/globals.css";
import { HydrationClient } from "@/components/layout/HydrationClient";
import { GlobalStoreProvider } from "@/providers/GlobalStoreProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { Smoke } from "@/components/layout/background/Smoke";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { Footer } from "@/components/layout/footer/Footer";
import { LoadingProvider } from "@/providers/LoadingProvider";

export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <GlobalStoreProvider>
            <HydrationClient>
                <LoadingProvider>
                    <ThemeProvider>
                        <LanguageProvider>
                            <Smoke nav={<Navbar />}>
                                <main role="main">{children}</main>
                                <Footer />
                            </Smoke>
                        </LanguageProvider>
                    </ThemeProvider>
                </LoadingProvider>
            </HydrationClient>
        </GlobalStoreProvider>
    );
}
