"use client"
import { useState, useEffect } from "react"
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
import { User, Mail, Phone, Building, MapPin, Bell, Shield, CreditCard, LogOut, Truck, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProfileData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
  language: string
  
  // User Type and Business Details
  userType: string
  
  // SME specific fields
  companyName: string
  companyType: string
  businessRegistration: string
  
  // Provider specific fields
  providerCompanyName: string
  serviceType: string
  licenseNumber: string
  experience: string
  coverage: string
  
  // Vehicle Information (for providers)
  vehicleType: string
  vehicleRegistration: string
  insuranceNumber: string
  driverLicense: string
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [userType, setUserType] = useState("sme")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<any>({})
  const router = useRouter()
  
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    language: "en",
    userType: "sme",
    companyName: "",
    companyType: "",
    businessRegistration: "",
    providerCompanyName: "",
    serviceType: "",
    licenseNumber: "",
    experience: "",
    coverage: "",
    vehicleType: "",
    vehicleRegistration: "",
    insuranceNumber: "",
    driverLicense: "",
  })

  useEffect(() => {
    // Load user data from localStorage or API
    const storedUserType = localStorage.getItem("userType")
    if (storedUserType) {
      setUserType(storedUserType)
      setProfileData(prev => ({ ...prev, userType: storedUserType }))
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData({
      ...profileData,
      [name]: value,
    })
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setProfileData({
      ...profileData,
      [name]: value,
    })
  }

  const handleUserTypeChange = (value: string) => {
    setUserType(value)
    setProfileData(prev => ({ ...prev, userType: value }))
    localStorage.setItem("userType", value)
  }

  const validateForm = () => {
    const newErrors: any = {}

    if (!profileData.firstName) newErrors.firstName = "First name is required"
    if (!profileData.lastName) newErrors.lastName = "Last name is required"
    if (!profileData.email) newErrors.email = "Email is required"
    if (!profileData.phoneNumber) newErrors.phoneNumber = "Phone number is required"

    if (userType === "sme") {
      if (!profileData.companyName) newErrors.companyName = "Company name is required"
      if (!profileData.companyType) newErrors.companyType = "Company type is required"
    }

    if (userType === "provider") {
      if (!profileData.providerCompanyName) newErrors.providerCompanyName = "Company name is required"
      if (!profileData.serviceType) newErrors.serviceType = "Service type is required"
      if (!profileData.licenseNumber) newErrors.licenseNumber = "License number is required"
      if (!profileData.coverage) newErrors.coverage = "Coverage area is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    if (!validateForm()) {
      setIsSubmitting(false)
      return
    }

    try {
      // Here you would typically send the profile data to your API
      console.log("Saving profile data:", profileData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to dashboard after successful profile setup
      router.push("/dashboard")
      
    } catch (error) {
      console.error("Error saving profile:", error)
      setErrors({ general: "Failed to save profile. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getUserTypeTitle = (type: string) => {
    switch (type) {
      case "sme":
        return "Small & Medium Enterprise"
      case "provider":
        return "Logistics Provider"
      default:
        return "User"
    }
  }

  const renderUserTypeSpecificFields = () => {
    switch (userType) {
      case "sme":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company/Business Name</Label>
              <Input
                id="companyName"
                name="companyName"
                value={profileData.companyName}
                onChange={handleChange}
                className={errors.companyName ? "border-red-500" : ""}
              />
              {errors.companyName && (
                <div className="flex items-center space-x-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.companyName}</span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyType">Company/Business Type</Label>
              <Select
                value={profileData.companyType}
                onValueChange={(value) => handleSelectChange("companyType", value)}
              >
                <SelectTrigger className={errors.companyType ? "border-red-500" : ""}>
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
              {errors.companyType && (
                <div className="flex items-center space-x-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.companyType}</span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessRegistration">Business Registration Number</Label>
              <Input
                id="businessRegistration"
                name="businessRegistration"
                value={profileData.businessRegistration}
                onChange={handleChange}
                placeholder="Enter registration number"
              />
            </div>
          </div>
        )

      case "provider":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="providerCompanyName">Company Name</Label>
              <Input
                id="providerCompanyName"
                name="providerCompanyName"
                value={profileData.providerCompanyName}
                onChange={handleChange}
                className={errors.providerCompanyName ? "border-red-500" : ""}
              />
              {errors.providerCompanyName && (
                <div className="flex items-center space-x-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.providerCompanyName}</span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type</Label>
              <Select
                value={profileData.serviceType}
                onValueChange={(value) => handleSelectChange("serviceType", value)}
              >
                <SelectTrigger className={errors.serviceType ? "border-red-500" : ""}>
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
              {errors.serviceType && (
                <div className="flex items-center space-x-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.serviceType}</span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseNumber">License Number</Label>
              <Input
                id="licenseNumber"
                name="licenseNumber"
                value={profileData.licenseNumber}
                onChange={handleChange}
                placeholder="Professional license number"
                className={errors.licenseNumber ? "border-red-500" : ""}
              />
              {errors.licenseNumber && (
                <div className="flex items-center space-x-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.licenseNumber}</span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Select
                value={profileData.experience}
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
              <Input
                id="coverage"
                name="coverage"
                value={profileData.coverage}
                onChange={handleChange}
                placeholder="e.g., Nairobi, Kenya, East Africa"
                className={errors.coverage ? "border-red-500" : ""}
              />
              {errors.coverage && (
                <div className="flex items-center space-x-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.coverage}</span>
                </div>
              )}
            </div>
            
            {/* Vehicle Information for Providers */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-semibold">Vehicle Information (Optional)</h3>
              <div className="space-y-2">
                <Label htmlFor="vehicleType">Vehicle Type</Label>
                <Select
                  value={profileData.vehicleType}
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
                <Input
                  id="vehicleRegistration"
                  name="vehicleRegistration"
                  value={profileData.vehicleRegistration}
                  onChange={handleChange}
                  placeholder="e.g., KAA 123A"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insuranceNumber">Insurance Policy Number</Label>
                <Input
                  id="insuranceNumber"
                  name="insuranceNumber"
                  value={profileData.insuranceNumber}
                  onChange={handleChange}
                  placeholder="Vehicle insurance number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="driverLicense">Driver License Number</Label>
                <Input
                  id="driverLicense"
                  name="driverLicense"
                  value={profileData.driverLicense}
                  onChange={handleChange}
                  placeholder="Driver license number"
                />
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-4 p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Complete Your Profile</h1>
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
                <AvatarFallback className="text-lg">JD</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-bold">Complete Setup</h2>
                <p className="text-sm text-slate-600">Please complete your profile</p>
                <Badge className="mt-2 bg-green-100 text-green-700 hover:bg-green-100">
                  {getUserTypeTitle(userType)}
                </Badge>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">Change Avatar</Button>
            </div>

            <div className="mt-6 space-y-1">
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${activeTab === 'profile' ? 'bg-green-50 text-green-700' : 'text-green-600 hover:text-green-700'}`} 
                onClick={() => setActiveTab("profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Personal Information
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${activeTab === 'business' ? 'bg-green-50 text-green-700' : 'text-green-600 hover:text-green-700'}`} 
                onClick={() => setActiveTab("business")}
              >
                <Building className="mr-2 h-4 w-4" />
                Business Details
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${activeTab === 'notifications' ? 'bg-green-50 text-green-700' : 'text-green-600 hover:text-green-700'}`} 
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${activeTab === 'security' ? 'bg-green-50 text-green-700' : 'text-green-600 hover:text-green-700'}`} 
                onClick={() => setActiveTab("security")}
              >
                <Shield className="mr-2 h-4 w-4" />
                Security
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${activeTab === 'payment' ? 'bg-green-50 text-green-700' : 'text-green-600 hover:text-green-700'}`} 
                onClick={() => setActiveTab("payment")}
              >
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
                      <Input 
                        id="firstName" 
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleChange}
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && (
                        <div className="flex items-center space-x-2 text-red-500 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.firstName}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleChange}
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && (
                        <div className="flex items-center space-x-2 text-red-500 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.lastName}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-500" />
                      <Input 
                        id="email" 
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        className={`flex-1 ${errors.email ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.email && (
                      <div className="flex items-center space-x-2 text-red-500 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-slate-500" />
                      <Input 
                        id="phoneNumber" 
                        name="phoneNumber"
                        value={profileData.phoneNumber}
                        onChange={handleChange}
                        className={`flex-1 ${errors.phoneNumber ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <div className="flex items-center space-x-2 text-red-500 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.phoneNumber}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-slate-500 mt-3" />
                      <Textarea 
                        id="address" 
                        name="address"
                        value={profileData.address}
                        onChange={handleChange}
                        className="flex-1" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Preferred Language</Label>
                    <Select 
                      value={profileData.language}
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
                    <Label>Account Type</Label>
                    <div className="flex gap-4">
                      <Button
                        variant={userType === "sme" ? "default" : "outline"}
                        onClick={() => handleUserTypeChange("sme")}
                        className="flex-1"
                      >
                        <Building className="mr-2 h-4 w-4" />
                        SME
                      </Button>
                      <Button
                        variant={userType === "provider" ? "default" : "outline"}
                        onClick={() => handleUserTypeChange("provider")}
                        className="flex-1"
                      >
                        <Truck className="mr-2 h-4 w-4" />
                        Provider
                      </Button>
                    </div>
                  </div>
                  
                  {renderUserTypeSpecificFields()}
                  
                  <div className="pt-4">
                    <Button 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      {isSubmitting ? "Saving..." : "Save and Continue to Dashboard"}
                    </Button>
                  </div>
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
                        <p className="text-sm text-slate-600">
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
                          <Switch id="quote-sms" />
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
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                    <Input id="confirmNewPassword" type="password" />
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">Update Password</Button>
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
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
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

