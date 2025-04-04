import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if the current path is the landing page
  // This is a client component, so we'll use a simple approach
  // that works on both server and client
  const isLandingPage = children.props?.childProp?.segment === null

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>LogitrustKenya</title>
        <meta name="description" content="Trusted logistics platform for Kenyan SMEs" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {isLandingPage ? (
            // Landing page layout without sidebar and header
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
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
