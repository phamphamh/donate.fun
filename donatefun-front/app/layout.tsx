import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/privy";

const inter = Inter({ subsets: ["latin"] });

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
      </body>
    </html>
  );
}
