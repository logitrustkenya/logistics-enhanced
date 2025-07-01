"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Package, CreditCard, Users, BarChart3, Leaf, TrendingUp, MapPin } from "lucide-react"
import Link from "next/link"

interface StatCard {
  title: string
  value: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  change: string
  positive: boolean
}

interface Shipment {
  id: string
  origin: string
  destination: string
  status: "pending" | "in-transit" | "delivered"
  provider: string
  date: string
  items: string
  progress: number
  value: string
}

interface CostAnalysis {
  category: string
  amount: number
  percentage: number
}

interface Provider {
  name: string
  rating: number
  shipments: number
  cost: string
}

export default function SMEDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Placeholder data structure - replace with actual data fetching
  const stats: StatCard[] = [
    {
      title: "Active Shipments",
      value: "--",
      description: "-- pending pickup",
      icon: Package,
      change: "-- from last month",
      positive: true,
    },
    {
      title: "Monthly Spend",
      value: "KSh --",
      description: "Logistics costs",
      icon: CreditCard,
      change: "-- from last month",
      positive: true,
    },
    {
      title: "Delivery Success Rate",
      value: "--%",
      description: "On-time deliveries",
      icon: TrendingUp,
      change: "-- improvement",
      positive: true,
    },
    {
      title: "Trusted Providers",
      value: "--",
      description: "Active partnerships",
      icon: Users,
      change: "-- new this month",
      positive: true,
    },
  ]

  const recentShipments: Shipment[] = [
    {
      id: "Loading...",
      origin: "Loading origin...",
      destination: "Loading destination...",
      status: "pending",
      provider: "Loading provider...",
      date: "--",
      items: "Loading items...",
      progress: 0,
      value: "KSh --",
    },
    {
      id: "Loading...",
      origin: "Loading origin...",
      destination: "Loading destination...",
      status: "pending",
      provider: "Loading provider...",
      date: "--",
      items: "Loading items...",
      progress: 0,
      value: "KSh --",
    },
    {
      id: "Loading...",
      origin: "Loading origin...",
      destination: "Loading destination...",
      status: "pending",
      provider: "Loading provider...",
      date: "--",
      items: "Loading items...",
      progress: 0,
      value: "KSh --",
    },
  ]

  const costAnalysis: CostAnalysis[] = [
    { category: "Road Transport", amount: 0, percentage: 0 },
    { category: "Air Freight", amount: 0, percentage: 0 },
    { category: "Rail Transport", amount: 0, percentage: 0 },
    { category: "Storage & Handling", amount: 0, percentage: 0 },
  ]

  const providers: Provider[] = [
    { name: "Loading provider...", rating: 0, shipments: 0, cost: "KSh --" },
    { name: "Loading provider...", rating: 0, shipments: 0, cost: "KSh --" },
    { name: "Loading provider...", rating: 0, shipments: 0, cost: "KSh --" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-[#add64e]/5 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              SME Dashboard
            </h1>
            <p className="text-white/70 mt-2">Manage your business logistics operations</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/5 bg-transparent">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Link href="/shipments/create">
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#add64e] to-[#9bc943] hover:from-[#9bc943] hover:to-[#add64e] text-black font-semibold"
              >
                <Package className="mr-2 h-4 w-4" />
                New Shipment
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
              value="shipments"
              className="data-[state=active]:bg-[#add64e] data-[state=active]:text-black text-white/70"
            >
              Shipments
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-[#add64e] data-[state=active]:text-black text-white/70"
            >
              Analytics
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
                      <Badge
                        variant={stat.positive ? "default" : "destructive"}
                        className={stat.positive ? "bg-[#add64e]/20 text-[#add64e] border-[#add64e]/30" : ""}
                      >
                        {stat.change}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Recent Shipments */}
              <Card className="lg:col-span-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Recent Shipments</CardTitle>
                  <CardDescription className="text-white/70">Your latest logistics operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentShipments.length > 0 ? (
                      recentShipments.map((shipment, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <Package className="h-5 w-5 text-[#add64e]" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center space-x-2">
                                <p className="text-sm font-medium text-white">{shipment.id}</p>
                                <Badge
                                  className={
                                    shipment.status === "delivered"
                                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                                      : shipment.status === "in-transit"
                                        ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                        : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                  }
                                >
                                  {shipment.status.replace("-", " ")}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-1 text-sm text-white/70">
                                <span>{shipment.origin}</span>
                                <span>→</span>
                                <span>{shipment.destination}</span>
                              </div>
                              <p className="text-xs text-white/50">
                                {shipment.items} • {shipment.provider}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-white">{shipment.value}</p>
                            <p className="text-xs text-white/70">{shipment.date}</p>
                            <div className="w-20 mt-1">
                              <Progress value={shipment.progress} className="h-1" />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-white/50">
                        <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No shipments found</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Cost Breakdown */}
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Cost Breakdown</CardTitle>
                  <CardDescription className="text-white/70">Monthly logistics expenses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {costAnalysis.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/70">{item.category}</span>
                          <span className="text-white font-medium">
                            {item.amount > 0 ? `KSh ${item.amount.toLocaleString()}` : "KSh --"}
                          </span>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                  {costAnalysis.every(item => item.amount === 0) && (
                    <div className="text-center py-4 text-white/50">
                      <p className="text-sm">No cost data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Environmental Impact */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-[#add64e]" />
                    Carbon Footprint
                  </CardTitle>
                  <CardDescription className="text-white/70">Environmental impact tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-white">-- kg CO₂</p>
                        <p className="text-sm text-white/70">This month</p>
                      </div>
                      <Badge className="bg-[#add64e]/20 text-[#add64e] border-[#add64e]/30">-- reduction</Badge>
                    </div>
                    <Progress value={0} className="h-2" />
                    <p className="text-xs text-white/70">No data available</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Performance Metrics</CardTitle>
                  <CardDescription className="text-white/70">Key operational indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <p className="text-2xl font-bold text-white">--</p>
                      <p className="text-xs text-white/70">Avg. Days</p>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <p className="text-2xl font-bold text-white">--%</p>
                      <p className="text-xs text-white/70">Success Rate</p>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <p className="text-2xl font-bold text-white">--</p>
                      <p className="text-xs text-white/70">Avg. Rating</p>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <p className="text-2xl font-bold text-white">KSh --</p>
                      <p className="text-xs text-white/70">Avg. Cost</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="shipments" className="space-y-6">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">All Shipments</CardTitle>
                <CardDescription className="text-white/70">Manage your business shipments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentShipments.length > 0 ? (
                    recentShipments.map((shipment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <Package className="h-5 w-5 text-[#add64e]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-medium text-white">{shipment.id}</p>
                              <Badge
                                className={
                                  shipment.status === "delivered"
                                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                                    : shipment.status === "in-transit"
                                      ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                      : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                }
                              >
                                {shipment.status.replace("-", " ")}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-white/70">
                              <span>{shipment.origin}</span>
                              <span>→</span>
                              <span>{shipment.destination}</span>
                            </div>
                            <p className="text-xs text-white/50">
                              {shipment.items} • {shipment.provider}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-white">{shipment.value}</p>
                          <p className="text-xs text-white/70">{shipment.date}</p>
                          <div className="w-20 mt-1">
                            <Progress value={shipment.progress} className="h-1" />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-white/50">
                      <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No shipments found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Monthly Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-white/5 rounded-md border border-white/10">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-[#add64e]/50 mx-auto mb-2" />
                      <p className="text-white/50 text-sm">Chart will appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Route Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-white/5 rounded-md border border-white/10">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-[#add64e]/50 mx-auto mb-2" />
                      <p className="text-white/50 text-sm">Map will appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="providers" className="space-y-6">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Trusted Providers</CardTitle>
                <CardDescription className="text-white/70">Your logistics partners</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {providers.map((provider, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <h3 className="font-medium text-white">{provider.name}</h3>
                      <div className="mt-2 space-y-1 text-sm text-white/70">
                        <p>Rating: {provider.rating > 0 ? `${provider.rating}/5.0` : "--/5.0"}</p>
                        <p>Shipments: {provider.shipments > 0 ? provider.shipments : "--"}</p>
                        <p>Avg. Cost: {provider.cost}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {providers.every(p => p.shipments === 0) && (
                  <div className="text-center py-8 text-white/50">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No providers found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

