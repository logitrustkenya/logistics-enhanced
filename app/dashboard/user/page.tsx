"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Package, MapPin, Clock, Star, CreditCard, Truck, Plus, Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for individual user
  const stats = [
    {
      title: "Active Packages",
      value: "3",
      description: "In transit",
      icon: Package,
      change: "+1 this week",
      positive: true,
    },
    {
      title: "Total Deliveries",
      value: "47",
      description: "All time",
      icon: Truck,
      change: "+5 this month",
      positive: true,
    },
    {
      title: "Money Saved",
      value: "KSh 12,450",
      description: "Through platform",
      icon: CreditCard,
      change: "15% savings",
      positive: true,
    },
    {
      title: "Avg. Rating Given",
      value: "4.6",
      description: "To providers",
      icon: Star,
      change: "Excellent feedback",
      positive: true,
    },
  ]

  const recentPackages = [
    {
      id: "PKG-2024-078",
      origin: "Nairobi CBD",
      destination: "Karen, Nairobi",
      status: "in-transit",
      provider: "QuickDelivery Kenya",
      date: "Dec 30, 2024",
      items: "Electronics",
      progress: 60,
      estimatedTime: "2 hours",
      trackingCode: "QD78945612",
    },
    {
      id: "PKG-2024-079",
      origin: "Westlands Mall",
      destination: "Kiambu Road",
      status: "pending",
      provider: "City Express",
      date: "Dec 31, 2024",
      items: "Clothing",
      progress: 10,
      estimatedTime: "4 hours",
      trackingCode: "CE12345678",
    },
    {
      id: "PKG-2024-077",
      origin: "Mombasa",
      destination: "Nairobi",
      status: "delivered",
      provider: "Coast Logistics",
      date: "Dec 29, 2024",
      items: "Books",
      progress: 100,
      estimatedTime: "Delivered",
      trackingCode: "CL98765432",
    },
  ]

  const favoriteProviders = [
    { name: "QuickDelivery Kenya", rating: 4.8, deliveries: 12, avgTime: "2.5 hrs" },
    { name: "City Express", rating: 4.6, deliveries: 8, avgTime: "3.2 hrs" },
    { name: "Speedy Couriers", rating: 4.7, deliveries: 15, avgTime: "2.8 hrs" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-[#add64e]/5 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              My Dashboard
            </h1>
            <p className="text-white/70 mt-2">Track your packages and manage deliveries</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                placeholder="Track package..."
                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#add64e] w-64"
              />
            </div>
            <Link href="/packages/send">
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#add64e] to-[#9bc943] hover:from-[#9bc943] hover:to-[#add64e] text-black font-semibold"
              >
                <Plus className="mr-2 h-4 w-4" />
                Send Package
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/5 border border-white/20 backdrop-blur-sm">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#add64e] data-[state=active]:text-black text-white/70"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="packages"
              className="data-[state=active]:bg-[#add64e] data-[state=active]:text-black text-white/70"
            >
              My Packages
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-[#add64e] data-[state=active]:text-black text-white/70"
            >
              History
            </TabsTrigger>
            <TabsTrigger
              value="providers"
              className="data-[state=active]:bg-[#add64e] data-[state=active]:text-black text-white/70"
            >
              Providers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <Card
                  key={i}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 hover:border-[#add64e]/30 transition-all duration-300"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-[#add64e]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <p className="text-xs text-white/70">{stat.description}</p>
                    <div className="mt-2 flex items-center text-xs">
                      <Badge className="bg-[#add64e]/20 text-[#add64e] border-[#add64e]/30">{stat.change}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Active Packages */}
              <Card className="lg:col-span-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Active Packages</CardTitle>
                  <CardDescription className="text-white/70">Track your current deliveries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPackages
                      .filter((pkg) => pkg.status !== "delivered")
                      .map((pkg) => (
                        <div
                          key={pkg.id}
                          className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[#add64e]/30 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <Package className="h-4 w-4 text-[#add64e]" />
                              <span className="text-sm font-medium text-white">{pkg.id}</span>
                              <Badge
                                className={
                                  pkg.status === "in-transit"
                                    ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                    : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                }
                              >
                                {pkg.status.replace("-", " ")}
                              </Badge>
                            </div>
                            <span className="text-xs text-white/70">{pkg.trackingCode}</span>
                          </div>

                          <div className="flex items-center space-x-1 text-sm text-white/70 mb-2">
                            <MapPin className="h-3 w-3" />
                            <span>{pkg.origin}</span>
                            <span>→</span>
                            <span>{pkg.destination}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-xs text-white/50">
                              <span>{pkg.items}</span>
                              <span>•</span>
                              <span>{pkg.provider}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-white/70">
                              <Clock className="h-3 w-3" />
                              <span>{pkg.estimatedTime}</span>
                            </div>
                          </div>

                          <div className="mt-3">
                            <Progress value={pkg.progress} className="h-2" />
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                  <CardDescription className="text-white/70">Common tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/packages/send">
                    <Button className="w-full bg-gradient-to-r from-[#add64e] to-[#9bc943] hover:from-[#9bc943] hover:to-[#add64e] text-black font-semibold">
                      <Plus className="mr-2 h-4 w-4" />
                      Send New Package
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/5 bg-transparent"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Track Package
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/5 bg-transparent"
                  >
                    <Star className="mr-2 h-4 w-4" />
                    Rate Provider
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Favorite Providers */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Recent Deliveries</CardTitle>
                  <CardDescription className="text-white/70">Your delivery history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentPackages
                      .filter((pkg) => pkg.status === "delivered")
                      .map((pkg) => (
                        <div key={pkg.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-white">{pkg.id}</p>
                            <p className="text-xs text-white/70">
                              {pkg.origin} → {pkg.destination}
                            </p>
                          </div>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Delivered</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Favorite Providers</CardTitle>
                  <CardDescription className="text-white/70">Your trusted delivery partners</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {favoriteProviders.map((provider, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-white">{provider.name}</p>
                          <div className="flex items-center space-x-2 text-xs text-white/70">
                            <Star className="h-3 w-3 fill-current text-yellow-400" />
                            <span>{provider.rating}</span>
                            <span>•</span>
                            <span>{provider.deliveries} deliveries</span>
                          </div>
                        </div>
                        <span className="text-xs text-white/70">{provider.avgTime}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="packages" className="space-y-6">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">All Packages</CardTitle>
                <CardDescription className="text-white/70">Manage all your packages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPackages.map((pkg) => (
                    <div key={pkg.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Package className="h-5 w-5 text-[#add64e]" />
                          <div>
                            <p className="text-sm font-medium text-white">{pkg.id}</p>
                            <p className="text-xs text-white/70">
                              {pkg.origin} → {pkg.destination}
                            </p>
                          </div>
                        </div>
                        <Badge
                          className={
                            pkg.status === "delivered"
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : pkg.status === "in-transit"
                                ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          }
                        >
                          {pkg.status.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Delivery History</CardTitle>
                <CardDescription className="text-white/70">All your past deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-[#add64e]/50 mx-auto mb-4" />
                  <p className="text-white/70">Your delivery history will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="providers" className="space-y-6">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Available Providers</CardTitle>
                <CardDescription className="text-white/70">Choose from trusted delivery partners</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {favoriteProviders.map((provider, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[#add64e]/30 transition-all duration-300"
                    >
                      <h3 className="font-medium text-white mb-2">{provider.name}</h3>
                      <div className="space-y-1 text-sm text-white/70">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-current text-yellow-400" />
                          <span>{provider.rating}/5.0</span>
                        </div>
                        <p>Deliveries: {provider.deliveries}</p>
                        <p>Avg. Time: {provider.avgTime}</p>
                      </div>
                      <Button
                        size="sm"
                        className="w-full mt-3 bg-gradient-to-r from-[#add64e] to-[#9bc943] hover:from-[#9bc943] hover:to-[#add64e] text-black font-semibold"
                      >
                        Select Provider
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
