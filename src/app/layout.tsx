import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Ricardo Albarenque",
    description:
        "Full-Stack Developer specializing in high-performance Next.js applications and modern web architecture.",
    keywords: [
        "Ricardo Albarenque",
        "Full-Stack Developer",
        "Software Engineer",
        "Next.js Developer",
        "React Expert",
        "TypeScript",
        "Node.js",
        "Vercel",
        "Web Development Portfolio",
    ],
    openGraph: {
        title: "Ricardo Albarenque | Full-Stack Developer",
        description: "Building scalable and modern web experiences.",
        type: "website",
    },
    verification: {
        google: "KmepN_3fOW7gfltSjq5HpdIdpMtbq43w_GNcIWXSLUA",
    },
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
            <body className={inter.variable}>
                <Analytics />
                <SpeedInsights />
                {children}
            </body>
        </html>
    );
}
