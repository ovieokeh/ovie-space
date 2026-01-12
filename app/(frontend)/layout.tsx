import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/core/Header";
import { Footer } from "@/components/core/Footer";
import { Providers } from "@/components/Providers";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ovie.dev"),

  title: { default: "Ovie Okeh", template: "%s | Ovie.dev" },
  description: "Ovie Okeh's personal website, showcasing my projects, hobbies, and interests.",
  alternates: {
    canonical: "https://ovie.dev",
    languages: { en: "/en" },
  },
  openGraph: {
    title: "Ovie Okeh",
    images: "/images/ovie-dev-og.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
