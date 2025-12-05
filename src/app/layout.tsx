import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { GlobalStoreProvider } from "@/providers/GlobalStoreProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { Navbar } from "@/components/navbar/Navbar";
import { BlobCursor } from "@/components/background/BlobCursor";
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
                <GlobalStoreProvider>
                    <ThemeProvider>
                        <LanguageProvider>
                            <BlobCursor />
                            <Navbar />
                            <main className="appContainer">{children}</main>
                        </LanguageProvider>
                    </ThemeProvider>
                </GlobalStoreProvider>
            </body>
        </html>
    );
}
