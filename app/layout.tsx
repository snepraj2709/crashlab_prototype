import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "@/app/globals.css";
import { JsonLd } from "@/components/seo/JsonLd";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://crashlab.in"),
  title: {
    template: "%s | CRASH Lab",
    default: "CRASH Lab — Responsible AI for Healthcare"
  },
  description:
    "CRASH Lab at Ashoka University builds responsible healthcare AI — benchmarks, foundation models, and clinical tools. Led by Dr. Suvrankar Datta.",
  keywords: [
    "healthcare AI",
    "radiology AI benchmark",
    "responsible AI India",
    "medical AI research",
    "AIIMS",
    "Ashoka University"
  ],
  authors: [
    {
      name: "Dr. Suvrankar Datta",
      url: "https://crashlab.in/people/suvrankar-datta"
    }
  ],
  openGraph: {
    type: "website",
    siteName: "CRASH Lab",
    locale: "en_IN",
    images: [
      {
        url: "/og/default.svg",
        alt: "CRASH Lab"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    creator: "@DrDatta_AIIMS"
  },
  robots: {
    index: true,
    follow: true
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CRASH Lab, Ashoka University",
  alternateName: "Centre for Responsible Autonomous Systems in Healthcare",
  url: "https://crashlab.in",
  logo: "https://crashlab.in/og/default.svg",
  email: "suvrankar.datta@ashoka.edu.in",
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: "Ashoka University"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CRASH Lab",
  url: "https://crashlab.in",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://crashlab.in/research?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>): React.ReactElement {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} ${mono.variable}`}>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
