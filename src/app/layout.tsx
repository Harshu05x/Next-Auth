import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import AppBar from "./components/AppBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className=" dark">
            <body className={inter.className}>
                <Providers>
                    <AppBar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
