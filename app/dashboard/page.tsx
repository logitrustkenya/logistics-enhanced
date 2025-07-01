"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Package, Truck, CreditCard, Users, BarChart3, ArrowRight, Leaf } from "lucide-react"
import Link from "next/link"
import { ShipmentCard } from "@/components/shipment-card"
import { RecentActivity } from "@/components/recent-activity"
import { QuoteRequestCard } from "@/components/quote-request-card"

export default function SMEDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Placeholders for data
  const stats: any[] = []
  const shipments: any[] = []
  const quoteRequests: any[] = []

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-[#add64e]/5 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              SME Dashboard
            </h1>
            <p className="text-white/70 mt-2">Manage your logistics operations efficiently</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/5 bg-transparent">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Export
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
              value="quotes"
              className="data-[state=active]:bg-[#add64e] data-[state=active]:text-black text-white/70"
            >
              Quotes
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-[#add64e] data-[state=active]:text-black text-white/70"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
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

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Recent Shipments</CardTitle>
                  <CardDescription className="text-white/70">Your recent and upcoming shipments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {shipments.map((shipment) => (
                      <ShipmentCard key={shipment.id} shipment={shipment} />
                    ))}
                    <div className="flex justify-center mt-4">
                      <Link href="/shipments">
                        <Button
                          variant="outline"
                          className="w-full border-white/20 text-white hover:bg-white/5 bg-transparent"
                        >
                          View all shipments
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                  <CardDescription className="text-white/70">Latest updates and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivity />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-[#add64e]" />
                    Carbon Footprint
                  </CardTitle>
                  <CardDescription className="text-white/70">Track your environmental impact</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">Monthly Carbon Emissions</p>
                        <p className="text-2xl font-bold text-white">245 kg CO₂</p>
                      </div>
                      <Badge className="bg-[#add64e]/20 text-[#add64e] border-[#add64e]/30">-12% from last month</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-white/70">
                        <div>Current</div>
                        <div>245 kg of 300 kg target</div>
                      </div>
                      <Progress value={82} className="h-2 bg-white/10" />
                    </div>
                    <div className="pt-4 grid grid-cols-3 gap-4 text-center text-sm">
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <p className="text-white/70">Road</p>
                        <p className="font-medium mt-1 text-white">180 kg</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <p className="text-white/70">Rail</p>
                        <p className="font-medium mt-1 text-white">45 kg</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <p className="text-white/70">Air</p>
                        <p className="font-medium mt-1 text-white">20 kg</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Delivery Performance</CardTitle>
                  <CardDescription className="text-white/70">On-time delivery metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">On-time Delivery Rate</p>
                        <p className="text-2xl font-bold text-white">92%</p>
                      </div>
                      <Badge className="bg-[#add64e]/20 text-[#add64e] border-[#add64e]/30">+3% from last month</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-white/70">
                        <div>Target: 95%</div>
                      </div>
                      <Progress value={92} className="h-2 bg-white/10" />
                    </div>
                    <div className="pt-4 grid grid-cols-2 gap-4 text-center text-sm">
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <p className="text-white/70">Avg. Delivery Time</p>
                        <p className="font-medium mt-1 text-white">2.3 days</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <p className="text-white/70">Delayed Shipments</p>
                        <p className="font-medium mt-1 text-white">4 of 52</p>
                      </div>
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
                <CardDescription className="text-white/70">View and manage all your shipments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {shipments.map((shipment) => (
                    <ShipmentCard key={shipment.id} shipment={shipment} />
                  ))}
                  <div className="flex justify-center mt-4">
                    <Link href="/shipments">
                      <Button className="w-full bg-gradient-to-r from-[#add64e] to-[#9bc943] hover:from-[#9bc943] hover:to-[#add64e] text-black font-semibold">
                        View All Shipments
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quotes" className="space-y-6">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Quote Requests</CardTitle>
                <CardDescription className="text-white/70">View and manage your quote requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quoteRequests.map((quote) => (
                    <QuoteRequestCard key={quote.id} quote={quote} />
                  ))}
                  <div className="flex justify-center mt-4">
                    <Link href="/quotes/request">
                      <Button className="w-full bg-gradient-to-r from-[#add64e] to-[#9bc943] hover:from-[#9bc943] hover:to-[#add64e] text-black font-semibold">
                        Request New Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Logistics Analytics</CardTitle>
                <CardDescription className="text-white/70">Insights into your logistics operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="bg-white/5 border border-white/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-white">Shipment Volume</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] flex items-center justify-center bg-white/5 rounded-md border border-white/10">
                        <BarChart3 className="h-16 w-16 text-[#add64e]/50" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/5 border border-white/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-white">Cost Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] flex items-center justify-center bg-white/5 rounded-md border border-white/10">
                        <BarChart3 className="h-16 w-16 text-[#add64e]/50" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/5 border border-white/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-white">Provider Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] flex items-center justify-center bg-white/5 rounded-md border border-white/10">
                        <BarChart3 className="h-16 w-16 text-[#add64e]/50" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/5 border border-white/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-white">Environmental Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] flex items-center justify-center bg-white/5 rounded-md border border-white/10">
                        <Leaf className="h-16 w-16 text-[#add64e]/50" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

