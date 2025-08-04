'use client'

import React, { useState, useEffect } from 'react';
// @ts-ignore
import 'leaflet/dist/leaflet.css';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Package, TrendingUp, DollarSign, MapPin, Truck, Clock, CheckCircle, AlertCircle } from "lucide-react"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Order {
  id: string
  customer: string
  pickup: string
  delivery: string
  status: "pending" | "in-transit" | "delivered" | "cancelled"
  value: string
  date: string
  items: string
  progress: number
}

interface RevenueData {
  period: string
  amount: number
  orders: number
  growth: number
}

const stats = [
  { label: 'Request For Quotation', value: 0, icon: '🛒' },
  { label: "Today's Revenue", value: 'Ksh 0', icon: '💸' },
  { label: 'Shipments', value: 0, icon: '📦' },
  { label: 'Total Warehouse', value: 0, icon: '🏢' },
];

const products = [
  {
    name: 'Red velvet frostings',
    branch: 'Abuja Branch',
    price: 'Ksh 0',
    quantity: 5,
    image: '/public/placeholder.jpg',
  },
  // ...repeat as needed
];

// Chart Data
const lineData = {
  labels: ['NBO', 'MSA', 'KSM', 'BGM', 'MYL', 'NYK', 'NVS', 'USA'],
  datasets: [
    {
      label: 'Shipments',
      data: [20000, 40000, 15000, 18000, 32000, 30000, 17000, 12000],
      borderColor: '#add64e',
      backgroundColor: 'rgba(173, 214, 78, 0.2)',
      tension: 0.4,
      pointBackgroundColor: '#9bc943',
      pointBorderColor: '#add64e',
      fill: true,
    },
  ],
};

const lineOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { color: '#9bc943' },
      grid: { color: 'rgba(173,214,78,0.1)' },
    },
    x: {
      ticks: { color: '#add64e' },
      grid: { color: 'rgba(173,214,78,0.05)' },
    },
  },
};

const doughnutData = {
  labels: ['Ontime', 'In Progress', 'Delayed'],
  datasets: [
    {
      data: [78, 78, 78],
      backgroundColor: ['#add64e', '#9bc943', '#f87171'],
      borderWidth: 2,
      borderColor: '#fff',
      hoverOffset: 8,
    },
  ],
};

const doughnutOptions = {
  cutout: '70%',
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
};

const ProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard")

  // Sample orders data - replace with actual data fetching
  const recentOrders: Order[] = [
    // Uncomment for sample data:
    // {
    //   id: "ORD001",
    //   customer: "Acme Corp",
    //   pickup: "Nairobi CBD",
    //   delivery: "Westlands",
    //   status: "in-transit",
    //   value: "KSh 2,500",
    //   date: "2024-01-15",
    //   items: "Documents (3 packages)",
    //   progress: 75,
    // },
    // {
    //   id: "ORD002",
    //   customer: "Tech Solutions Ltd",
    //   pickup: "Industrial Area",
    //   delivery: "Karen",
    //   status: "pending",
    //   value: "KSh 4,200",
    //   date: "2024-01-16",
    //   items: "Electronics (2 boxes)",
    //   progress: 0,
    // },
    // {
    //   id: "ORD003",
    //   customer: "Fashion House",
    //   pickup: "Eastleigh",
    //   delivery: "Kilimani",
    //   status: "delivered",
    //   value: "KSh 1,800",
    //   date: "2024-01-14",
    //   items: "Clothing (5 items)",
    //   progress: 100,
    // },
  ]

  const revenueData: RevenueData[] = [
    { period: "Today", amount: 0, orders: 0, growth: 0 },
    { period: "This Week", amount: 0, orders: 0, growth: 0 },
    { period: "This Month", amount: 0, orders: 0, growth: 0 },
    { period: "This Year", amount: 0, orders: 0, growth: 0 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-[#add64e]/5 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-auto flex justify-end bg-white/5 backdrop-blur-xl border border-white/10">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-[#add64e] data-[state=active]:text-black text-white/70"
            >
              Main Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-[#add64e] data-[state=active]:text-black text-white/70"
            >
              Recent Orders
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-[#add64e] data-[state=active]:text-black text-white/70"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="revenue"
              className="data-[state=active]:bg-[#add64e] data-[state=active]:text-black text-white/70"
            >
              Revenue
            </TabsTrigger>
          </TabsList>

          {/* Main Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <Card key={i} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                  <CardContent className="p-4 flex flex-col items-center">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-white/70 text-sm mb-1">{stat.label}</div>
                    <div className="text-xl font-bold text-[#add64e]">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Map and Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Store Locations Map */}
              <Card className="lg:col-span-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Service Areas
                  </CardTitle>
                  <CardDescription className="text-white/70">Your coverage zones and active routes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-white/5 rounded-lg border border-white/10">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-[#add64e]/50 mx-auto mb-4" />
                      <p className="text-white/50">Interactive map will appear here</p>
                      <p className="text-white/30 text-sm mt-2">Showing delivery zones and real-time vehicle tracking</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-[#add64e] hover:bg-[#add64e]/90 text-white">
                    <Package className="h-4 w-4 mr-2" />
                    New Pickup Request
                  </Button>
                  <Button variant="outline" className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10">
                    <Clock className="h-4 w-4 mr-2" />
                    Schedule Delivery
                  </Button>
                  <Button variant="outline" className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Reports
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Recent Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Recent Orders</CardTitle>
                <CardDescription className="text-white/70">Your latest pickup and delivery requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <Package className="h-5 w-5 text-[#add64e]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-medium text-white">{order.id}</p>
                              <Badge
                                className={
                                  order.status === "delivered"
                                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                                    : order.status === "in-transit"
                                      ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                      : order.status === "cancelled"
                                        ? "bg-red-500/20 text-red-400 border-red-500/30"
                                        : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                }
                              >
                                {order.status.replace("-", " ")}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-white/70">
                              <span>{order.pickup}</span>
                              <span>→</span>
                              <span>{order.delivery}</span>
                            </div>
                            <p className="text-xs text-white/50">
                              {order.items} • {order.customer}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-white">{order.value}</p>
                            <p className="text-xs text-white/70">{order.date}</p>
                            <div className="w-20 mt-1">
                              <Progress value={order.progress} className="h-1" />
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-[#add64e]/10 border-[#add64e]/30 text-[#add64e] hover:bg-[#add64e]/20 hover:text-white"
                            onClick={() => {
                              console.log(`Managing order: ${order.id}`)
                            }}
                          >
                            <Truck className="h-4 w-4 mr-1" />
                            Manage
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-white/50">
                      <Package className="h-16 w-16 mx-auto mb-4 opacity-30" />
                      <h3 className="text-lg font-medium text-white/70 mb-2">No orders yet</h3>
                      <p className="text-sm text-white/50 mb-4">
                        Your recent orders will appear here once customers start booking your services.
                      </p>
                      <Button
                        className="bg-[#add64e] hover:bg-[#add64e]/90 text-white"
                        onClick={() => {
                          console.log("Navigate to create order")
                        }}
                      >
                        <Package className="h-4 w-4 mr-2" />
                        Create Test Order
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Shipments Chart */}
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Weekly Shipments Trend</CardTitle>
                  <CardDescription className="text-white/70">Performance across different routes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <Line data={lineData} options={lineOptions} />
                  </div>
                </CardContent>
              </Card>

              {/* Deliveries Donut Chart */}
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Delivery Performance</CardTitle>
                  <CardDescription className="text-white/70">Success rate breakdown</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                  <div className="relative h-40 w-40 flex items-center justify-center">
                    <Doughnut data={doughnutData} options={doughnutOptions} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-2xl font-bold text-[#add64e]">78%</div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#add64e] rounded-full"></div>
                      <span className="text-white/70">On-time</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#9bc943] rounded-full"></div>
                      <span className="text-white/70">In Progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#f87171] rounded-full"></div>
                      <span className="text-white/70">Delayed</span>
                    </div>
                  </div>
                  <Button className="mt-4 bg-[#add64e]/10 border border-[#add64e]/30 text-[#add64e] hover:bg-[#add64e]/20">
                    Download Statistics
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">0</div>
                  <div className="text-white/70 text-sm">Completed Orders</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">0</div>
                  <div className="text-white/70 text-sm">Pending Orders</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardContent className="p-6 text-center">
                  <AlertCircle className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">0</div>
                  <div className="text-white/70 text-sm">Issues Reported</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {revenueData.map((data, index) => (
                <Card key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-sm">{data.period}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-[#add64e]">
                        KSh {data.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-white/70">
                        {data.orders} orders
                      </div>
                      <div className={`text-xs flex items-center gap-1 ${data.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        <TrendingUp className="h-3 w-3" />
                        {data.growth >= 0 ? '+' : ''}{data.growth}% from last period
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Revenue Chart */}
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Revenue Trends</CardTitle>
                <CardDescription className="text-white/70">Monthly revenue performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-white/5 rounded-lg border border-white/10">
                  <div className="text-center">
                    <DollarSign className="h-16 w-16 text-[#add64e]/50 mx-auto mb-4" />
                    <p className="text-white/50">Revenue chart will appear here</p>
                    <p className="text-white/30 text-sm mt-2">Showing monthly earnings and growth trends</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products In Stock */}
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Recent Transactions</CardTitle>
                <CardDescription className="text-white/70">Latest payment activities</CardDescription>
              </CardHeader>
              <CardContent>
                {products.length > 0 ? (
                  <div className="space-y-3">
                    {products.map((product, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#add64e]/20 rounded-lg flex items-center justify-center">
                            <Package className="h-5 w-5 text-[#add64e]" />
                          </div>
                          <div>
                            <div className="font-medium text-sm text-white">{product.name}</div>
                            <div className="text-xs text-white/50">{product.branch}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-[#add64e]">{product.price}</div>
                          <div className="text-xs text-white/50">Qty: {product.quantity}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-white/50">
                    <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p>No transactions yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProviderDashboard;
