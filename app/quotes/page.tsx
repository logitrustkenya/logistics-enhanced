"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Plus, Filter, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function QuotesPage() {
  const [activeTab, setActiveTab] = useState("received")

  // Mock data for received quotes
  const receivedQuotes = [
    {
      id: "QT-1234",
      requestId: "REQ-5678",
      provider: {
        name: "FastTruck Logistics",
        rating: 4.8,
        image: "/placeholder.svg",
      },
      route: {
        origin: "Nairobi CBD",
        destination: "Mombasa",
      },
      package: {
        type: "Electronics",
        weight: "15 kg",
      },
      price: "KSh 4,500",
      deliveryTime: "2-3 days",
      status: "pending",
      expiresIn: "23 hours",
      date: "Apr 2, 2025",
    },
    {
      id: "QT-1235",
      requestId: "REQ-5679",
      provider: {
        name: "Kenya Express",
        rating: 4.5,
        image: "/placeholder.svg",
      },
      route: {
        origin: "Nairobi CBD",
        destination: "Mombasa",
      },
      package: {
        type: "Electronics",
        weight: "15 kg",
      },
      price: "KSh 5,200",
      deliveryTime: "1-2 days",
      status: "pending",
      expiresIn: "23 hours",
      date: "Apr 2, 2025",
    },
    {
      id: "QT-1236",
      requestId: "REQ-5680",
      provider: {
        name: "Eco Movers",
        rating: 4.2,
        image: "/placeholder.svg",
      },
      route: {
        origin: "Nairobi CBD",
        destination: "Mombasa",
      },
      package: {
        type: "Electronics",
        weight: "15 kg",
      },
      price: "KSh 4,800",
      deliveryTime: "2-3 days",
      status: "pending",
      expiresIn: "23 hours",
      date: "Apr 2, 2025",
    },
  ]

  // Mock data for sent quote requests
  const sentRequests = [
    {
      id: "REQ-5678",
      route: {
        origin: "Nairobi CBD",
        destination: "Mombasa",
      },
      package: {
        type: "Electronics",
        weight: "15 kg",
      },
      quotes: 3,
      status: "active",
      date: "Apr 2, 2025",
    },
    {
      id: "REQ-5681",
      route: {
        origin: "Kisumu",
        destination: "Nakuru",
      },
      package: {
        type: "Furniture",
        weight: "50 kg",
      },
      quotes: 2,
      status: "active",
      date: "Apr 1, 2025",
    },
    {
      id: "REQ-5682",
      route: {
        origin: "Nairobi Westlands",
        destination: "Eldoret",
      },
      package: {
        type: "Documents",
        weight: "2 kg",
      },
      quotes: 0,
      status: "pending",
      date: "Apr 3, 2025",
    },
  ]

  // Mock data for accepted quotes
  const acceptedQuotes = [
    {
      id: "QT-1230",
      requestId: "REQ-5670",
      provider: {
        name: "FastTruck Logistics",
        rating: 4.8,
        image: "/placeholder.svg",
      },
      route: {
        origin: "Nairobi CBD",
        destination: "Nakuru",
      },
      package: {
        type: "Office Supplies",
        weight: "25 kg",
      },
      price: "KSh 3,200",
      deliveryTime: "2-3 days",
      status: "accepted",
      shipmentId: "SHP-1234",
      date: "Mar 28, 2025",
    },
    {
      id: "QT-1231",
      requestId: "REQ-5671",
      provider: {
        name: "Kenya Express",
        rating: 4.5,
        image: "/placeholder.svg",
      },
      route: {
        origin: "Mombasa",
        destination: "Nairobi",
      },
      package: {
        type: "Textiles",
        weight: "30 kg",
      },
      price: "KSh 4,800",
      deliveryTime: "1-2 days",
      status: "accepted",
      shipmentId: "SHP-1235",
      date: "Mar 25, 2025",
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
      case "active":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Active
          </Badge>
        )
      case "accepted":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Accepted
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Expired
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Quote Management</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Link href="/quotes/request">
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              New Quote Request
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="received" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="received">Received Quotes</TabsTrigger>
          <TabsTrigger value="sent">Sent Requests</TabsTrigger>
          <TabsTrigger value="accepted">Accepted Quotes</TabsTrigger>
        </TabsList>

        <TabsContent value="received" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Quotes from Providers</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search quotes..." className="w-[200px] pl-8 md:w-[260px]" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>
              <CardDescription>Compare and accept quotes from logistics providers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {receivedQuotes.map((quote) => (
                  <div key={quote.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={quote.provider.image} alt={quote.provider.name} />
                          <AvatarFallback>{quote.provider.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{quote.provider.name}</p>
                            <div className="flex items-center text-amber-500">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="text-xs ml-1">{quote.provider.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">Quote ID: {quote.id}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 md:gap-4">
                        <div className="bg-gray-50 px-3 py-1 rounded-md">
                          <p className="text-xs text-muted-foreground">Price</p>
                          <p className="font-medium">{quote.price}</p>
                        </div>
                        <div className="bg-gray-50 px-3 py-1 rounded-md">
                          <p className="text-xs text-muted-foreground">Delivery Time</p>
                          <p className="font-medium">{quote.deliveryTime}</p>
                        </div>
                        <div className="bg-gray-50 px-3 py-1 rounded-md flex items-center">
                          <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                          <div>
                            <p className="text-xs text-muted-foreground">Expires in</p>
                            <p className="font-medium">{quote.expiresIn}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Route</p>
                        <p className="text-sm">
                          {quote.route.origin} to {quote.route.destination}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Package</p>
                        <p className="text-sm">
                          {quote.package.type}, {quote.package.weight}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Link href={`/quotes/${quote.id}/accept`}>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Accept Quote
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sent" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Your Quote Requests</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search requests..." className="w-[200px] pl-8 md:w-[260px]" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Status: All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <CardDescription>Track the status of your quote requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sentRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">Request ID: {request.id}</p>
                          {getStatusBadge(request.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">Created on {request.date}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 md:gap-4">
                        <div className="bg-gray-50 px-3 py-1 rounded-md">
                          <p className="text-xs text-muted-foreground">Quotes Received</p>
                          <p className="font-medium">{request.quotes}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Route</p>
                        <p className="text-sm">
                          {request.route.origin} to {request.route.destination}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Package</p>
                        <p className="text-sm">
                          {request.package.type}, {request.package.weight}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {request.quotes > 0 ? (
                        <Link href={`/quotes/request/${request.id}`}>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Compare Quotes ({request.quotes})
                          </Button>
                        </Link>
                      ) : (
                        <Button size="sm" variant="outline" disabled={request.quotes === 0}>
                          No Quotes Yet
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Accepted Quotes</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search accepted quotes..."
                      className="w-[200px] pl-8 md:w-[260px]"
                    />
                  </div>
                </div>
              </div>
              <CardDescription>Quotes you've accepted and converted to shipments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {acceptedQuotes.map((quote) => (
                  <div key={quote.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={quote.provider.image} alt={quote.provider.name} />
                          <AvatarFallback>{quote.provider.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{quote.provider.name}</p>
                            <div className="flex items-center text-amber-500">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="text-xs ml-1">{quote.provider.rating}</span>
                            </div>
                            {getStatusBadge(quote.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">Quote ID: {quote.id}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 md:gap-4">
                        <div className="bg-gray-50 px-3 py-1 rounded-md">
                          <p className="text-xs text-muted-foreground">Price</p>
                          <p className="font-medium">{quote.price}</p>
                        </div>
                        <div className="bg-gray-50 px-3 py-1 rounded-md">
                          <p className="text-xs text-muted-foreground">Delivery Time</p>
                          <p className="font-medium">{quote.deliveryTime}</p>
                        </div>
                        <div className="bg-gray-50 px-3 py-1 rounded-md flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          <div>
                            <p className="text-xs text-muted-foreground">Shipment ID</p>
                            <p className="font-medium">{quote.shipmentId}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Route</p>
                        <p className="text-sm">
                          {quote.route.origin} to {quote.route.destination}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Package</p>
                        <p className="text-sm">
                          {quote.package.type}, {quote.package.weight}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Link href={`/shipments/${quote.shipmentId}`}>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          View Shipment
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

// Star component for ratings
function Star(props: React.SVGProps<SVGSVGElement>) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
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

