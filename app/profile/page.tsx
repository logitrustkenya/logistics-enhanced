"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, Building, MapPin, Bell, Shield, CreditCard, LogOut } from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Profile Settings</h1>
        <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-sm text-muted-foreground">john@example.com</p>
                <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-100">SME</Badge>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">Change Avatar</Button>
            </div>

            <div className="mt-6 space-y-1">
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("profile")}>
                <User className="mr-2 h-4 w-4" />
                Personal Information
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("business")}>
                <Building className="mr-2 h-4 w-4" />
                Business Details
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("notifications")}>
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("security")}>
                <Shield className="mr-2 h-4 w-4" />
                Security
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("payment")}>
                <CreditCard className="mr-2 h-4 w-4" />
                Payment Methods
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Input id="email" defaultValue="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <Input id="phone" defaultValue="+254 712 345 678" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <Textarea id="address" defaultValue="123 Kimathi Street, Nairobi, Kenya" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Preferred Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="sw">Swahili</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="business" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Business Details</CardTitle>
                  <CardDescription>Update your business information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <Input id="businessName" defaultValue="Acme Inc" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select defaultValue="retail">
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="agriculture">Agriculture</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessAddress">Business Address</Label>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <Textarea id="businessAddress" defaultValue="456 Kenyatta Avenue, Nairobi, Kenya" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID / Business Registration Number</Label>
                    <Input id="taxId" defaultValue="KE123456789" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" defaultValue="https://www.acmeinc.co.ke" />
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Shipment Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about your shipment status changes
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch id="shipment-email" defaultChecked />
                          <Label htmlFor="shipment-email" className="text-sm">
                            Email
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="shipment-sms" defaultChecked />
                          <Label htmlFor="shipment-sms" className="text-sm">
                            SMS
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="shipment-push" defaultChecked />
                          <Label htmlFor="shipment-push" className="text-sm">
                            Push
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Quote Requests</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications when you receive new quotes
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch id="quote-email" defaultChecked />
                          <Label htmlFor="quote-email" className="text-sm">
                            Email
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="quote-sms" defaultChecked />
                          <Label htmlFor="quote-sms" className="text-sm">
                            SMS
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="quote-push" defaultChecked />
                          <Label htmlFor="quote-push" className="text-sm">
                            Push
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Payment Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about payment status changes
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch id="payment-email" defaultChecked />
                          <Label htmlFor="payment-email" className="text-sm">
                            Email
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="payment-sms" defaultChecked />
                          <Label htmlFor="payment-sms" className="text-sm">
                            SMS
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="payment-push" defaultChecked />
                          <Label htmlFor="payment-push" className="text-sm">
                            Push
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Marketing</Label>
                        <p className="text-sm text-muted-foreground">Receive promotional offers and updates</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch id="marketing-email" />
                          <Label htmlFor="marketing-email" className="text-sm">
                            Email
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="marketing-sms" />
                          <Label htmlFor="marketing-sms" className="text-sm">
                            SMS
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="marketing-push" />
                          <Label htmlFor="marketing-push" className="text-sm">
                            Push
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">Save Preferences</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <div className="pt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch id="2fa" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Login Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications when someone logs into your account
                        </p>
                      </div>
                      <Switch id="login-notifications" defaultChecked />
                    </div>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">Update Security Settings</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="payment" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">M-Pesa</h3>
                          <p className="text-sm text-muted-foreground">Connected • Primary</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Credit Card</h3>
                          <p className="text-sm text-muted-foreground">**** **** **** 4242</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">Add Payment Method</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

