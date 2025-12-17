import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { HydrationClient } from "@/components/HydrationClient";
import { GlobalStoreProvider } from "@/providers/GlobalStoreProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { Smoke } from "@/components/layout/background/Smoke";
import { Navbar } from "@/components/layout/navbar/Navbar";
import "@/assets/styles/globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Ricardo Albarenque",
    description: "Full-Stack Developer",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: "dark",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable}`}>
                <HydrationClient>
                    <GlobalStoreProvider>
                        <ThemeProvider>
                            <LanguageProvider>
                                <Smoke>
                                    <Navbar />
                                    <main>{children}</main>
                                </Smoke>
                            </LanguageProvider>
                        </ThemeProvider>
                    </GlobalStoreProvider>
                </HydrationClient>
            </body>
        </html>
    );
}
