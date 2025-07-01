"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  Calendar,
} from "lucide-react"

export default function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats: any[] = []
  const activeJobs: any[] = []
  const recentCompletions: any[] = []
  const performanceMetrics: any[] = []

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-[#add64e]/5 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Provider Dashboard
            </h1>
            <p className="text-white/70 mt-2">
              Manage your logistics operations and earnings
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:bg-white/5 bg-transparent"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-[#add64e] to-[#9bc943] hover:from-[#9bc943] hover:to-[#add64e] text-black font-semibold"
            >
              <Package className="mr-2 h-4 w-4" />
              Browse Jobs
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="bg-white/5 border border-white/20 backdrop-blur-sm">
            {["overview", "jobs", "earnings", "performance"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="data-[state=active]:bg-[#add64e] data-[state=active]:text-black text-white/70 capitalize"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {stats.length > 0 ? (
                stats.map((stat, i) => (
                  <Card
                    key={i}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 hover:border-[#add64e]/30 transition-all duration-300"
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-white">
                        {stat.title}
                      </CardTitle>
                      <stat.icon className="h-4 w-4 text-[#add64e]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <p className="text-xs text-white/70">{stat.description}</p>
                      <div className="mt-2 flex items-center text-xs">
                        <Badge className="bg-[#add64e]/20 text-[#add64e] border-[#add64e]/30">
                          {stat.change}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-white/50 italic col-span-full text-center">
                  Stats will appear here once available.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">All Active Jobs</CardTitle>
                <CardDescription className="text-white/70">
                  Manage your current assignments
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activeJobs.length > 0 ? (
                  <div className="space-y-4">
                    {/* Map through activeJobs */}
                  </div>
                ) : (
                  <p className="text-white/50 italic text-center">
                    No active jobs at the moment.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {["This Month", "This Week", "Today"].map((label, i) => (
                <Card
                  key={i}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10"
                >
                  <CardHeader>
                    <CardTitle className="text-white">{label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">—</div>
                    <p className="text-xs text-white/70">Earnings data not available</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {["Service Rating Trend", "Completion Rate"].map((title, i) => (
                <Card
                  key={i}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10"
                >
                  <CardHeader>
                    <CardTitle className="text-white">{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center bg-white/5 rounded-md border border-white/10">
                      <p className="text-white/50 text-sm italic">No data yet</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}



