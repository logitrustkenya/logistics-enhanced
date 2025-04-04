"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Clock, Truck, CheckCircle, AlertTriangle } from "lucide-react"

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState("")
  const [isTracking, setIsTracking] = useState(false)
  const [activeTab, setActiveTab] = useState("map")

  // Mock shipment data for the tracking demo
  const shipment = {
    id: "SHP-1234",
    status: "in-transit",
    origin: "Nairobi CBD",
    destination: "Mombasa",
    provider: "FastTruck Logistics",
    estimatedDelivery: "Apr 4, 2025",
    currentLocation: "Mtito Andei",
    progress: 65,
    lastUpdated: "2 hours ago",
    events: [
      {
        status: "Picked Up",
        location: "Nairobi CBD",
        timestamp: "Apr 2, 2025 - 09:15 AM",
        description: "Package picked up from sender",
        completed: true,
      },
      {
        status: "In Transit",
        location: "Nairobi Sorting Facility",
        timestamp: "Apr 2, 2025 - 11:30 AM",
        description: "Package sorted and dispatched",
        completed: true,
      },
      {
        status: "In Transit",
        location: "Mtito Andei",
        timestamp: "Apr 2, 2025 - 03:45 PM",
        description: "Package in transit to destination",
        completed: true,
      },
      {
        status: "Out for Delivery",
        location: "Mombasa",
        timestamp: "Apr 4, 2025 (Estimated)",
        description: "Package will be out for delivery",
        completed: false,
      },
      {
        status: "Delivered",
        location: "Mombasa",
        timestamp: "Apr 4, 2025 (Estimated)",
        description: "Package will be delivered to recipient",
        completed: false,
      },
    ],
    vehicle: {
      type: "Truck",
      licensePlate: "KBZ 123X",
      driver: "John Kamau",
      phone: "+254 712 345 678",
    },
  }

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    if (trackingId.trim()) {
      setIsTracking(true)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "in-transit":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            In Transit
          </Badge>
        )
      case "out-for-delivery":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Out for Delivery
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Delivered
          </Badge>
        )
      case "delayed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Delayed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Shipment Tracking</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Track Your Shipment</CardTitle>
          <CardDescription>Enter your shipment tracking ID to get real-time updates</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTrack} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter tracking ID (e.g., SHP-1234)"
                className="pl-8"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
            </div>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Track
            </Button>
          </form>
        </CardContent>
      </Card>

      {isTracking && (
        <>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Shipment {shipment.id}</CardTitle>
                  <CardDescription>Last updated {shipment.lastUpdated}</CardDescription>
                </div>
                <div className="flex items-center gap-2">{getStatusBadge(shipment.status)}</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">From</p>
                    <p className="font-medium">{shipment.origin}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">To</p>
                    <p className="font-medium">{shipment.destination}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                    <p className="font-medium">{shipment.estimatedDelivery}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full h-6 w-6 flex items-center justify-center bg-green-600 text-white">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">Picked Up</span>
                  </div>
                  <div className="h-0.5 flex-1 bg-green-200 self-center mx-2"></div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full h-6 w-6 flex items-center justify-center bg-green-600 text-white">
                      <Truck className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">In Transit</span>
                  </div>
                  <div className="h-0.5 flex-1 bg-gray-200 self-center mx-2"></div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full h-6 w-6 flex items-center justify-center bg-gray-200">
                      <Truck className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">Out for Delivery</span>
                  </div>
                  <div className="h-0.5 flex-1 bg-gray-200 self-center mx-2"></div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full h-6 w-6 flex items-center justify-center bg-gray-200">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">Delivered</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${shipment.progress}%` }}></div>
                </div>
              </div>

              <Tabs defaultValue="map" value={activeTab} onValueChange={setActiveTab} className="mt-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="map">Live Map</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                <TabsContent value="map" className="mt-4">
                  <div className="bg-gray-100 rounded-lg h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium">Live Tracking Map</p>
                      <p className="text-sm text-gray-500 max-w-md mx-auto mt-2">
                        Current location: {shipment.currentLocation}
                      </p>
                      <p className="text-xs text-gray-500 mt-4">
                        Interactive map would be displayed here with real-time vehicle location
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="timeline" className="mt-4">
                  <div className="space-y-6">
                    {shipment.events.map((event, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`rounded-full h-8 w-8 flex items-center justify-center ${event.completed ? "bg-green-600 text-white" : "bg-gray-200"}`}
                          >
                            {event.completed ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                          </div>
                          {index < shipment.events.length - 1 && (
                            <div className={`w-0.5 h-full ${event.completed ? "bg-green-600" : "bg-gray-200"}`}></div>
                          )}
                        </div>
                        <div className="pb-6">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{event.status}</p>
                            {event.status === "In Transit" && index === 2 && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                Current
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{event.timestamp}</p>
                          <p className="text-sm mt-1">{event.location}</p>
                          <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="details" className="mt-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Shipment Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Tracking ID</p>
                          <p className="font-medium">{shipment.id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Logistics Provider</p>
                          <p className="font-medium">{shipment.provider}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Origin</p>
                          <p className="font-medium">{shipment.origin}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Destination</p>
                          <p className="font-medium">{shipment.destination}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Vehicle Type</p>
                          <p className="font-medium">{shipment.vehicle.type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">License Plate</p>
                          <p className="font-medium">{shipment.vehicle.licensePlate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Driver</p>
                          <p className="font-medium">{shipment.vehicle.driver}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Contact</p>
                          <p className="font-medium">{shipment.vehicle.phone}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-yellow-700">Need assistance?</p>
                        <p className="text-xs text-yellow-600">
                          If you have any issues with your shipment, please contact customer support or the driver
                          directly.
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">
                        Contact Support
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </>
      )}

      {!isTracking && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Shipments</CardTitle>
            <CardDescription>Track your recent shipments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">SHP-1234</p>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        In Transit
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Nairobi to Mombasa</p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      setTrackingId("SHP-1234")
                      setIsTracking(true)
                    }}
                  >
                    Track Shipment
                  </Button>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">SHP-1235</p>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        Pending
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Kisumu to Nakuru</p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      setTrackingId("SHP-1235")
                      setIsTracking(true)
                    }}
                  >
                    Track Shipment
                  </Button>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">SHP-1236</p>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Delivered
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Nairobi Westlands to Eldoret</p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      setTrackingId("SHP-1236")
                      setIsTracking(true)
                    }}
                  >
                    Track Shipment
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

