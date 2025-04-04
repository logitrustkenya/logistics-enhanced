"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpRight, Download, Calendar } from "lucide-react"
import { useState } from "react"

export default function AdminAnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("month")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Platform Analytics</h1>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="quarter">Last 90 days</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="environmental">Environmental Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Shipments"
              value="4,287"
              change="+12.5%"
              positive={true}
              description="vs. previous period"
            />
            <MetricCard
              title="Active Users"
              value="1,248"
              change="+8.2%"
              positive={true}
              description="vs. previous period"
            />
            <MetricCard
              title="Revenue"
              value="KSh 1.2M"
              change="+15.3%"
              positive={true}
              description="vs. previous period"
            />
            <MetricCard
              title="Carbon Offset"
              value="12.5 tons"
              change="+5.7%"
              positive={true}
              description="vs. previous period"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Shipment Volume</CardTitle>
                <CardDescription>Number of shipments over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Shipment Volume Chart</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New user registrations over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">User Growth Chart</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>Breakdown by user type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">User Distribution Chart</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Shipment Status</CardTitle>
                <CardDescription>Current shipment statuses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Shipment Status Chart</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Routes</CardTitle>
                <CardDescription>Most popular shipping routes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Top Routes Chart</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="shipments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Shipments"
              value="4,287"
              change="+12.5%"
              positive={true}
              description="vs. previous period"
            />
            <MetricCard
              title="Completed"
              value="3,842"
              change="+10.2%"
              positive={true}
              description="vs. previous period"
            />
            <MetricCard
              title="In Transit"
              value="342"
              change="+5.3%"
              positive={true}
              description="vs. previous period"
            />
            <MetricCard title="Delayed" value="103" change="-8.7%" positive={true} description="vs. previous period" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Shipment Volume by Day</CardTitle>
                <CardDescription>Daily shipment volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Daily Shipment Volume Chart</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Shipment Types</CardTitle>
                <CardDescription>Distribution by package type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Shipment Types Chart</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Performance</CardTitle>
              <CardDescription>On-time delivery metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Delivery Performance Chart</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environmental" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total CO₂ Emissions"
              value="125 tons"
              change="-5.2%"
              positive={true}
              description="vs. previous period"
            />
            <MetricCard
              title="Carbon Offset"
              value="12.5 tons"
              change="+15.3%"
              positive={true}
              description="vs. previous period"
            />
            <MetricCard
              title="Eco-friendly Deliveries"
              value="1,248"
              change="+18.7%"
              positive={true}
              description="vs. previous period"
            />
            <MetricCard
              title="Avg. Emissions per Shipment"
              value="28.5 kg"
              change="-3.2%"
              positive={true}
              description="vs. previous period"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Carbon Emissions by Transport Type</CardTitle>
                <CardDescription>Breakdown of emissions by transport method</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Emissions by Transport Chart</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Emissions Trend</CardTitle>
                <CardDescription>Carbon emissions over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Emissions Trend Chart</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Environmental Impact by Region</CardTitle>
              <CardDescription>Carbon footprint across different regions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Regional Environmental Impact Map</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs content would go here */}
      </Tabs>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change: string
  positive: boolean
  description: string
}

function MetricCard({ title, value, change, positive, description }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs">
          <span className={positive ? "text-green-500" : "text-red-500"}>{change}</span>
          <span className="text-muted-foreground ml-1">{description}</span>
        </div>
      </CardContent>
    </Card>
  )
}

