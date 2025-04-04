"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Package, Truck, Users, ArrowRight, AlertTriangle, Shield, CheckCircle } from "lucide-react"
import Link from "next/link"
import { RecentActivity } from "@/components/recent-activity"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const stats = [
    {
      title: "Total Users",
      value: "1,248",
      description: "SMEs, Providers, Delivery",
      icon: Users,
      change: "+24 this week",
      positive: true,
    },
    {
      title: "Active Shipments",
      value: "342",
      description: "Currently in transit",
      icon: Package,
      change: "+15% from last month",
      positive: true,
    },
    {
      title: "Providers",
      value: "86",
      description: "Active logistics providers",
      icon: Truck,
      change: "+5 this month",
      positive: true,
    },
    {
      title: "Open Disputes",
      value: "12",
      description: "Requiring resolution",
      icon: AlertTriangle,
      change: "-3 from last week",
      positive: true,
    },
  ]

  const pendingProviders = [
    {
      id: "PRV-087",
      name: "Rapid Logistics",
      location: "Nairobi",
      type: "Full Service",
      date: "Apr 2, 2025",
      status: "pending",
    },
    {
      id: "PRV-088",
      name: "Mombasa Express",
      location: "Mombasa",
      type: "Coastal Region",
      date: "Apr 1, 2025",
      status: "pending",
    },
    {
      id: "PRV-089",
      name: "Rift Valley Movers",
      location: "Nakuru",
      type: "Regional",
      date: "Mar 31, 2025",
      status: "pending",
    },
  ]

  const disputes = [
    {
      id: "DSP-1234",
      shipmentId: "SHP-1220",
      customer: "Nairobi Textiles Ltd",
      provider: "FastTruck Logistics",
      issue: "Damaged goods during transit",
      date: "Apr 2, 2025",
      status: "new",
      priority: "high",
    },
    {
      id: "DSP-1235",
      shipmentId: "SHP-1225",
      customer: "Tech Solutions Kenya",
      provider: "Kenya Express",
      issue: "Significant delivery delay",
      date: "Apr 1, 2025",
      status: "in-progress",
      priority: "medium",
    },
    {
      id: "DSP-1236",
      shipmentId: "SHP-1228",
      customer: "Mombasa Supplies Co.",
      provider: "Swift Movers",
      issue: "Wrong items delivered",
      date: "Mar 31, 2025",
      status: "new",
      priority: "high",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending Approval
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Rejected
          </Badge>
        )
      case "new":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            New
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            In Progress
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Resolved
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
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Link href="/admin/settings">
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <Shield className="mr-2 h-4 w-4" />
              System Settings
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="providers">Provider Onboarding</TabsTrigger>
          <TabsTrigger value="disputes">Dispute Resolution</TabsTrigger>
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
                <CardTitle>System Health</CardTitle>
                <CardDescription>Current platform status and metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">System Uptime</p>
                      <p className="text-2xl font-bold">99.98%</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div>Current</div>
                      <div>99.98% of 99.9% SLA</div>
                    </div>
                    <Progress value={99.98} className="h-2 bg-gray-200" />
                  </div>
                  <div className="pt-4 grid grid-cols-3 gap-4 text-center text-sm">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-muted-foreground">API Response</p>
                      <p className="font-medium mt-1">124ms avg</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-muted-foreground">Error Rate</p>
                      <p className="font-medium mt-1">0.02%</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-muted-foreground">Active Users</p>
                      <p className="font-medium mt-1">245 now</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Recent Alerts</h3>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-yellow-700">Payment Gateway Latency</p>
                        <p className="text-xs text-yellow-600">Response times increased by 15% in the last hour</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">
                        Investigate
                      </Button>
                    </div>
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-green-700">Database Backup Completed</p>
                        <p className="text-xs text-green-600">Scheduled backup completed successfully</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">
                        View Logs
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system and user activities</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Pending Provider Approvals</CardTitle>
                <CardDescription>New logistics providers awaiting approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingProviders.map((provider) => (
                    <div key={provider.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg" alt={provider.name} />
                          <AvatarFallback>{provider.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{provider.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {provider.location} • {provider.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Approve
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-center mt-4">
                    <Link href="/admin/providers">
                      <Button variant="outline" className="w-full">
                        View all providers
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Open Disputes</CardTitle>
                <CardDescription>Disputes requiring resolution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {disputes.map((dispute) => (
                    <div key={dispute.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                          <Link href={`/admin/disputes/${dispute.id}`} className="font-medium hover:underline">
                            {dispute.id}
                          </Link>
                          {getStatusBadge(dispute.status)}
                          {getPriorityBadge(dispute.priority)}
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm">
                          <span className="font-medium">Shipment:</span> {dispute.shipmentId}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Issue:</span> {dispute.issue}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {dispute.customer} vs {dispute.provider}
                        </p>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <Link href={`/admin/disputes/${dispute.id}`}>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Resolve
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-center mt-4">
                    <Link href="/admin/disputes">
                      <Button variant="outline" className="w-full">
                        View all disputes
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage users across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                  <div className="col-span-2">User</div>
                  <div>Role</div>
                  <div>Status</div>
                  <div>Joined</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-50 transition-colors">
                  <div className="col-span-2 flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">john@example.com</p>
                    </div>
                  </div>
                  <div className="self-center">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      SME
                    </Badge>
                  </div>
                  <div className="self-center">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Active
                    </Badge>
                  </div>
                  <div className="self-center text-sm">Apr 1, 2025</div>
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      Suspend
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-50 transition-colors">
                  <div className="col-span-2 flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>JK</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Jane Kamau</p>
                      <p className="text-sm text-muted-foreground">jane@example.com</p>
                    </div>
                  </div>
                  <div className="self-center">
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      Provider
                    </Badge>
                  </div>
                  <div className="self-center">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Active
                    </Badge>
                  </div>
                  <div className="self-center text-sm">Mar 15, 2025</div>
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      Suspend
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-50 transition-colors">
                  <div className="col-span-2 flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>DM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">David Mwangi</p>
                      <p className="text-sm text-muted-foreground">david@example.com</p>
                    </div>
                  </div>
                  <div className="self-center">
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                      Delivery
                    </Badge>
                  </div>
                  <div className="self-center">
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      Pending
                    </Badge>
                  </div>
                  <div className="self-center text-sm">Apr 2, 2025</div>
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <Button variant="outline" className="w-full">
                  View all users
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="providers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Provider Onboarding</CardTitle>
              <CardDescription>Approve and manage logistics providers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingProviders.map((provider) => (
                  <div key={provider.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="/placeholder.svg" alt={provider.name} />
                          <AvatarFallback>{provider.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{provider.name}</p>
                            {getStatusBadge(provider.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {provider.location} • {provider.type}
                          </p>
                          <p className="text-xs text-muted-foreground">Applied: {provider.date}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          Reject
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium">Business License</p>
                        <p className="text-xs text-muted-foreground">Verified: Yes</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium">Insurance</p>
                        <p className="text-xs text-muted-foreground">Verified: Yes</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium">Vehicle Count</p>
                        <p className="text-xs text-muted-foreground">5 vehicles</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Link
                        href={`/admin/providers/${provider.id}`}
                        className="text-sm text-green-600 hover:text-green-700 flex items-center"
                      >
                        View full details
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
                <div className="flex justify-center mt-4">
                  <Link href="/admin/providers">
                    <Button variant="outline" className="w-full">
                      View all providers
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="disputes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dispute Resolution</CardTitle>
              <CardDescription>Manage and resolve disputes between SMEs and providers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {disputes.map((dispute) => (
                  <div key={dispute.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <Link href={`/admin/disputes/${dispute.id}`} className="font-medium hover:underline">
                          {dispute.id}
                        </Link>
                        {getStatusBadge(dispute.status)}
                        {getPriorityBadge(dispute.priority)}
                      </div>
                      <div className="text-sm text-muted-foreground">{dispute.date}</div>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm font-medium">Shipment: {dispute.shipmentId}</p>
                      <p className="text-sm mt-1">{dispute.issue}</p>
                      <div className="mt-2 flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>C</AvatarFallback>
                          </Avatar>
                          <p className="text-sm">{dispute.customer}</p>
                        </div>
                        <div className="text-sm">vs</div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>P</AvatarFallback>
                          </Avatar>
                          <p className="text-sm">{dispute.provider}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Resolve Dispute
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-center mt-4">
                  <Link href="/admin/disputes">
                    <Button variant="outline" className="w-full">
                      View all disputes
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

