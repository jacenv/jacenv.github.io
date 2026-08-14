import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jacen Salvador | Full-Stack Software Engineer",
  description:
    "Portfolio of Jacen Salvador, a San Diego-based software engineer building consumer iOS products, AI experiences, and production websites.",
  keywords: [
    "Jacen Salvador",
    "software engineer",
    "full-stack developer",
    "React Native",
    "Next.js",
    "San Diego",
  ],
  authors: [{ name: "Jacen Salvador" }],
  openGraph: {
    title: "Jacen Salvador | Full-Stack Software Engineer",
    description: "Consumer iOS products, AI experiences, and production websites - built end to end.",
    type: "website",
  },
};

// viewportFit: "cover" is what makes env(safe-area-inset-*) resolve to real
// values on iPhone — without it they are always 0 and the bottom bars sit
// underneath the home indicator.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
