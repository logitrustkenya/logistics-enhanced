"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Package, Truck, CreditCard, BarChart3, ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import { ShipmentRequestCard } from "@/components/shipment-request-card"
import { RecentActivity } from "@/components/recent-activity"

export default function ProviderDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const stats = [
    {
      title: "Active Deliveries",
      value: "18",
      description: "5 pending pickup",
      icon: Truck,
      change: "+3 from last week",
      positive: true,
    },
    {
      title: "Completed Deliveries",
      value: "156",
      description: "This month",
      icon: Package,
      change: "+12% from last month",
      positive: true,
    },
    {
      title: "Total Revenue",
      value: "KSh 78,450",
      description: "This month",
      icon: CreditCard,
      change: "+8% from last month",
      positive: true,
    },
    {
      title: "Customer Rating",
      value: "4.8/5",
      description: "Based on 45 reviews",
      icon: Star,
      change: "+0.2 from last month",
      positive: true,
    },
  ]

  const shipmentRequests = [
    {
      id: "REQ-1234",
      origin: "Nairobi CBD",
      destination: "Mombasa",
      packageType: "Electronics",
      weight: "25 kg",
      date: "Apr 3, 2025",
      deadline: "Apr 5, 2025",
      status: "new",
    },
    {
      id: "REQ-1235",
      origin: "Kisumu",
      destination: "Nakuru",
      packageType: "Furniture",
      weight: "120 kg",
      date: "Apr 2, 2025",
      deadline: "Apr 4, 2025",
      status: "quoted",
    },
    {
      id: "REQ-1236",
      origin: "Eldoret",
      destination: "Nairobi",
      packageType: "Agricultural Products",
      weight: "75 kg",
      date: "Apr 2, 2025",
      deadline: "Apr 6, 2025",
      status: "new",
    },
  ]

  const assignedDeliveries = [
    {
      id: "SHP-1240",
      origin: "Nairobi CBD",
      destination: "Thika",
      customer: "Nairobi Textiles Ltd",
      date: "Apr 2, 2025",
      status: "assigned",
      progress: 10,
    },
    {
      id: "SHP-1241",
      origin: "Mombasa",
      destination: "Malindi",
      customer: "Coastal Supplies Co.",
      date: "Apr 1, 2025",
      status: "in-transit",
      progress: 65,
    },
    {
      id: "SHP-1242",
      origin: "Nairobi Westlands",
      destination: "Machakos",
      customer: "Tech Solutions Kenya",
      date: "Mar 31, 2025",
      status: "delivered",
      progress: 100,
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Provider Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Link href="/deliveries/manage">
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <Truck className="mr-2 h-4 w-4" />
              Manage Deliveries
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requests">Shipment Requests</TabsTrigger>
          <TabsTrigger value="deliveries">Assigned Deliveries</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
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
                <CardTitle>New Shipment Requests</CardTitle>
                <CardDescription>Recent requests from SMEs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {shipmentRequests
                    .filter((req) => req.status === "new")
                    .map((request) => (
                      <ShipmentRequestCard key={request.id} request={request} />
                    ))}
                  <div className="flex justify-center mt-4">
                    <Link href="/requests">
                      <Button variant="outline" className="w-full">
                        View all requests
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
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Your delivery performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">On-time Delivery Rate</p>
                      <p className="text-2xl font-bold">94%</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">+2% from last month</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div>Current</div>
                      <div>94% of 95% target</div>
                    </div>
                    <Progress value={94} className="h-2 bg-gray-200" />
                  </div>
                  <div className="pt-4 grid grid-cols-3 gap-4 text-center text-sm">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-muted-foreground">Avg. Pickup Time</p>
                      <p className="font-medium mt-1">1.2 hours</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-muted-foreground">Avg. Delivery Time</p>
                      <p className="font-medium mt-1">2.5 days</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-muted-foreground">Customer Satisfaction</p>
                      <p className="font-medium mt-1">4.8/5</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Financial performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Monthly Revenue</p>
                      <p className="text-2xl font-bold">KSh 78,450</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">+8% from last month</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div>Target: KSh 85,000</div>
                    </div>
                    <Progress value={92} className="h-2 bg-gray-200" />
                  </div>
                  <div className="pt-4 grid grid-cols-2 gap-4 text-center text-sm">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-muted-foreground">Avg. Revenue per Delivery</p>
                      <p className="font-medium mt-1">KSh 3,250</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-muted-foreground">Pending Payments</p>
                      <p className="font-medium mt-1">KSh 12,500</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shipment Requests</CardTitle>
              <CardDescription>View and respond to shipment requests from SMEs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shipmentRequests.map((request) => (
                  <ShipmentRequestCard key={request.id} request={request} />
                ))}
                <div className="flex justify-center mt-4">
                  <Link href="/requests">
                    <Button className="w-full bg-green-600 hover:bg-green-700">View All Requests</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="deliveries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Deliveries</CardTitle>
              <CardDescription>Manage your assigned deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignedDeliveries.map((delivery) => (
                  <div key={delivery.id} className="rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Truck className="h-5 w-5 text-gray-500" />
                        <Link href={`/deliveries/${delivery.id}`} className="font-medium hover:underline">
                          {delivery.id}
                        </Link>
                        <Badge
                          variant="outline"
                          className={
                            delivery.status === "assigned"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                              : delivery.status === "in-transit"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-green-50 text-green-700 border-green-200"
                          }
                        >
                          {delivery.status === "assigned"
                            ? "Assigned"
                            : delivery.status === "in-transit"
                              ? "In Transit"
                              : "Delivered"}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{delivery.date}</div>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-4 md:grid-cols-4">
                      <div>
                        <p className="text-sm font-medium">From</p>
                        <p className="text-sm text-muted-foreground">{delivery.origin}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">To</p>
                        <p className="text-sm text-muted-foreground">{delivery.destination}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Customer</p>
                        <p className="text-sm text-muted-foreground">{delivery.customer}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Progress</p>
                        <Progress value={delivery.progress} className="h-2 mt-2" />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Link
                        href={`/deliveries/${delivery.id}`}
                        className="text-sm text-green-600 hover:text-green-700 flex items-center"
                      >
                        Manage delivery
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
                <div className="flex justify-center mt-4">
                  <Link href="/deliveries">
                    <Button className="w-full bg-green-600 hover:bg-green-700">View All Deliveries</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Detailed metrics about your logistics performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Delivery Times</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-md">
                      <BarChart3 className="h-16 w-16 text-gray-300" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Customer Ratings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-md">
                      <Star className="h-16 w-16 text-gray-300" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Revenue Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-md">
                      <BarChart3 className="h-16 w-16 text-gray-300" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Delivery Efficiency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-md">
                      <Truck className="h-16 w-16 text-gray-300" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

