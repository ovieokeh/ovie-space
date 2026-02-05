import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/core/Header";
import { Footer } from "@/components/core/Footer";
import { Providers } from "@/components/Providers";
import { personJsonLd, webSiteJsonLd } from "@/lib/structured-data";
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
  title: { default: "Ovie Okeh — Developer & Designer", template: "%s | Ovie.dev" },
  description:
    "Ovie Okeh is a full-stack developer and product designer based in the Netherlands, building business applications, travel technology, and community platforms with React, Next.js, and TypeScript.",
  alternates: {
    canonical: "https://ovie.dev",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Ovie.dev",
    title: "Ovie Okeh — Developer & Designer",
    description:
      "Full-stack developer and product designer based in the Netherlands. Building with React, Next.js, and TypeScript.",
    url: "https://ovie.dev",
    images: [{ url: "/images/ovie-dev-og.png", width: 1200, height: 630, alt: "Ovie.dev" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ovie Okeh — Developer & Designer",
    description:
      "Full-stack developer and product designer based in the Netherlands. Building with React, Next.js, and TypeScript.",
    images: ["/images/ovie-dev-og.png"],
  },
  robots: {
    index: true,
    follow: true,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([webSiteJsonLd(), personJsonLd()]) }}
        />
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
