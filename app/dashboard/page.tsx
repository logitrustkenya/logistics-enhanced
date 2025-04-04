"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Package, Truck, CreditCard, Users, BarChart3, ArrowRight, Bell } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ShipmentCard } from "@/components/shipment-card"
import { RecentActivity } from "@/components/recent-activity"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const stats = [
    {
      title: "Active Shipments",
      value: "12",
      description: "3 pending delivery",
      icon: Package,
      change: "+2 from last week",
      positive: true,
    },
    {
      title: "Completed Deliveries",
      value: "124",
      description: "This month",
      icon: Truck,
      change: "+15% from last month",
      positive: true,
    },
    {
      title: "Total Spent",
      value: "KSh 45,231",
      description: "This month",
      icon: CreditCard,
      change: "-5% from last month",
      positive: false,
    },
    {
      title: "Trusted Providers",
      value: "8",
      description: "Out of 15 used",
      icon: Users,
      change: "+2 new providers",
      positive: true,
    },
  ]

  const shipments = [
    {
      id: "SHP-1234",
      origin: "Nairobi CBD",
      destination: "Mombasa",
      status: "in-transit",
      provider: "FastTruck Logistics",
      date: "Apr 2, 2025",
      items: "Office Supplies",
      progress: 65,
    },
    {
      id: "SHP-1235",
      origin: "Kisumu",
      destination: "Nakuru",
      status: "pending",
      provider: "Pending Assignment",
      date: "Apr 3, 2025",
      items: "Electronics",
      progress: 10,
    },
    {
      id: "SHP-1236",
      origin: "Nairobi Westlands",
      destination: "Eldoret",
      status: "delivered",
      provider: "Kenya Express",
      date: "Apr 1, 2025",
      items: "Furniture",
      progress: 100,
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Link href="/shipments/create">
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <Package className="mr-2 h-4 w-4" />
              New Shipment
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                  <div className="mt-2 flex items-center text-xs">
                    <Badge
                      variant={stat.positive ? "default" : "destructive"}
                      className={stat.positive ? "bg-green-500" : ""}
                    >
                      {stat.change}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Shipments</CardTitle>
                <CardDescription>Your recent and upcoming shipments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {shipments.map((shipment) => (
                    <ShipmentCard key={shipment.id} shipment={shipment} />
                  ))}
                  <div className="flex justify-center mt-4">
                    <Link href="/shipments">
                      <Button variant="outline" className="w-full">
                        View all shipments
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Carbon Footprint</CardTitle>
                <CardDescription>Track your environmental impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Monthly Carbon Emissions</p>
                      <p className="text-2xl font-bold">245 kg CO₂</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">-12% from last month</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div>Current</div>
                      <div>245 kg of 300 kg target</div>
                    </div>
                    <Progress value={82} className="h-2 bg-gray-200" />
                  </div>
                  <div className="pt-4 grid grid-cols-3 gap-4 text-center text-sm">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-muted-foreground">Road</p>
                      <p className="font-medium mt-1">180 kg</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-muted-foreground">Rail</p>
                      <p className="font-medium mt-1">45 kg</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-muted-foreground">Air</p>
                      <p className="font-medium mt-1">20 kg</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Delivery Performance</CardTitle>
                <CardDescription>On-time delivery metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">On-time Delivery Rate</p>
                      <p className="text-2xl font-bold">92%</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">+3% from last month</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div>Target: 95%</div>
                    </div>
                    <Progress value={92} className="h-2 bg-gray-200" />
                  </div>
                  <div className="pt-4 grid grid-cols-2 gap-4 text-center text-sm">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-muted-foreground">Avg. Delivery Time</p>
                      <p className="font-medium mt-1">2.3 days</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-muted-foreground">Delayed Shipments</p>
                      <p className="font-medium mt-1">4 of 52</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View detailed analytics of your logistics operations</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">Analytics Dashboard</h3>
                <p className="mt-2 text-sm text-muted-foreground">Detailed analytics will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and view reports for your logistics operations</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">Reports Dashboard</h3>
                <p className="mt-2 text-sm text-muted-foreground">Detailed reports will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>View and manage your notifications</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <Bell className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">Notifications Dashboard</h3>
                <p className="mt-2 text-sm text-muted-foreground">Your notifications will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

