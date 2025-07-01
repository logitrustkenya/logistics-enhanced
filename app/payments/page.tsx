"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Download,
  CreditCard,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowRight,
  FileText,
} from "lucide-react"
import Link from "next/link"

type Payment = {
  id: string
  shipmentId: string
  provider: string
  route: string
  method: string
  amount: string
  date: string
  status: string
}

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [payments, setPayments] = useState<Payment[]>([])

  useEffect(() => {
    const fetchPayments = async () => {
      // TODO: Replace with real data fetching    bevon do ua things 
      setPayments([]) // Simulate loading state / empty state
    }
    fetchPayments()
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="flex items-center gap-1 text-custom-green border-custom-green bg-custom-green/20">
            <CheckCircle className="h-3 w-3" />
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1 text-yellow-600 border-yellow-200 bg-yellow-50">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="flex items-center gap-1 text-red-600 border-red-200 bg-red-50">
            <AlertTriangle className="h-3 w-3" />
            Failed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = (payment.id?.toLowerCase() || "").includes(searchTerm.toLowerCase())
      || (payment.shipmentId?.toLowerCase() || "").includes(searchTerm.toLowerCase())
      || (payment.provider?.toLowerCase() || "").includes(searchTerm.toLowerCase())
      || (payment.route?.toLowerCase() || "").includes(searchTerm.toLowerCase())
      || (payment.method?.toLowerCase() || "").includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    return matchesSearch && payment.status === activeTab
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>View and manage all your payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex w-full items-center gap-2 md:w-2/3">
                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search payments..."
                    className="w-full appearance-none pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="failed">Failed</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="rounded-md border">
              <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                <div className="col-span-2">Payment Details</div>
                <div className="hidden md:block">Amount</div>
                <div className="hidden md:block">Date</div>
                <div className="hidden md:block">Status</div>
                <div className="text-right">Actions</div>
              </div>
              {filteredPayments.map((payment: any) => (
                <div
                  key={payment.id}
                  className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-50 transition-colors"
                >
                  <div className="col-span-2">
                    <div className="font-medium">{payment.id}</div>
                    <div className="text-sm text-muted-foreground">
                      <Link href={`/shipments/${payment.shipmentId}`} className="hover:underline">
                        {payment.shipmentId}
                      </Link>{" "}
                      • {payment.provider}
                    </div>
                    <div className="text-xs text-muted-foreground md:hidden mt-1">
                      {payment.amount} • {payment.date}
                    </div>
                    <div className="md:hidden mt-1">{getStatusBadge(payment.status)}</div>
                  </div>
                  <div className="hidden md:block self-center">{payment.amount}</div>
                  <div className="hidden md:block self-center text-sm">{payment.date}</div>
                  <div className="hidden md:flex md:items-center">{getStatusBadge(payment.status)}</div>
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">View Receipt</span>
                    </Button>
                    <Link href={`/payments/${payment.id}`}>
                      <Button variant="outline" size="sm" className="h-8">
                        Details
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
              {filteredPayments.length === 0 && (
                <div className="p-4 text-center text-muted-foreground">
                  No payments found matching your criteria.
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Manage your payment methods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* M-Pesa */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-custom-green/20 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-custom-green" />
                </div>
                <div>
                  <h3 className="font-medium">M-Pesa</h3>
                  <p className="text-sm text-muted-foreground">Connected • Primary</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </div>

            {/* Credit Card */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">Credit Card</h3>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>

            {/* Add Payment Method */}
            <div className="mt-4">
              <Button className="w-full bg-custom-green hover:bg-[#9bc943]">
                <CreditCard className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
