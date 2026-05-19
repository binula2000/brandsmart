import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SignInDrawer from "@/components/SignInDrawer";
import KlarnaModal from "@/components/KlarnaModal";

import ZipCodeModal from "@/components/ZipCodeModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BrandsMart USA - Appliances, TVs, Electronics & More",
  description: "Shop BrandsMart USA for the best deals on Appliances, TVs, Electronics, and more.",
};

import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-text-primary">
        <CartProvider>
          <div className="flex flex-col min-h-screen relative overflow-x-hidden">
            <Header />
            <main className="flex-grow relative z-0">{children}</main>
            <Footer />
            <CartDrawer />
            <SignInDrawer />
            <KlarnaModal />
            <ZipCodeModal />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
