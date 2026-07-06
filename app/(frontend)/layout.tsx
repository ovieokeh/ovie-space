import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { OpenPanelComponent } from "@openpanel/nextjs";
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

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ovie.dev"),
  title: { default: "Ovie Okeh — Builder & Engineer", template: "%s | Ovie.dev" },
  description:
    "Software engineer building products end-to-end across TypeScript, Swift, and Rust. Based in the Netherlands. Available for contract and architect engagements.",
  keywords: [
    "software engineer",
    "full-stack engineer",
    "TypeScript",
    "Swift",
    "Rust",
    "React",
    "Next.js",
    "contract engineer",
    "Netherlands",
    "Utrecht",
    "Ovie Okeh",
    "builder",
  ],
  authors: [{ name: "Ovie Okeh", url: "https://ovie.dev" }],
  creator: "Ovie Okeh",
  alternates: {
    canonical: "https://ovie.dev",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Ovie.dev",
    title: "Ovie Okeh — Builder & Engineer",
    description:
      "Software engineer shipping products end-to-end across TypeScript, Swift, and Rust. Based in the Netherlands. Available for contract and architect engagements.",
    url: "https://ovie.dev",
    images: [{ url: "/images/ovie-dev-og.png", width: 1200, height: 630, alt: "Ovie.dev" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ovie Okeh — Builder & Engineer",
    description:
      "Software engineer shipping products end-to-end across TypeScript, Swift, and Rust. Based in the Netherlands.",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([webSiteJsonLd(), personJsonLd()]) }}
        />
        <OpenPanelComponent
          apiUrl="https://analytics.ovie.dev"
          clientId="4a54e272-26ee-4b17-952f-9bc42dd157c3"
          // Self-hosted copy of the tracker (public/op1.js); openpanel.dev's
          // CDN intermittently 503s. Re-download when bumping @openpanel/nextjs.
          cdnUrl="/op1.js"
          trackScreenViews
          trackOutgoingLinks
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
