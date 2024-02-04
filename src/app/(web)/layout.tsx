import type { Metadata } from "next";
import { Cuprum } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ThemeProvider from "@/components/themeProvider/ThemeProvider";
import NextAuthProvider from "@/components/auth-provider/AuthProvider";
import Toast from "@/components/toast/Toast";

const cuprum = Cuprum({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["italic", "normal"],
  variable: "--font-cuprum",
});

export const metadata: Metadata = {
  title: "WeisAir Flights",
  description: "Discover Hungary from the sky!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cuprum.className} overflow-x-hidden`}>
        <NextAuthProvider>
          <ThemeProvider>
            <Toast />
            <main className="font-normal dark:bg-bgdark bg-bglight w-full h-full">
              <Header />
              {children}
              <Footer />
            </main>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
