"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Package,
  Truck,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  MessageSquare,
  FileText,
  CreditCard,
  AlertTriangle,
  User,
  Phone,
  Mail,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ShipmentDetailsPage({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState("")
  const [activeTab, setActiveTab] = useState("tracking")

  // Mock data for the shipment
  const shipment = {
    id: params.id,
    origin: "Nairobi CBD, Kimathi Street",
    originCity: "Nairobi",
    destination: "Mombasa, Nyali Road",
    destinationCity: "Mombasa",
    status: "in-transit",
    providerName: "FastTruck Logistics",
    date: "Apr 2, 2025",
    estimatedDelivery: "Apr 5, 2025",
    items: "Office Supplies",
    weight: "25 kg",
    dimensions: "50 x 40 x 30 cm",
    packageType: "Box",
    specialHandling: ["Fragile"],
    progress: 65,
    tracking: [
      {
        status: "Order Placed",
        location: "Nairobi",
        timestamp: "Apr 2, 2025 09:15 AM",
        description: "Shipment order created",
        completed: true,
      },
      {
        status: "Provider Assigned",
        location: "Nairobi",
        timestamp: "Apr 2, 2025 10:30 AM",
        description: "FastTruck Logistics assigned to your shipment",
        completed: true,
      },
      {
        status: "Picked Up",
        location: "Nairobi CBD",
        timestamp: "Apr 2, 2025 02:45 PM",
        description: "Package picked up from origin",
        completed: true,
      },
      {
        status: "In Transit",
        location: "Machakos",
        timestamp: "Apr 3, 2025 08:20 AM",
        description: "Package in transit to destination",
        completed: true,
      },
      {
        status: "In Transit",
        location: "Voi",
        timestamp: "Apr 3, 2025 03:10 PM",
        description: "Package in transit to destination",
        completed: true,
      },
      {
        status: "Out for Delivery",
        location: "Mombasa",
        timestamp: "Pending",
        description: "Package out for delivery",
        completed: false,
      },
      {
        status: "Delivered",
        location: "Mombasa, Nyali Road",
        timestamp: "Pending",
        description: "Package delivered to recipient",
        completed: false,
      },
    ],
    payment: {
      amount: "KSh 3,500",
      status: "Paid",
      method: "M-Pesa",
      reference: "MPESA123456",
      date: "Apr 2, 2025",
    },
    provider: {
      name: "FastTruck Logistics",
      rating: 4.8,
      contact: "+254 712 345 678",
      email: "dispatch@fasttruck.co.ke",
    },
    messages: [
      {
        sender: "FastTruck Logistics",
        message:
          "Hello, your package has been picked up and is now in transit. We'll keep you updated on its progress.",
        timestamp: "Apr 2, 2025 03:00 PM",
        isProvider: true,
      },
      {
        sender: "You",
        message: "Thank you for the update. Please ensure it's handled with care as it contains fragile items.",
        timestamp: "Apr 2, 2025 03:15 PM",
        isProvider: false,
      },
      {
        sender: "FastTruck Logistics",
        message: "No problem, we've noted that it contains fragile items and will handle it accordingly.",
        timestamp: "Apr 2, 2025 03:20 PM",
        isProvider: true,
      },
    ],
  }

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

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Link href="/shipments">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            Shipment {shipment.id} {getStatusBadge(shipment.status)}
          </h1>
          <p className="text-sm text-muted-foreground">
            From {shipment.originCity} to {shipment.destinationCity} • {shipment.date}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Shipment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-medium flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-green-600" /> Origin
                </h3>
                <p className="text-sm text-muted-foreground">{shipment.origin}</p>
              </div>
              <div>
                <h3 className="font-medium flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-red-600" /> Destination
                </h3>
                <p className="text-sm text-muted-foreground">{shipment.destination}</p>
              </div>
              <div>
                <h3 className="font-medium flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> Shipment Date
                </h3>
                <p className="text-sm text-muted-foreground">{shipment.date}</p>
              </div>
              <div>
                <h3 className="font-medium flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> Estimated Delivery
                </h3>
                <p className="text-sm text-muted-foreground">{shipment.estimatedDelivery}</p>
              </div>
              <div>
                <h3 className="font-medium flex items-center gap-1">
                  <Package className="h-4 w-4" /> Package Type
                </h3>
                <p className="text-sm text-muted-foreground">{shipment.packageType}</p>
              </div>
              <div>
                <h3 className="font-medium flex items-center gap-1">
                  <Package className="h-4 w-4" /> Contents
                </h3>
                <p className="text-sm text-muted-foreground">{shipment.items}</p>
              </div>
              <div>
                <h3 className="font-medium flex items-center gap-1">
                  <Package className="h-4 w-4" /> Weight
                </h3>
                <p className="text-sm text-muted-foreground">{shipment.weight}</p>
              </div>
              <div>
                <h3 className="font-medium flex items-center gap-1">
                  <Package className="h-4 w-4" /> Dimensions
                </h3>
                <p className="text-sm text-muted-foreground">{shipment.dimensions}</p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-medium flex items-center gap-1">
                <Truck className="h-4 w-4" /> Logistics Provider
              </h3>
              <p className="text-sm text-muted-foreground">{shipment.providerName}</p>
            </div>
            {shipment.specialHandling.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4" /> Special Handling
                </h3>
                <div className="flex gap-2 mt-1">
                  {shipment.specialHandling.map((item, index) => (
                    <Badge key={index} variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div>Shipment Progress</div>
                <div>{shipment.progress}%</div>
              </div>
              <Progress value={shipment.progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Provider Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder.svg" alt={shipment.provider.name} />
                <AvatarFallback>FT</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{shipment.provider.name}</h3>
                <div className="flex items-center text-sm">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="ml-1">{shipment.provider.rating}/5</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Assigned Driver: John Kamau</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{shipment.provider.contact}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{shipment.provider.email}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <h3 className="font-medium flex items-center gap-1 mb-2">
                <CreditCard className="h-4 w-4" /> Payment Information
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Amount:</span>
                  <span className="text-sm font-medium">{shipment.payment.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {shipment.payment.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Method:</span>
                  <span className="text-sm">{shipment.payment.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Reference:</span>
                  <span className="text-sm">{shipment.payment.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Date:</span>
                  <span className="text-sm">{shipment.payment.date}</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Phone className="mr-2 h-4 w-4" />
                Contact Provider
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tracking" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tracking">Tracking</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="tracking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shipment Tracking</CardTitle>
              <CardDescription>Real-time tracking information for your shipment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-8">
                  {shipment.tracking.map((event, index) => (
                    <div key={index} className="relative pl-8">
                      <div
                        className={`absolute left-0 top-1 h-6 w-6 rounded-full flex items-center justify-center ${event.completed ? "bg-green-600" : "bg-gray-200"}`}
                      >
                        {event.completed ? (
                          <CheckCircle className="h-4 w-4 text-white" />
                        ) : (
                          <Clock className="h-4 w-4 text-gray-500" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{event.status}</h3>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <div className="rounded-lg overflow-hidden border">
                  <div className="h-64 bg-gray-100 flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=256&width=600"
                      alt="Shipment Map"
                      width={600}
                      height={256}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Live tracking map showing the current location of your shipment
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>Communication with your logistics provider</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                {shipment.messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.isProvider ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.isProvider ? "bg-gray-100 text-gray-900" : "bg-green-600 text-white"
                      }`}
                    >
                      {msg.isProvider && <p className="text-xs font-medium mb-1">{msg.sender}</p>}
                      <p className="text-sm">{msg.message}</p>
                      <p className="text-xs text-right mt-1 opacity-70">{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} className="bg-green-600 hover:bg-green-700">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Shipping documents and receipts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="font-medium">Shipping Label</p>
                      <p className="text-sm text-muted-foreground">PDF • 245 KB</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-green-500" />
                    <div>
                      <p className="font-medium">Payment Receipt</p>
                      <p className="text-sm text-muted-foreground">PDF • 128 KB</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-purple-500" />
                    <div>
                      <p className="font-medium">Proof of Pickup</p>
                      <p className="text-sm text-muted-foreground">PDF • 156 KB</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
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

