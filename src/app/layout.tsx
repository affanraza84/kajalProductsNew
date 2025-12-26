import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "@/context/CartContext";
import { ReviewProvider } from "@/context/ReviewContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Kajal Bakery | Premium Artisanal Cakes",
  description: "Handcrafted eggless cakes and treats made with love.",
};

import { ClerkProvider } from "@clerk/nextjs";

// ... existing imports

import { Toaster } from "sonner";
import { AuthToaster } from "./components/AuthToaster";
import { ReviewModal } from "./components/ui/ReviewModal";

// ... existing imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      localization={{
        signIn: {
          start: {
            title: "Sign in to Kajal Bakery's Cakes & Snacks",
          },
        },
      }}
    >
      <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
        <body className={inter.className}>
          <Toaster richColors position="bottom-right" closeButton theme="light" />
          <AuthToaster />
          <CartProvider>
            <ReviewProvider>
              <ReviewModal />
              <div className="relative flex items-center w-full justify-center">
                <Navbar/>
              </div>
              {children}
              <Footer />
            </ReviewProvider>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
