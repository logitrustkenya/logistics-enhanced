"use client";

import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { usePathname } from "next/navigation";
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Optional: for CSS variable support
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const isAuthPage = pathname.startsWith("/auth");

  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <title>LogitrustKenya</title>
        <meta name="description" content="Trusted logistics platform for Kenyan SMEs" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {isLandingPage || isAuthPage ? (
            // Landing or Auth pages layout without sidebar and header
            <main>{children}</main>
          ) : (
            // Dashboard layout with sidebar and header
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">{children}</main>
              </div>
            </div>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}

import './globals.css';
