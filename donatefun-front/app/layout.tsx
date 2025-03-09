<<<<<<< HEAD
import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/privy";

const inter = Inter({ subsets: ["latin"] });
=======
import type React from "react"
import { Fredoka, Baloo_2 } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

// Font for headings (cartoon-like, bold)
const fredoka = Fredoka({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka"
})

// Font for body text (friendly, rounded)
const baloo = Baloo_2({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo"
})
>>>>>>> 6467620c36de4d2511b73656b2afe4b8f77048b2

export const metadata = {
  title: "Donate.fun - Transparent Donations with Checkpoints",
  description:
    "A transparent donation platform that ensures funds are used as intended through a checkpoint validation system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            suppressHydrationWarning
          >
            <div className="flex min-h-screen flex-col">
              <Header />
              {children}
              <Footer />
              <Toaster />
            </div>
          </ThemeProvider>
        </Providers>
=======
    <html lang="en">
      <body className={`${fredoka.variable} ${baloo.variable} font-body`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            {children}
            <Footer />
            <Toaster />
          </div>
        </ThemeProvider>
>>>>>>> 6467620c36de4d2511b73656b2afe4b8f77048b2
      </body>
    </html>
  );
}
