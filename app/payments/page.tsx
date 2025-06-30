"use client"

import { useState } from "react"
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

  // Placeholder data for logistics provider
  const stats = [
    {
      title: "Total Jobs",
      value: "--",
      description: "Jobs completed this month",
      change: "+-- from last month",
      icon: Package,
    },
    {
      title: "Monthly Earnings",
      value: "KSh --,---",
      description: "Total earnings this month",
      change: "+--% from last month",
      icon: CreditCard,
    },
    {
      title: "Service Rating",
      value: "-.--",
      description: "Average customer rating",
      change: "+-.-- from last month",
      icon: Star,
    },
    {
      title: "Distance Covered",
      value: "--- km",
      description: "Total distance this month",
      change: "+--- km from last month",
      icon: Truck,
    },
  ]

  const activeJobs = [
    {
      id: "JOB-XXXX",
      client: "Client Name",
      origin: "Origin Location",
      destination: "Destination Location",
      distance: "-- km",
      items: "-- items",
      deadline: "MMM DD, YYYY",
      value: "KSh --,---",
      priority: "normal",
      status: "pending",
    },
    {
      id: "JOB-YYYY",
      client: "Another Client",
      origin: "Start Point",
      destination: "End Point",
      distance: "-- km",
      items: "-- packages",
      deadline: "MMM DD, YYYY",
      value: "KSh --,---",
      priority: "high",
      status: "in-progress",
    },
    {
      id: "JOB-ZZZZ",
      client: "Third Client",
      origin: "Pickup Location",
      destination: "Delivery Location",
      distance: "-- km",
      items: "-- items",
      deadline: "MMM DD, YYYY",
      value: "KSh --,---",
      priority: "urgent",
      status: "pending",
    },
  ]

  const recentCompletions = [
    {
      id: "JOB-AAAA",
      client: "Completed Client A",
      route: "Location A → Location B",
      completedDate: "MMM DD, YYYY",
      value: "KSh --,---",
      rating: "-.--",
    },
    {
      id: "JOB-BBBB",
      client: "Completed Client B",
      route: "Location C → Location D",
      completedDate: "MMM DD, YYYY",
      value: "KSh --,---",
      rating: "-.--",
    },
    {
      id: "JOB-CCCC",
      client: "Completed Client C",
      route: "Location E → Location F",
      completedDate: "MMM DD, YYYY",
      value: "KSh --,---",
      rating: "-.--",
    },
  ]

  const performanceMetrics = [
    {
      label: "On-time Delivery Rate",
      value: "--%",
      change: "+--% from last period",
    },
    {
      label: "Customer Satisfaction",
      value: "-.-- / 5.0",
      change: "+-.-- from last period",
    },
    {
      label: "Job Completion Rate",
      value: "--%",
      change: "+--% from last period",
    },
    {
      label: "Average Response Time",
      value: "-- minutes",
      change: "-– minutes from last period",
    },
  ]

  const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <div className={`rounded-lg ${className}`}>{children}</div>
  )

  const CardHeader = ({ children }) => (
    <div className="p-6 pb-4">{children}</div>
  )

  const CardTitle = ({ children, className = "" }) => (
    <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
  )

  const CardDescription = ({ children, className = "" }) => (
    <p className={`text-sm mt-1 ${className}`}>{children}</p>
  )

  const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 pt-0 ${className}`}>{children}</div>
  )

  const Button = ({ children, className = "", variant = "default", size = "default", ...props }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border hover:bg-gray-100"
    }
    const sizes = {
      default: "h-10 py-2 px-4",
      sm: "h-8 px-3 text-sm"
    }
    
    return (
      <button 
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }

  const Badge = ({ children, className = "" }) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  )

  const TabsList = ({ children, className = "" }) => (
    <div className={`inline-flex h-10 items-center justify-center rounded-md p-1 ${className}`}>
      {children}
    </div>
  )

  const TabsTrigger = ({ children, value, className = "", ...props }) => (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        activeTab === value ? 'bg-[#add64e] text-black' : 'text-white/70'
      } ${className}`}
      onClick={() => setActiveTab(value)}
      {...props}
    >
      {children}
    </button>
  )

  const TabsContent = ({ children, value, className = "" }) => {
    if (activeTab !== value) return null
    return <div className={className}>{children}</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-green-900/20 p-6">
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

        <div className="space-y-6">
          <TabsList className="bg-white/5 border border-white/20 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Active Jobs</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
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
                    <span className="text-sm font-medium text-white">-- jobs</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-white">In Progress</span>
                    </div>
                    <span className="text-sm font-medium text-white">-- jobs</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-[#add64e]" />
                      <span className="text-sm text-white">Earnings</span>
                    </div>
                    <span className="text-sm font-medium text-white">KSh --,---</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-blue-400" />
                      <span className="text-sm text-white">Distance</span>
                    </div>
                    <span className="text-sm font-medium text-white">--- km</span>
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
                  <div className="text-2xl font-bold text-white">KSh ---,---</div>
                  <p className="text-xs text-white/70">+--% from last month</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">KSh --,---</div>
                  <p className="text-xs text-white/70">+--% from last week</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">KSh --,---</div>
                  <p className="text-xs text-white/70">-- jobs completed</p>
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
                    <div className="text-center text-white/50">
                      <Star className="h-16 w-16 mx-auto mb-2 text-[#add64e]/50" />
                      <p className="text-sm">Chart placeholder</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-white/5 rounded-md border border-white/10">
                    <div className="text-center text-white/50">
                      <TrendingUp className="h-16 w-16 mx-auto mb-2 text-[#add64e]/50" />
                      <p className="text-sm">Chart placeholder</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </div>
    </div>
  )
}