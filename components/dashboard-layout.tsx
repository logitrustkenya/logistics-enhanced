"use client"

import type React from "react"
import { Sidebar } from "@/components/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
  userType?: "sme" | "user" | "provider"
}

export function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-[#add64e]/5">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-0">{children}</main>
      </div>
    </div>
  )
}
