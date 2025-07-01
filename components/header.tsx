"use client"

import { Bell, MessageSquare, Search, User, Settings, CreditCard, LogOut } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export function Header() {
  const [notifications, setNotifications] = useState(3)
  const [messages, setMessages] = useState(2)

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b border-white/10 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
      <div className="hidden md:flex md:flex-1">
        <form className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 text-white/50 transform -translate-y-1/2" />
          <Input
            type="search"
            placeholder="Search shipments, providers..."
            className="w-full bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#add64e] focus:ring-[#add64e] backdrop-blur-sm pl-10 transition-all duration-300"
          />
        </form>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3 md:justify-end">
        {/* Mobile Search */}
        <Button
          variant="outline"
          size="icon"
          className="md:hidden border-white/20 text-white hover:bg-white/5 bg-transparent hover:border-[#add64e]/50 transition-all duration-300"
        >
          <Search className="h-4 w-4" />
        </Button>

        {/* Messages */}
        <Button
          variant="outline"
          size="icon"
          className="relative border-white/20 text-white hover:bg-white/5 bg-transparent hover:border-[#add64e]/50 transition-all duration-300"
        >
          <MessageSquare className="h-4 w-4" />
          {messages > 0 && (
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-[#add64e] text-black text-xs font-semibold animate-pulse">
              {messages}
            </Badge>
          )}
        </Button>

        {/* Notifications */}
        <Button
          variant="outline"
          size="icon"
          className="relative border-white/20 text-white hover:bg-white/5 bg-transparent hover:border-[#add64e]/50 transition-all duration-300"
        >
          <Bell className="h-4 w-4" />
          {notifications > 0 && (
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-[#add64e] text-black text-xs font-semibold animate-pulse">
              {notifications}
            </Badge>
          )}
        </Button>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-white/20 text-white hover:bg-white/5 bg-transparent hover:border-[#add64e]/50 transition-all duration-300 p-0"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback className="bg-gradient-to-r from-[#add64e] to-[#9bc943] text-black font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-gray-900/95 backdrop-blur-xl border-white/20 shadow-xl">
            <DropdownMenuLabel className="text-white">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-white/70">john@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/20" />

            <DropdownMenuItem className="text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <Link href="/profile" className="flex-1">
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <Link href="/settings" className="flex-1">
                Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4" />
              <Link href="/billing" className="flex-1">
                Billing
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-white/20" />

            <DropdownMenuItem className="text-red-400 hover:bg-red-400/10 focus:bg-red-400/10 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}


