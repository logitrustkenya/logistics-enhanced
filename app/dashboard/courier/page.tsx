"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import {
  Truck,
  Package,
  CreditCard,
  Star,
  MapPin,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Search,
  User,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

const stats = [
  {
    title: "Total Order",
    value: "$23443",
    icon: Package,
    change: "+15.2%",
    changeType: "up",
  },
  {
    title: "Total Revenue",
    value: "$12312",
    icon: CreditCard,
    change: "+18.5%",
    changeType: "up",
  },
  {
    title: "Total Shipment",
    value: "$234",
    icon: Truck,
    change: "+18.5%",
    changeType: "up",
  },
  {
    title: "In Warehouse",
    value: "$12312",
    icon: Truck,
    change: "-16%",
    changeType: "down",
  },
]

const tracingHistory = [
  {
    id: "#2435-432-34dsk",
    events: [
      {
        date: "08 Dec 2024",
        time: "12:05 PM",
        label: "Supplier Selection",
      },
      {
        date: "24 Dec 2024",
        time: "10:05 AM",
        label: "Customs Clearance",
      },
    ],
  },
]

const recentActivities = [
  {
    id: 1,
    status: "Delivered",
    description: "Order #12345 delivered to Nairobi.",
    time: "2h ago",
  },
  {
    id: 2,
    status: "In Transit",
    description: "Order #12346 is in transit.",
    time: "4h ago",
  },
  {
    id: 3,
    status: "Pending",
    description: "Order #12347 pending pickup.",
    time: "6h ago",
  },
  {
    id: 4,
    status: "Processing",
    description: "Order #12348 processing at warehouse.",
    time: "8h ago",
  },
]

const mapCenter = [-1.2921, 36.8219] // Nairobi
const mapRoute = [
  [-1.2921, 36.8219], // Nairobi
  [30.0444, 31.2357], // Cairo
  [48.8566, 2.3522], // Paris
]

export default function CourierDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [activityTab, setActivityTab] = useState("All")

  // Placeholders for logistics provider data
  const activeJobs: any[] = []
  const recentCompletions: any[] = []
  const performanceMetrics: any[] = []

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-[#add64e]/5 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <Card
                  key={i}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 hover:border-[#add64e]/30 transition-all duration-300"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
                      <stat.icon className="h-5 w-5 text-[#add64e]" />
                      {stat.title}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      {stat.changeType === "up" ? (
                        <ArrowUpRight className="h-4 w-4 text-green-400" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-400" />
                      )}
                      <span className={stat.changeType === "up" ? "text-green-400" : "text-red-400"}>{stat.change}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Analytic View & Banner */}
              <Card className="lg:col-span-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 flex flex-col justify-between"
                style={{
                  backgroundImage: "url('/ColorfulContainerStackSmall.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                }}
              >
                {/* Overlay to dim the background image */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.45)',
                  borderRadius: 'inherit',
                  zIndex: 1,
                  pointerEvents: 'none',
                }} />
                <CardContent className="flex flex-col md:flex-row gap-6 p-6 relative z-10">
                  <div className="flex-1 flex flex-col justify-between">
                    <h2 className="text-3xl font-bold text-white mb-2">Save Money<br />Get Premium Service</h2>
                    <Button className="mt-4 w-fit bg-gradient-to-r from-[#add64e] to-[#9bc943] text-black font-semibold">Get Premium</Button>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    {/* Analytic View - Semi-circular progress */}
                    <div className="relative w-40 h-24 flex items-center justify-center">
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-[#add64e]">$5323434</span>
                        <span className="text-xs text-white/70">+18.5%</span>
                      </div>
                    </div>
                    <span className="text-white/70 mt-2">Analytic View<br />Total Shipping Cost Save</span>
                  </div>
                </CardContent>
              </Card>

              {/* Map & Tracing History */}
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 flex flex-col">
                <CardHeader>
                  <CardTitle className="text-white">Tracking History</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {/* Map */}
                  <div className="w-full h-40 rounded-lg overflow-hidden mb-2">
                    {/* <MapContainer center={mapCenter} zoom={2} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <Polyline pathOptions={{ color: "#add64e", weight: 4 }} positions={mapRoute} />
                      {mapRoute.map((pos, idx) => (
                        <Marker key={idx} position={pos} />
                      ))}
                    </MapContainer> */}
                  </div>
                  {/* Tracing History */}
                  {tracingHistory.map((trace) => (
                    <div key={trace.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white">Tracking ID</span>
                        <span className="text-xs text-white/50">{trace.id}</span>
                      </div>
                      {trace.events.map((event, i) => (
                        <div key={i} className="flex items-center justify-between text-xs text-white/70 mb-1">
                          <span>{event.date}</span>
                          <span>{event.label}</span>
                          <span>{event.time}</span>
                        </div>
                      ))}
                      <Button className="mt-2 w-full bg-gradient-to-r from-[#add64e] to-[#9bc943] text-black font-semibold" size="sm">View Details</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
              <Tabs value={activityTab} onValueChange={setActivityTab}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white">Recent Activities</CardTitle>
                  <TabsList className="bg-white/5 border border-white/20 backdrop-blur-sm">
                    {['All', 'Delivered', 'In Transit', 'Pending', 'Processing'].map((tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        className={`data-[state=active]:bg-[#add64e] data-[state=active]:text-black text-white/70`}
                      >
                        {tab}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </CardHeader>
                <CardContent>
                  <div className="divide-y divide-white/10">
                    {recentActivities
                      .filter((a) => activityTab === "All" || a.status === activityTab)
                      .map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between py-3">
                          <div>
                            <span className="font-medium text-white mr-2">{activity.status}</span>
                            <span className="text-white/70">{activity.description}</span>
                          </div>
                          <span className="text-xs text-white/50">{activity.time}</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Tabs>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">All Active Jobs</CardTitle>
                <CardDescription className="text-white/70">Manage your current assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeJobs.map((job) => (
                    <div key={job.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Truck className="h-5 w-5 text-[#add64e]" />
                          <div>
                            <p className="text-sm font-medium text-white">{job.id}</p>
                            <p className="text-xs text-white/70">{job.client}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-[#add64e]">{job.value}</p>
                          <Badge
                            className={
                              job.status === "in-progress"
                                ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                : job.status === "pending"
                                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                  : "bg-green-500/20 text-green-400 border-green-500/30"
                            }
                          >
                            {job.status.replace("-", " ")}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">KSh 284,500</div>
                  <p className="text-xs text-white/70">+22% from last month</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">KSh 68,200</div>
                  <p className="text-xs text-white/70">+15% from last week</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">KSh 12,400</div>
                  <p className="text-xs text-white/70">3 jobs completed</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Service Rating Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-white/5 rounded-md border border-white/10">
                    <Star className="h-16 w-16 text-[#add64e]/50" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-white/5 rounded-md border border-white/10">
                    <TrendingUp className="h-16 w-16 text-[#add64e]/50" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

