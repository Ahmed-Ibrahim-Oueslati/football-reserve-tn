// Football Reserve TN - Root Layout
// Defines the global HTML structure and shared UI elements

import type { Metadata } from "next";
import { Inter, Tajawal } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuthProvider } from "@/components/auth-provider";
import { LanguageProvider } from "@/hooks/use-language";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Football Reserve TN - Réservez votre terrain de foot en Tunisie",
  description: "La plateforme #1 pour réserver des terrains de football en Tunisie. Trouvez, comparez et réservez en quelques clics.",
  keywords: ["football", "réservation", "terrain", "Tunisie", "sport", "booking", "stade"],
  authors: [{ name: "Ahmed Ibrahim Oueslati" }],
  openGraph: {
    title: "Football Reserve TN",
    description: "Réservez votre terrain de foot en Tunisie",
    url: "https://football-reserve-tn.com",
    siteName: "Football Reserve TN",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Football Reserve TN Platform",
      },
    ],
    locale: "fr_TN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${tajawal.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <AuthProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}