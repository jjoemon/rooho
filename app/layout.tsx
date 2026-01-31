import type { Metadata } from "next";
import { Inter, JetBrains_Mono,  Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/ui/Header";
import Footer from "@/app/components/ui/Footer";
import Providers from "@/app/providers";
import ErrorBoundary from "@/app/components/layout/ErrorBoundary";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RooHo!",
  description: "learn and play",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable}${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
        <div className="flex min-h-screen flex-col">
          <Header />
          <ErrorBoundary>
            <main className="flex-1 flex flex-col justify-start m-0 p-0">{children}</main>

          </ErrorBoundary>
        
        </div>
        </Providers>
      </body>
    </html>
  );
}
