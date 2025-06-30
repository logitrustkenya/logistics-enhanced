"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Box,
  CreditCard,
  Home,
  Package,
  Settings,
  Truck,
  Users,
  MessageSquare,
  Shield,
  Menu,
  X,
} from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const sidebarItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Shipments",
      href: "/shipments",
      icon: Package,
    },
    {
      title: "Providers",
      href: "/providers",
      icon: Truck,
    },
    {
      title: "Payments",
      href: "/payments",
      icon: CreditCard,
    },
    {
      title: "Messages",
      href: "/messages",
      icon: MessageSquare,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: BarChart3,
    },
    {
      title: "Users",
      href: "/users",
      icon: Users,
    },
    {
      title: "Inventory",
      href: "/inventory",
      icon: Box,
    },
    {
      title: "Security",
      href: "/security",
      icon: Shield,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  const sidebarContent = (
    <>
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Truck className="h-6 w-6 text-green-600" />
          <span className="text-lg font-bold">LogitrustKenya</span>
        </Link>
        {isMobile && (
          <Button variant="ghost" size="icon" className="ml-auto" onClick={toggleSidebar}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                pathname === item.href
                  ? "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                  : "hover:bg-muted",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )

  return (
    <>
      {isMobile && (
        <Button variant="outline" size="icon" className="fixed left-4 top-4 z-40 md:hidden" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
      )}
      {isMobile ? (
        <div
          className={cn(
            "fixed inset-0 z-30 transform transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-full w-64 flex-col bg-background">{sidebarContent}</div>
          <div className="absolute inset-0 bg-black/50" onClick={toggleSidebar} style={{ zIndex: -1 }}></div>
        </div>
      ) : (
        <div className={cn("hidden border-r bg-background md:flex md:w-64 md:flex-col", className)}>
          {sidebarContent}
        </div>
      )}
    </>
  )
}

