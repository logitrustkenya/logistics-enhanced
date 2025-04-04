"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Plus, AlertTriangle, MessageSquare, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DisputesPage() {
  const [activeTab, setActiveTab] = useState("active")

  // Mock data for active disputes
  const activeDisputes = [
    {
      id: "DSP-1234",
      shipmentId: "SHP-1220",
      provider: {
        name: "FastTruck Logistics",
        image: "/placeholder.svg",
      },
      issue: "Damaged goods during transit",
      status: "under-review",
      priority: "high",
      date: "Apr 2, 2025",
      lastUpdate: "2 hours ago",
    },
    {
      id: "DSP-1235",
      shipmentId: "SHP-1225",
      provider: {
        name: "Kenya Express",
        image: "/placeholder.svg",
      },
      issue: "Significant delivery delay",
      status: "in-progress",
      priority: "medium",
      date: "Apr 1, 2025",
      lastUpdate: "1 day ago",
    },
  ]

  // Mock data for resolved disputes
  const resolvedDisputes = [
    {
      id: "DSP-1230",
      shipmentId: "SHP-1210",
      provider: {
        name: "Swift Movers",
        image: "/placeholder.svg",
      },
      issue: "Wrong items delivered",
      status: "resolved",
      resolution: "Replacement delivered",
      date: "Mar 25, 2025",
      resolvedDate: "Mar 28, 2025",
    },
    {
      id: "DSP-1231",
      shipmentId: "SHP-1212",
      provider: {
        name: "Nairobi Logistics",
        image: "/placeholder.svg",
      },
      issue: "Billing discrepancy",
      status: "resolved",
      resolution: "Partial refund issued",
      date: "Mar 20, 2025",
      resolvedDate: "Mar 24, 2025",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "under-review":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Under Review
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
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Rejected
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
        <h1 className="text-2xl font-bold tracking-tight">Dispute Resolution</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Link href="/disputes/new">
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              New Dispute
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Disputes</TabsTrigger>
          <TabsTrigger value="resolved">Resolved Disputes</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Active Disputes</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search disputes..." className="w-[200px] pl-8 md:w-[260px]" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Status: All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="under-review">Under Review</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <CardDescription>Track and manage your active disputes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeDisputes.map((dispute) => (
                  <div key={dispute.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-red-50 p-2 rounded-full">
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">Dispute {dispute.id}</p>
                            {getStatusBadge(dispute.status)}
                            {getPriorityBadge(dispute.priority)}
                          </div>
                          <p className="text-sm text-muted-foreground">Shipment: {dispute.shipmentId}</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">Updated {dispute.lastUpdate}</div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-medium">Issue</p>
                      <p className="text-sm">{dispute.issue}</p>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={dispute.provider.image} alt={dispute.provider.name} />
                        <AvatarFallback>{dispute.provider.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <p className="text-sm">{dispute.provider.name}</p>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                      <Link href={`/disputes/${dispute.id}`}>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Resolved Disputes</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search resolved disputes..."
                      className="w-[200px] pl-8 md:w-[260px]"
                    />
                  </div>
                </div>
              </div>
              <CardDescription>History of your resolved disputes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resolvedDisputes.map((dispute) => (
                  <div key={dispute.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-50 p-2 rounded-full">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">Dispute {dispute.id}</p>
                            {getStatusBadge(dispute.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">Shipment: {dispute.shipmentId}</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">Resolved on {dispute.resolvedDate}</div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Issue</p>
                        <p className="text-sm">{dispute.issue}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Resolution</p>
                        <p className="text-sm">{dispute.resolution}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={dispute.provider.image} alt={dispute.provider.name} />
                        <AvatarFallback>{dispute.provider.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <p className="text-sm">{dispute.provider.name}</p>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Link href={`/disputes/${dispute.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Search component for search inputs
function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

