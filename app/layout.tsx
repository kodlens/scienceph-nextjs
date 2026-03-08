import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Science PH - Your Gateway to Curated Scientific Knowledge",
  description: "Discover a world of curated scientific knowledge with Science PH. Explore articles, topics, and insights across various scientific disciplines, all in one place.",
  icons: {
    icon: '/stii.png',
  },
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
        <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#edf4fb_40%,#f7fafd_100%)] text-[#1a2433]">
          <Header />
          
          {children}

          <Footer />
        </div>

      </body>
    </html>
  );
}
