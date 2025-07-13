"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

  // Placeholders for logistics provider data
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
            <p className="text-white/70 mt-2">Manage your logistics operations and earnings</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/5 bg-transparent">
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

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/5 border border-white/20 backdrop-blur-sm">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#add64e] data-[state=active]:text-black text-white/70"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="jobs"
              className="data-[state=active]:bg-[#add64e] data-[state=active]:text-black text-white/70"
            >
              Active Jobs
            </TabsTrigger>
            <TabsTrigger
              value="earnings"
              className="data-[state=active]:bg-[#add64e] data-[state=active]:text-black text-white/70"
            >
              Earnings
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="data-[state=active]:bg-[#add64e] data-[state=active]:text-black text-white/70"
            >
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <Card
                  key={i}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 hover:border-[#add64e]/30 transition-all duration-300"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-[#add64e]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <p className="text-xs text-white/70">{stat.description}</p>
                    <div className="mt-2 flex items-center text-xs">
                      <Badge className="bg-[#add64e]/20 text-[#add64e] border-[#add64e]/30">{stat.change}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Active Jobs */}
              <Card className="lg:col-span-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Active Jobs</CardTitle>
                  <CardDescription className="text-white/70">Your current logistics assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeJobs.map((job) => (
                      <div
                        key={job.id}
                        className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[#add64e]/30 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Truck className="h-4 w-4 text-[#add64e]" />
                            <span className="text-sm font-medium text-white">{job.id}</span>
                            <Badge
                              className={
                                job.priority === "urgent"
                                  ? "bg-red-500/20 text-red-400 border-red-500/30"
                                  : job.priority === "high"
                                    ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
                                    : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                              }
                            >
                              {job.priority}
                            </Badge>
                          </div>
                          <span className="text-sm font-medium text-[#add64e]">{job.value}</span>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-white/70">Client:</span>
                            <span className="text-white">{job.client}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-white/70">
                            <MapPin className="h-3 w-3" />
                            <span>
                              {job.origin} → {job.destination}
                            </span>
                            <span className="text-white/50">({job.distance})</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white/70">Items:</span>
                            <span className="text-white">{job.items}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1 text-white/70">
                              <Clock className="h-3 w-3" />
                              <span>Due: {job.deadline}</span>
                            </div>
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

                        <div className="mt-3 flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-[#add64e] to-[#9bc943] hover:from-[#9bc943] hover:to-[#add64e] text-black font-semibold"
                          >
                            Update Status
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/20 text-white hover:bg-white/5 bg-transparent"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Today's Summary</CardTitle>
                  <CardDescription className="text-white/70">Your daily performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-white">Completed</span>
                    </div>
                    <span className="text-sm font-medium text-white">3 jobs</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-white">In Progress</span>
                    </div>
                    <span className="text-sm font-medium text-white">5 jobs</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-[#add64e]" />
                      <span className="text-sm text-white">Earnings</span>
                    </div>
                    <span className="text-sm font-medium text-white">KSh 28,400</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-blue-400" />
                      <span className="text-sm text-white">Distance</span>
                    </div>
                    <span className="text-sm font-medium text-white">342 km</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Completions & Performance */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Recent Completions</CardTitle>
                  <CardDescription className="text-white/70">Your latest successful deliveries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentCompletions.map((completion) => (
                      <div key={completion.id} className="p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-white">{completion.id}</span>
                          <span className="text-sm font-medium text-[#add64e]">{completion.value}</span>
                        </div>
                        <div className="space-y-1 text-xs text-white/70">
                          <p>Client: {completion.client}</p>
                          <p>Route: {completion.route}</p>
                          <p>Completed: {completion.completedDate}</p>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-current text-yellow-400" />
                            <span>{completion.rating}/5.0</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Performance Metrics</CardTitle>
                  <CardDescription className="text-white/70">Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceMetrics.map((metric, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/70">{metric.label}</span>
                          <span className="text-white font-medium">{metric.value}</span>
                        </div>
                        <div className="text-xs text-[#add64e]">{metric.change}</div>
                        {index < performanceMetrics.length - 1 && <div className="border-t border-white/10 pt-2" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
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

