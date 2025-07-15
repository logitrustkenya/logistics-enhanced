"use client"

import type React from "react"
import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  userType?: "sme" | "provider"
}

export function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const [sidebarMinimized, setSidebarMinimized] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-[#add64e]/5">
      <div className="flex">
        <Sidebar minimized={sidebarMinimized} />
        <button
          className="hidden md:flex items-center justify-center h-10 w-6 absolute left-64 top-4 z-30 bg-background/80 rounded-r-md border border-l-0 border-white/10 transition-all duration-200"
          style={{ left: sidebarMinimized ? '4rem' : '16rem' }}
          onClick={() => setSidebarMinimized((m) => !m)}
          aria-label={sidebarMinimized ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarMinimized ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
        <main className={`flex-1 md:ml-0 transition-all duration-200 ${sidebarMinimized ? 'md:ml-16' : 'md:ml-64'}`}>{children}</main>
      </div>
    </div>
  )
}
