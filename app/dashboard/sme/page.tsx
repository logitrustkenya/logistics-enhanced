"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Package, CreditCard, Users, BarChart3, Leaf, TrendingUp, MapPin } from "lucide-react"
import Link from "next/link"
import { ShipmentCard } from "@/components/shipment-card"

export default function SMEDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for SME
  const stats = [
    {
      title: "Active Shipments",
      value: "24",
      description: "8 pending pickup",
      icon: Package,
      change: "+12% from last month",
      positive: true,
    },
    {
      title: "Monthly Spend",
      value: "KSh 127,450",
      description: "Logistics costs",
      icon: CreditCard,
      change: "-8% from last month",
      positive: true,
    },
    {
      title: "Delivery Success Rate",
      value: "96.8%",
      description: "On-time deliveries",
      icon: TrendingUp,
      change: "+2.1% improvement",
      positive: true,
    },
    {
      title: "Trusted Providers",
      value: "12",
      description: "Active partnerships",
      icon: Users,
      change: "+3 new this month",
      positive: true,
    },
  ]

  const recentShipments = [
    {
      id: "SHP-2024-001",
      origin: "Nairobi Industrial Area",
      destination: "Mombasa Port",
      status: "in-transit",
      provider: "Kenya Express Logistics",
      date: "Dec 30, 2024",
      items: "Manufacturing Equipment",
      progress: 75,
      value: "KSh 15,200",
    },
    {
      id: "SHP-2024-002",
      origin: "Kisumu Warehouse",
      destination: "Nakuru Distribution Center",
      status: "pending",
      provider: "Pending Assignment",
      date: "Dec 31, 2024",
      items: "Agricultural Products",
      progress: 5,
      value: "KSh 8,500",
    },
    {
      id: "SHP-2024-003",
      origin: "Eldoret Factory",
      destination: "Nairobi CBD",
      status: "delivered",
      provider: "Swift Cargo",
      date: "Dec 29, 2024",
      items: "Textile Products",
      progress: 100,
      value: "KSh 12,300",
    },
  ]

  const costAnalysis = [
    { category: "Road Transport", amount: 85600, percentage: 67 },
    { category: "Air Freight", amount: 28400, percentage: 22 },
    { category: "Rail Transport", amount: 9200, percentage: 7 },
    { category: "Storage & Handling", amount: 4250, percentage: 4 },
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
                    {recentShipments.map((shipment) => (
                      <div
                        key={shipment.id}
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
                    ))}
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
                          <span className="text-white font-medium">KSh {item.amount.toLocaleString()}</span>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
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
                        <p className="text-2xl font-bold text-white">342 kg CO₂</p>
                        <p className="text-sm text-white/70">This month</p>
                      </div>
                      <Badge className="bg-[#add64e]/20 text-[#add64e] border-[#add64e]/30">-15% reduction</Badge>
                    </div>
                    <Progress value={68} className="h-2" />
                    <p className="text-xs text-white/70">68% of monthly target (500 kg CO₂)</p>
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
                      <p className="text-2xl font-bold text-white">2.1</p>
                      <p className="text-xs text-white/70">Avg. Days</p>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <p className="text-2xl font-bold text-white">96.8%</p>
                      <p className="text-xs text-white/70">Success Rate</p>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <p className="text-2xl font-bold text-white">4.8</p>
                      <p className="text-xs text-white/70">Avg. Rating</p>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <p className="text-2xl font-bold text-white">KSh 2,340</p>
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
                  {recentShipments.map((shipment) => (
                    <ShipmentCard key={shipment.id} shipment={shipment} />
                  ))}
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
                    <BarChart3 className="h-16 w-16 text-[#add64e]/50" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Route Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-white/5 rounded-md border border-white/10">
                    <MapPin className="h-16 w-16 text-[#add64e]/50" />
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
                  {[
                    { name: "Kenya Express Logistics", rating: 4.8, shipments: 45, cost: "KSh 2,100" },
                    { name: "Swift Cargo", rating: 4.6, shipments: 32, cost: "KSh 1,950" },
                    { name: "Reliable Transport Co.", rating: 4.7, shipments: 28, cost: "KSh 2,250" },
                  ].map((provider, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <h3 className="font-medium text-white">{provider.name}</h3>
                      <div className="mt-2 space-y-1 text-sm text-white/70">
                        <p>Rating: {provider.rating}/5.0</p>
                        <p>Shipments: {provider.shipments}</p>
                        <p>Avg. Cost: {provider.cost}</p>
                      </div>
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


