"use client"

import { JSX, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowUpRight, Package, Truck, Users, ArrowRight, AlertTriangle, Shield, CheckCircle } from "lucide-react"

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Placeholders instead of mock data
  const stats: any[] = []
  const pendingProviders: any[] = []
  const disputes: any[] = []

  const getStatusBadge = (status: string) => {
    const badgeMap: Record<string, JSX.Element> = {
      pending: <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending Approval</Badge>,
      approved: <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>,
      rejected: <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>,
      new: <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">New</Badge>,
      "in-progress": <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">In Progress</Badge>,
      resolved: <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Resolved</Badge>
    }
    return badgeMap[status] || <Badge variant="outline">{status}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const badgeMap: Record<string, JSX.Element> = {
      high: <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High Priority</Badge>,
      medium: <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Medium Priority</Badge>,
      low: <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Low Priority</Badge>
    }
    return badgeMap[priority] || null
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ArrowUpRight className="mr-2 h-4 w-4" /> Export
          </Button>
          <Link href="/admin/settings">
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <Shield className="mr-2 h-4 w-4" /> System Settings
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="providers">Provider Onboarding</TabsTrigger>
          <TabsTrigger value="disputes">Dispute Resolution</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.length === 0 ? (
              <p className="col-span-full text-muted-foreground italic">No stats to display yet.</p>
            ) : (
              stats.map((stat, i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                    <div className="mt-2 flex items-center text-xs">
                      <Badge
                        variant={stat.positive ? "default" : "destructive"}
                        className={stat.positive ? "bg-green-500" : ""}
                      >
                        {stat.change}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage users across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground italic">User data will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="providers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Provider Onboarding</CardTitle>
              <CardDescription>Pending provider approvals</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingProviders.length === 0 ? (
                <p className="text-muted-foreground italic">No providers pending approval.</p>
              ) : (
                <div>/* Provider list rendering */</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disputes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dispute Resolution</CardTitle>
              <CardDescription>Open disputes to review</CardDescription>
            </CardHeader>
            <CardContent>
              {disputes.length === 0 ? (
                <p className="text-muted-foreground italic">No disputes at the moment.</p>
              ) : (
                <div>/* Disputes list rendering */</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

