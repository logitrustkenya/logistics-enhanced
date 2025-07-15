"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Truck, Users, BarChart3, Home } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { useState } from "react"
import { X } from "lucide-react"
import type { FC } from "react"

export const Sidebar: FC<{ minimized?: boolean }> = ({ minimized = false }) => {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const menuItems = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: Home,
    },
    {
      label: "Shipments",
      href: "/shipments",
      icon: Truck,
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: BarChart3,
    },
    {
      label: "Providers",
      href: "/providers",
      icon: Users,
    },
  ]

  return (
    <>
      {isMobile ? (
        <>
          <button
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-xl text-white p-2 rounded-md md:hidden"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <aside
            className={`fixed top-0 left-0 h-full w-64 bg-background/95 backdrop-blur-xl z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full p-4">
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <div className="relative">
                  <Truck className="h-7 w-7 text-[#add64e]" />
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-[#add64e] rounded-full animate-pulse"></div>
                </div>
                <span className="text-lg font-bold text-white">LogitrustKenya</span>
              </Link>
              <nav className="flex-1">
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={`flex items-center space-x-3 p-3 rounded-md hover:bg-white/5 transition-colors ${
                          pathname === item.href ? "bg-white/10 text-[#add64e]" : "text-white/70"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        </>
      ) : (
        <aside className={`hidden md:block ${minimized ? "w-16" : "w-64"} flex-shrink-0 border-r border-white/10 transition-all duration-200`}>
          <div className="flex flex-col h-full p-4">
            <Link href="/" className="flex items-center space-x-2 mb-6 justify-center md:justify-start">
              <div className="relative">
                <Truck className="h-7 w-7 text-[#add64e]" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-[#add64e] rounded-full animate-pulse"></div>
              </div>
              {!minimized && <span className="text-lg font-bold text-white">LogitrustKenya</span>}
            </Link>
            <nav className="flex-1">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`flex items-center ${minimized ? "justify-center" : "space-x-3"} p-3 rounded-md hover:bg-white/5 transition-colors ${
                        pathname === item.href ? "bg-white/10 text-[#add64e]" : "text-white/70"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {!minimized && <span>{item.label}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
      )}
    </>
  )
}

type MenuProps = {
  className?: string
}

const Menu = ({ className }: MenuProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

