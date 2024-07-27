import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext"; // Import CartProvider

const inter = Roboto({ weight:"500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Classy Costumes",
  description: "Gentle wears! Make yourself impressive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={`${inter.className} bg-gray-50 text-gray-950 relative dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <CartProvider> {/* Wrap components with CartProvider */}
              <Nav />
              {children}
              <Footer />
              <ThemeSwitcher />
            </CartProvider>
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
