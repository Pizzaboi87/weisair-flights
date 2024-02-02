import type { Metadata } from "next";
import { Cuprum } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

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
      <body className={cuprum.className}>
        <div className="custom-shape-divider-top-1706909798">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <main className="font-normal">
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
