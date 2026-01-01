import type { Metadata } from "next";
import { Inter, Crimson_Pro } from "next/font/google";
import "./globals.css";
import { generateSiteMetadata } from "@/lib/seo";
import { getSiteConfig } from "@/lib/config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = generateSiteMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = getSiteConfig();
  
  return (
    <html lang={config.language} className="dark">
      <head>
        <link rel="icon" href={config.branding.faviconUrl} />
      </head>
      <body className={`${inter.variable} ${crimsonPro.variable}`}>
        {children}
      </body>
    </html>
  );
}
