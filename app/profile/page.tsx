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
import { User, Mail, Phone, Building, MapPin, Bell, Shield, CreditCard, LogOut, Truck, Package } from "lucide-react"

export default function UnifiedProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  
  // This would come from your authentication/user context
  const [userType, setUserType] = useState("courier") // "user", "sme", "courier"
  
  // Unified form data that contains all possible fields
  const [formData, setFormData] = useState({
    // Common fields
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+254 712 345 678",
    address: "123 Kimathi Street, Nairobi, Kenya",
    language: "en",
    
    // SME specific fields
    companyName: "Acme Inc",
    companyType: "retail",
    businessRegistration: "KE123456789",
    
    // Courier specific fields
    courierCompanyName: "FastDelivery Ltd",
    serviceType: "logistics",
    driverLicense: "DL123456",
    vehicleType: "van",
    vehicleRegistration: "KAA 123A",
    insuranceNumber: "INS789456",
    licenseNumber: "PL654321",
    experience: "3-5",
    coverage: "Nairobi, Kenya"
  })

  interface CommonFormData {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    language: string
  }

  interface SmeFormData {
    companyName: string
    companyType: string
    businessRegistration: string
  }

  interface CourierFormData {
    courierCompanyName: string
    serviceType: string
    driverLicense: string
    vehicleType: string
    vehicleRegistration: string
    insuranceNumber: string
    licenseNumber: string
    experience: string
    coverage: string
  }

  type UnifiedFormData = CommonFormData & SmeFormData & CourierFormData

  type UserType = "user" | "sme" | "courier"
  type TabType = "profile" | "business" | "notifications" | "security" | "payment"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  interface HandleSelectChangeProps {
    name: keyof UnifiedFormData
    value: string
  }

  const handleSelectChange = (name: keyof UnifiedFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const getUserTypeDisplay = () => {
    switch(userType) {
      case "sme": return "SME"
      case "courier": return "Courier"
      case "user": return "User"
      default: return "User"
    }
  }

  const getUserTypeBadgeColor = () => {
    switch(userType) {
      case "sme": return "bg-blue-100 text-blue-700"
      case "courier": return "bg-orange-100 text-orange-700"
      case "user": return "bg-green-100 text-[#add64e]"
      default: return "bg-green-100 text-[#add64e]"
    }
  }

  // Render business details based on user type
  const renderBusinessDetails = () => {
    switch (userType) {
      case "sme":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company/Business Name</Label>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-slate-500" />
                <Input 
                  id="companyName" 
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="flex-1" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="companyType">Company/Business Type</Label>
              <Select
                value={formData.companyType}
                onValueChange={(value) => handleSelectChange("companyType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="agriculture">Agriculture</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="businessRegistration">Business Registration Number</Label>
              <Input 
                id="businessRegistration" 
                name="businessRegistration"
                value={formData.businessRegistration}
                onChange={handleChange}
                placeholder="Enter registration number"
              />
            </div>
          </>
        )

      case "courier":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="courierCompanyName">Company Name</Label>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-slate-500" />
                <Input 
                  id="courierCompanyName" 
                  name="courierCompanyName"
                  value={formData.courierCompanyName}
                  onChange={handleChange}
                  className="flex-1" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type</Label>
              <Select
                value={formData.serviceType}
                onValueChange={(value) => handleSelectChange("serviceType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="logistics">Logistics</SelectItem>
                  <SelectItem value="warehousing">Warehousing</SelectItem>
                  <SelectItem value="freight">Freight Forwarding</SelectItem>
                  <SelectItem value="customs">Customs Clearance</SelectItem>
                  <SelectItem value="packaging">Packaging</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="driverLicense">Driver License</Label>
              <Input 
                id="driverLicense" 
                name="driverLicense"
                value={formData.driverLicense}
                onChange={handleChange}
                placeholder="Enter license number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Select
                value={formData.vehicleType}
                onValueChange={(value) => handleSelectChange("vehicleType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="motorcycle">Motorcycle</SelectItem>
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                  <SelectItem value="pickup">Pickup Truck</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                  <SelectItem value="bicycle">Bicycle</SelectItem>
                  <SelectItem value="none">No Vehicle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="vehicleRegistration">Vehicle Registration Number</Label>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-slate-500" />
                <Input 
                  id="vehicleRegistration" 
                  name="vehicleRegistration"
                  value={formData.vehicleRegistration}
                  onChange={handleChange}
                  placeholder="e.g., KAA 123A"
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="insuranceNumber">Insurance Policy Number</Label>
              <Input 
                id="insuranceNumber" 
                name="insuranceNumber"
                value={formData.insuranceNumber}
                onChange={handleChange}
                placeholder="Vehicle insurance number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="licenseNumber">Professional License Number</Label>
              <Input 
                id="licenseNumber" 
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                placeholder="Professional license number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Select
                value={formData.experience}
                onValueChange={(value) => handleSelectChange("experience", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-2">0-2 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="6-10">6-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="coverage">Service Coverage Area</Label>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-500" />
                <Input 
                  id="coverage" 
                  name="coverage"
                  value={formData.coverage}
                  onChange={handleChange}
                  placeholder="e.g., Nairobi, Kenya, East Africa"
                  className="flex-1"
                />
              </div>
            </div>
          </>
        )

      case "user":
        return (
          <div className="text-center py-8 text-slate-500">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No additional business details required for regular users.</p>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-4 p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Profile Settings</h1>
        <div className="flex items-center gap-4">
          {/* User Type Switcher - for demo purposes */}
          <Select value={userType} onValueChange={setUserType}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="sme">SME</SelectItem>
              <SelectItem value="courier">Courier</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback className="text-lg">
                  {formData.firstName?.[0]}{formData.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-bold">{formData.firstName} {formData.lastName}</h2>
                <p className="text-sm text-slate-600">{formData.email}</p>
                <Badge className={`mt-2 ${getUserTypeBadgeColor()}`}>
                  {getUserTypeDisplay()}
                </Badge>
              </div>
              <Button className="w-full bg-[#add64e] hover:bg-[#96c442]">Change Avatar</Button>
            </div>

            <div className="mt-6 space-y-1">
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${activeTab === 'profile' ? 'text-white bg-[#add64e]' : 'text-green-600 hover:text-green-700 hover:bg-green-50'}`} 
                onClick={() => setActiveTab("profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Personal Information
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${activeTab === 'business' ? 'text-white bg-[#add64e]' : 'text-green-600 hover:text-green-700 hover:bg-green-50'}`} 
                onClick={() => setActiveTab("business")}
              >
                <Building className="mr-2 h-4 w-4" />
                {userType === 'courier' ? 'Courier Details' : userType === 'sme' ? 'Business Details' : 'Additional Info'}
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${activeTab === 'notifications' ? 'text-white bg-[#add64e]' : 'text-green-600 hover:text-green-700 hover:bg-green-50'}`} 
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${activeTab === 'security' ? 'text-white bg-[#add64e]' : 'text-green-600 hover:text-green-700 hover:bg-green-50'}`} 
                onClick={() => setActiveTab("security")}
              >
                <Shield className="mr-2 h-4 w-4" />
                Security
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${activeTab === 'payment' ? 'text-white bg-[#add64e]' : 'text-green-600 hover:text-green-700 hover:bg-green-50'}`} 
                onClick={() => setActiveTab("payment")}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Payment Methods
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="business">
                {userType === 'courier' ? 'Courier' : userType === 'sme' ? 'Business' : 'Info'}
              </TabsTrigger>
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
                      <Input 
                        id="firstName" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-500" />
                      <Input 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="flex-1" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-slate-500" />
                      <Input 
                        id="phone" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="flex-1" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-slate-500 mt-3" />
                      <Textarea 
                        id="address" 
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="flex-1" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Preferred Language</Label>
                    <Select 
                      value={formData.language}
                      onValueChange={(value) => handleSelectChange("language", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="sw">Swahili</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="bg-[#add64e] hover:bg-[#96c442]">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="business" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {userType === 'courier' ? 'Courier Details' : userType === 'sme' ? 'Business Details' : 'Additional Information'}
                  </CardTitle>
                  <CardDescription>
                    {userType === 'courier' ? 'Update your courier and vehicle information' : 
                     userType === 'sme' ? 'Update your business information' : 
                     'Additional account information'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {renderBusinessDetails()}
                  {userType !== 'user' && (
                    <Button className="bg-[#add64e] hover:bg-[#96c442]">Save Changes</Button>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Shipment Updates</Label>
                        <p className="text-sm text-slate-600">
                          Receive notifications about your shipment status changes
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch id="shipment-email" defaultChecked />
                          <Label htmlFor="shipment-email" className="text-sm">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="shipment-sms" defaultChecked />
                          <Label htmlFor="shipment-sms" className="text-sm">SMS</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="shipment-push" defaultChecked />
                          <Label htmlFor="shipment-push" className="text-sm">Push</Label>
                        </div>
                      </div>
                    </div>
                    
                    {(userType === 'sme' || userType === 'courier') && (
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Quote Requests</Label>
                          <p className="text-sm text-slate-600">
                            Receive notifications when you receive new quotes
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch id="quote-email" defaultChecked />
                            <Label htmlFor="quote-email" className="text-sm">Email</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="quote-sms" defaultChecked />
                            <Label htmlFor="quote-sms" className="text-sm">SMS</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="quote-push" defaultChecked />
                            <Label htmlFor="quote-push" className="text-sm">Push</Label>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Payment Updates</Label>
                        <p className="text-sm text-slate-600">
                          Receive notifications about payment status changes
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch id="payment-email" defaultChecked />
                          <Label htmlFor="payment-email" className="text-sm">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="payment-sms" defaultChecked />
                          <Label htmlFor="payment-sms" className="text-sm">SMS</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="payment-push" defaultChecked />
                          <Label htmlFor="payment-push" className="text-sm">Push</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Marketing</Label>
                        <p className="text-sm text-slate-600">Receive promotional offers and updates</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch id="marketing-email" />
                          <Label htmlFor="marketing-email" className="text-sm">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="marketing-sms" />
                          <Label htmlFor="marketing-sms" className="text-sm">SMS</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="marketing-push" />
                          <Label htmlFor="marketing-push" className="text-sm">Push</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-[#add64e] hover:bg-[#96c442]">Save Preferences</Button>
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
                        <p className="text-sm text-slate-600">Add an extra layer of security to your account</p>
                      </div>
                      <Switch id="2fa" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Login Notifications</Label>
                        <p className="text-sm text-slate-600">
                          Receive notifications when someone logs into your account
                        </p>
                      </div>
                      <Switch id="login-notifications" defaultChecked />
                    </div>
                  </div>
                  <Button className="bg-[#add64e] hover:bg-[#96c442]">Update Security Settings</Button>
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
                          <p className="text-sm text-slate-600">Connected • Primary</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Credit Card</h3>
                          <p className="text-sm text-slate-600">**** **** **** 4242</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </div>
                  <Button className="bg-[#add64e] hover:bg-[#96c442]">Add Payment Method</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}