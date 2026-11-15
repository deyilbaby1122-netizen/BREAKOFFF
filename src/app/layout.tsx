/**
 * layout.tsx
 * BREAKOFF — root layout.
 * - Cream/off-white page foundation
 * - Global font imports (serif display + sans UI)
 * - Global CSS
 * - Providers (Supabase auth client)
 */
import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const georgia = Georgia({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-georgia",
});

export const metadata: Metadata = {
  title: {
    default: "BREAKOFF — Timeless Clothing",
    template: "%s | BREAKOFF",
  },
  description:
    "BREAKOFF — everyday essentials redefined. Premium minimalist fashion, timeless clothing.",
  keywords: [
    "BREAKOFF",
    "fashion",
    "clothing store",
    "men's fashion",
    "women's fashion",
    "timeless clothing",
    "Essentials",
    "premium fashion",
  ],
  authors: [{ name: "BREAKOFF" }],
  creator: "BREAKOFF",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "BREAKOFF",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${georgia.variable}`}>
        <div className="min-h-screen">          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="pt-20">
                {children}
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
