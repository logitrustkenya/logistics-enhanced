"use client"

import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { usePathname } from "next/navigation"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLandingPage = pathname === "/"
  const isAuthPage = pathname.startsWith("/auth")

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>LogitrustKenya - Trusted Logistics Platform</title>
        <meta
          name="description"
          content="Blockchain-powered logistics platform connecting Kenyan SMEs with trusted providers"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {isLandingPage || isAuthPage ? (
            // Landing or Auth pages layout without sidebar and header
            <main className="min-h-screen">{children}</main>
          ) : (
            // Dashboard layout with sidebar and header
            <div className="flex h-screen overflow-hidden bg-gradient-to-br from-background via-background to-[#add64e]/5">
              <Sidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
              </div>
            </div>
          )}
        </ThemeProvider>
      </body>
    </html>
  )
}
