"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Package, Truck, CreditCard, MapPin, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"
import { RecentActivity } from "@/components/recent-activity"
import Image from "next/image"

export default function DeliveryPersonnelDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const stats = [
    {
      title: "Today's Deliveries",
      value: "5",
      description: "2 completed, 3 pending",
      icon: Truck,
      change: "+1 from yesterday",
      positive: true,
    },
    {
      title: "Total Distance",
      value: "78 km",
      description: "Today's route",
      icon: MapPin,
      change: "-12 km from yesterday",
      positive: true,
    },
    {
      title: "Earnings Today",
      value: "KSh 2,450",
      description: "Based on completed deliveries",
      icon: CreditCard,
      change: "+KSh 450 from yesterday",
      positive: true,
    },
    {
      title: "On-time Rate",
      value: "95%",
      description: "Last 30 days",
      icon: Clock,
      change: "+2% from last month",
      positive: true,
    },
  ]

  const assignedDeliveries = [
    {
      id: "SHP-1250",
      origin: "Nairobi CBD, Kimathi Street",
      destination: "Westlands, Sarit Centre",
      customer: "Tech Solutions Ltd",
      pickupTime: "10:00 AM",
      estimatedDelivery: "12:30 PM",
      status: "assigned",
      progress: 0,
      priority: "high",
    },
    {
      id: "SHP-1251",
      origin: "Nairobi, Moi Avenue",
      destination: "Nairobi, Karen",
      customer: "Karen Boutique",
      pickupTime: "11:30 AM",
      estimatedDelivery: "2:00 PM",
      status: "in-transit",
      progress: 50,
      priority: "medium",
    },
    {
      id: "SHP-1252",
      origin: "Nairobi, Industrial Area",
      destination: "Nairobi, Eastleigh",
      customer: "Eastleigh Wholesalers",
      pickupTime: "2:30 PM",
      estimatedDelivery: "4:00 PM",
      status: "assigned",
      progress: 0,
      priority: "medium",
    },
    {
      id: "SHP-1253",
      origin: "Nairobi, Ngong Road",
      destination: "Nairobi, Kilimani",
      customer: "Kilimani Apartments",
      pickupTime: "9:00 AM",
      estimatedDelivery: "10:30 AM",
      status: "delivered",
      progress: 100,
      priority: "high",
    },
    {
      id: "SHP-1254",
      origin: "Nairobi, Upperhill",
      destination: "Nairobi, South B",
      customer: "South B Medical Supplies",
      pickupTime: "8:30 AM",
      estimatedDelivery: "10:00 AM",
      status: "delivered",
      progress: 100,
      priority: "medium",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "assigned":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Assigned
          </Badge>
        )
      case "in-transit":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            In Transit
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Delivered
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            High Priority
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            Medium Priority
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Low Priority
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Delivery Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Link href="/deliveries/route">
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <MapPin className="mr-2 h-4 w-4" />
              View Route
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deliveries">Today's Deliveries</TabsTrigger>
          <TabsTrigger value="route">Route Map</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
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
                <CardTitle>Today's Deliveries</CardTitle>
                <CardDescription>Your assigned deliveries for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignedDeliveries
                    .filter((delivery) => delivery.status !== "delivered")
                    .slice(0, 3)
                    .map((delivery) => (
                      <div key={delivery.id} className="rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Package className="h-5 w-5 text-gray-500" />
                            <Link href={`/deliveries/${delivery.id}`} className="font-medium hover:underline">
                              {delivery.id}
                            </Link>
                            {getStatusBadge(delivery.status)}
                            {getPriorityBadge(delivery.priority)}
                          </div>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> Pickup
                            </p>
                            <p className="text-sm text-muted-foreground">{delivery.origin}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> Delivery
                            </p>
                            <p className="text-sm text-muted-foreground">{delivery.destination}</p>
                          </div>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium flex items-center gap-1">
                              <Clock className="h-3 w-3" /> Pickup Time
                            </p>
                            <p className="text-sm text-muted-foreground">{delivery.pickupTime}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium flex items-center gap-1">
                              <Clock className="h-3 w-3" /> Delivery Time
                            </p>
                            <p className="text-sm text-muted-foreground">{delivery.estimatedDelivery}</p>
                          </div>
                        </div>
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div>Progress</div>
                            <div>{delivery.progress}%</div>
                          </div>
                          <Progress value={delivery.progress} className="h-2" />
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Link href={`/deliveries/${delivery.id}`}>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              {delivery.status === "assigned" ? "Start Delivery" : "Update Status"}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  <div className="flex justify-center mt-4">
                    <Link href="/deliveries">
                      <Button variant="outline" className="w-full">
                        View all deliveries
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
          <Card>
            <CardHeader>
              <CardTitle>Today's Route</CardTitle>
              <CardDescription>Optimized delivery route for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg overflow-hidden border h-[300px] relative">
                <Image
                  src="/placeholder.svg?height=300&width=800"
                  alt="Route Map"
                  width={800}
                  height={300}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4">
                  <Link href="/deliveries/route">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Open Navigation
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="deliveries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Deliveries</CardTitle>
              <CardDescription>All your assigned deliveries for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignedDeliveries.map((delivery) => (
                  <div key={delivery.id} className="rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-gray-500" />
                        <Link href={`/deliveries/${delivery.id}`} className="font-medium hover:underline">
                          {delivery.id}
                        </Link>
                        {getStatusBadge(delivery.status)}
                        {getPriorityBadge(delivery.priority)}
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> Pickup
                        </p>
                        <p className="text-sm text-muted-foreground">{delivery.origin}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> Delivery
                        </p>
                        <p className="text-sm text-muted-foreground">{delivery.destination}</p>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium flex items-center gap-1">
                          <Clock className="h-3 w-3" /> Pickup Time
                        </p>
                        <p className="text-sm text-muted-foreground">{delivery.pickupTime}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium flex items-center gap-1">
                          <Clock className="h-3 w-3" /> Delivery Time
                        </p>
                        <p className="text-sm text-muted-foreground">{delivery.estimatedDelivery}</p>
                      </div>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div>Progress</div>
                        <div>{delivery.progress}%</div>
                      </div>
                      <Progress value={delivery.progress} className="h-2" />
                    </div>
                    <div className="mt-4 flex justify-end">
                      {delivery.status !== "delivered" ? (
                        <Link href={`/deliveries/${delivery.id}`}>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            {delivery.status === "assigned" ? "Start Delivery" : "Update Status"}
                          </Button>
                        </Link>
                      ) : (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="route" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Route Map</CardTitle>
              <CardDescription>Optimized delivery route for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg overflow-hidden border h-[500px] relative">
                <Image
                  src="/placeholder.svg?height=500&width=800"
                  alt="Route Map"
                  width={800}
                  height={500}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Open Navigation
                  </Button>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Delivery Sequence</h3>
                <div className="space-y-2">
                  {assignedDeliveries
                    .filter((delivery) => delivery.status !== "delivered")
                    .map((delivery, index) => (
                      <div key={delivery.id} className="flex items-center p-3 border rounded-lg">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-700 text-sm font-medium mr-3">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{delivery.id}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-muted-foreground">
                              {delivery.origin} → {delivery.destination}
                            </p>
                            {getPriorityBadge(delivery.priority)}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {delivery.pickupTime} - {delivery.estimatedDelivery}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="earnings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
              <CardDescription>Track your earnings and payment history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">KSh 2,450</div>
                    <p className="text-xs text-muted-foreground">From 2 completed deliveries</p>
                    <div className="mt-2">
                      <Badge className="bg-green-100 text-green-800">+KSh 450 from yesterday</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">This Week</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">KSh 12,850</div>
                    <p className="text-xs text-muted-foreground">From 15 completed deliveries</p>
                    <div className="mt-2">
                      <Badge className="bg-green-100 text-green-800">+8% from last week</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">This Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">KSh 45,200</div>
                    <p className="text-xs text-muted-foreground">From 52 completed deliveries</p>
                    <div className="mt-2">
                      <Badge className="bg-green-100 text-green-800">+12% from last month</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Recent Payments</h3>
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                    <div>Date</div>
                    <div>Description</div>
                    <div>Deliveries</div>
                    <div className="text-right">Amount</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 p-4 border-b hover:bg-gray-50 transition-colors">
                    <div className="text-sm">Apr 2, 2025</div>
                    <div className="text-sm">Daily payment</div>
                    <div className="text-sm">5 deliveries</div>
                    <div className="text-sm font-medium text-right">KSh 3,250</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 p-4 border-b hover:bg-gray-50 transition-colors">
                    <div className="text-sm">Apr 1, 2025</div>
                    <div className="text-sm">Daily payment</div>
                    <div className="text-sm">4 deliveries</div>
                    <div className="text-sm font-medium text-right">KSh 2,800</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 p-4 border-b hover:bg-gray-50 transition-colors">
                    <div className="text-sm">Mar 31, 2025</div>
                    <div className="text-sm">Daily payment</div>
                    <div className="text-sm">6 deliveries</div>
                    <div className="text-sm font-medium text-right">KSh 3,900</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 p-4 border-b hover:bg-gray-50 transition-colors">
                    <div className="text-sm">Mar 30, 2025</div>
                    <div className="text-sm">Daily payment</div>
                    <div className="text-sm">3 deliveries</div>
                    <div className="text-sm font-medium text-right">KSh 2,100</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 p-4 hover:bg-gray-50 transition-colors">
                    <div className="text-sm">Mar 29, 2025</div>
                    <div className="text-sm">Daily payment</div>
                    <div className="text-sm">5 deliveries</div>
                    <div className="text-sm font-medium text-right">KSh 3,450</div>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <Button variant="outline" className="w-full">
                    View all payments
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

