"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Package, Search, Filter, ArrowRight, CheckCircle, Clock, Truck } from "lucide-react"
import Link from "next/link"

export default function ShipmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")

  // Mock data
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
    {
      id: "SHP-1237",
      origin: "Mombasa",
      destination: "Nairobi",
      status: "pending",
      provider: "Pending Assignment",
      date: "Apr 4, 2025",
      items: "Clothing",
      progress: 5,
    },
    {
      id: "SHP-1238",
      origin: "Nakuru",
      destination: "Kisumu",
      status: "in-transit",
      provider: "Swift Movers",
      date: "Apr 2, 2025",
      items: "Food Products",
      progress: 45,
    },
    {
      id: "SHP-1239",
      origin: "Eldoret",
      destination: "Nairobi",
      status: "delivered",
      provider: "Kenya Express",
      date: "Mar 30, 2025",
      items: "Medical Supplies",
      progress: 100,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1 text-yellow-600 border-yellow-200 bg-yellow-50">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        )
      case "in-transit":
        return (
          <Badge variant="outline" className="flex items-center gap-1 text-blue-600 border-blue-200 bg-blue-50">
            <Truck className="h-3 w-3" />
            In Transit
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="flex items-center gap-1 text-green-600 border-green-200 bg-green-50">
            <CheckCircle className="h-3 w-3" />
            Delivered
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Filter shipments based on search term and filters
  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch =
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.items.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || shipment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Sort shipments
  const sortedShipments = [...filteredShipments].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortOrder === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    } else if (sortOrder === "progress") {
      return b.progress - a.progress
    }
    return 0
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Shipments</h1>
        <Link href="/shipments/create">
          <Button className="bg-green-600 hover:bg-green-700">
            <Package className="mr-2 h-4 w-4" />
            New Shipment
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Shipments</CardTitle>
          <CardDescription>View and manage all your shipments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex w-full items-center gap-2 md:w-2/3">
                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search shipments..."
                    className="w-full appearance-none pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-transit">In Transit</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="progress">Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4">
              {sortedShipments.map((shipment) => (
                <div key={shipment.id} className="rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-gray-500" />
                      <Link href={`/shipments/${shipment.id}`} className="font-medium hover:underline">
                        {shipment.id}
                      </Link>
                      {getStatusBadge(shipment.status)}
                    </div>
                    <div className="text-sm text-muted-foreground">{shipment.date}</div>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div>
                      <p className="text-sm font-medium">From</p>
                      <p className="text-sm text-muted-foreground">{shipment.origin}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">To</p>
                      <p className="text-sm text-muted-foreground">{shipment.destination}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Provider</p>
                      <p className="text-sm text-muted-foreground">{shipment.provider}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Items</p>
                      <p className="text-sm text-muted-foreground">{shipment.items}</p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div>Progress</div>
                      <div>{shipment.progress}%</div>
                    </div>
                    <Progress value={shipment.progress} className="h-2" />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link
                      href={`/shipments/${shipment.id}`}
                      className="text-sm text-green-600 hover:text-green-700 flex items-center"
                    >
                      View details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

