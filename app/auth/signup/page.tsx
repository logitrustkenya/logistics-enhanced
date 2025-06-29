"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Truck, AlertCircle, CheckCircle } from "lucide-react"

interface FormData {
  // Common fields
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  agreeTerms: boolean
  
  // SME specific fields
  companyName?: string
  companyType?: string
  businessRegistration?: string
  
  // Courier specific fields
  courierCompanyName?: string
  serviceType?: string
  licenseNumber?: string
  experience?: string
  coverage?: string
  
  // Delivery specific fields
  driverLicense?: string
  vehicleType?: string
  vehicleRegistration?: string
  insuranceNumber?: string
}

interface ValidationErrors {
  password?: string
  confirmPassword?: string
  general?: string
}

export default function SignupPage() {
  const [userType, setUserType] = useState("sme")
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    agreeTerms: false,
  })
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Password validation function
  const validatePassword = (password: string): boolean => {
    return password.length >= 8
  }

  // Confirm password validation function
  const validateConfirmPassword = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword && confirmPassword.length > 0
  }

  // Complete form validation function
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}

    // Validate password length
    if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long"
    }

    // Validate password match
    if (!validateConfirmPassword(formData.password, formData.confirmPassword)) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear specific errors when user starts typing
    if (name === "password" || name === "confirmPassword") {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
        general: undefined
      }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!validateForm()) {
      setIsSubmitting(false)
      return
    }

    try {
      // Handle signup logic here
      console.log({ userType, ...formData })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Success handling would go here
      alert("Account created successfully!")
      
    } catch (error) {
      setErrors({ general: "An error occurred during signup. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Helper function to get password validation status
  const getPasswordValidationStatus = () => {
    const isValidLength = validatePassword(formData.password)
    const isMatching = validateConfirmPassword(formData.password, formData.confirmPassword)
    
    return {
      lengthValid: isValidLength,
      matchValid: isMatching,
      showValidation: formData.password.length > 0 || formData.confirmPassword.length > 0
    }
  }

  const renderUserTypeSpecificFields = () => {
    switch (userType) {
      case "sme":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-white">Company/Business Name</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName || ""}
                onChange={handleChange}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-custom-green focus:ring-custom-green"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyType" className="text-white">Company/Business Type</Label>
              <Select value={formData.companyType || ""} onValueChange={(value) => handleSelectChange("companyType", value)}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white focus:border-custom-green focus:ring-custom-green">
                  <SelectValue placeholder="Select type" className="text-gray-400" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="retail" className="text-white hover:bg-gray-700">Retail</SelectItem>
                  <SelectItem value="manufacturing" className="text-white hover:bg-gray-700">Manufacturing</SelectItem>
                  <SelectItem value="agriculture" className="text-white hover:bg-gray-700">Agriculture</SelectItem>
                  <SelectItem value="technology" className="text-white hover:bg-gray-700">Technology</SelectItem>
                  <SelectItem value="services" className="text-white hover:bg-gray-700">Services</SelectItem>
                  <SelectItem value="other" className="text-white hover:bg-gray-700">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessRegistration" className="text-white">Business Registration Number</Label>
              <Input
                id="businessRegistration"
                name="businessRegistration"
                value={formData.businessRegistration || ""}
                onChange={handleChange}
                placeholder="Enter registration number"
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-custom-green focus:ring-custom-green"
              />
            </div>
          </>
        )
      
      case "courier":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="courierCompanyName" className="text-white">Company Name</Label>
              <Input
                id="courierCompanyName"
                name="courierCompanyName"
                value={formData.courierCompanyName || ""}
                onChange={handleChange}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-lime-400 focus:ring-lime-400"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceType" className="text-white">Service Type</Label>
              <Select value={formData.serviceType || ""} onValueChange={(value) => handleSelectChange("serviceType", value)}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white focus:border-lime-400 focus:ring-lime-400">
                  <SelectValue placeholder="Select service type" className="text-gray-400" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="logistics" className="text-white hover:bg-gray-700">Logistics</SelectItem>
                  <SelectItem value="warehousing" className="text-white hover:bg-gray-700">Warehousing</SelectItem>
                  <SelectItem value="freight" className="text-white hover:bg-gray-700">Freight Forwarding</SelectItem>
                  <SelectItem value="customs" className="text-white hover:bg-gray-700">Customs Clearance</SelectItem>
                  <SelectItem value="packaging" className="text-white hover:bg-gray-700">Packaging</SelectItem>
                  <SelectItem value="other" className="text-white hover:bg-gray-700">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseNumber" className="text-white">License Number</Label>
              <Input
                id="licenseNumber"
                name="licenseNumber"
                value={formData.licenseNumber || ""}
                onChange={handleChange}
                placeholder="Professional license number"
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-lime-400 focus:ring-lime-400"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-white">Years of Experience</Label>
              <Select value={formData.experience || ""} onValueChange={(value) => handleSelectChange("experience", value)}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white focus:border-lime-400 focus:ring-lime-400">
                  <SelectValue placeholder="Select experience" className="text-gray-400" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="0-2" className="text-white hover:bg-gray-700">0-2 years</SelectItem>
                  <SelectItem value="3-5" className="text-white hover:bg-gray-700">3-5 years</SelectItem>
                  <SelectItem value="6-10" className="text-white hover:bg-gray-700">6-10 years</SelectItem>
                  <SelectItem value="10+" className="text-white hover:bg-gray-700">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverage" className="text-white">Service Coverage Area</Label>
              <Input
                id="coverage"
                name="coverage"
                value={formData.coverage || ""}
                onChange={handleChange}
                placeholder="e.g., Nairobi, Kenya, East Africa"
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-lime-400 focus:ring-lime-400"
                required
              />
            </div>
          </>
        )
      
      case "delivery":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="driverLicense" className="text-white">Driver's License Number</Label>
              <Input
                id="driverLicense"
                name="driverLicense"
                value={formData.driverLicense || ""}
                onChange={handleChange}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-lime-400 focus:ring-lime-400"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleType" className="text-white">Vehicle Type</Label>
              <Select value={formData.vehicleType || ""} onValueChange={(value) => handleSelectChange("vehicleType", value)}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white focus:border-lime-400 focus:ring-lime-400">
                  <SelectValue placeholder="Select vehicle type" className="text-gray-400" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="motorcycle" className="text-white hover:bg-gray-700">Motorcycle</SelectItem>
                  <SelectItem value="car" className="text-white hover:bg-gray-700">Car</SelectItem>
                  <SelectItem value="van" className="text-white hover:bg-gray-700">Van</SelectItem>
                  <SelectItem value="pickup" className="text-white hover:bg-gray-700">Pickup Truck</SelectItem>
                  <SelectItem value="truck" className="text-white hover:bg-gray-700">Truck</SelectItem>
                  <SelectItem value="bicycle" className="text-white hover:bg-gray-700">Bicycle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleRegistration" className="text-white">Vehicle Registration Number</Label>
              <Input
                id="vehicleRegistration"
                name="vehicleRegistration"
                value={formData.vehicleRegistration || ""}
                onChange={handleChange}
                placeholder="e.g., KAA 123A"
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-lime-400 focus:ring-lime-400"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="insuranceNumber" className="text-white">Insurance Policy Number</Label>
              <Input
                id="insuranceNumber"
                name="insuranceNumber"
                value={formData.insuranceNumber || ""}
                onChange={handleChange}
                placeholder="Vehicle insurance number"
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-lime-400 focus:ring-lime-400"
                required
              />
            </div>
          </>
        )
      
      default:
        return null
    }
  }

  const getUserTypeTitle = (type: string) => {
    switch (type) {
      case "sme": return "Small & Medium Enterprise"
      case "user": return "User"
      case "courier": return "Delivery Partner"
      default: return "User"
    }
  }

  const passwordValidation = getPasswordValidationStatus()

  return (
    <div className="font-inter flex min-h-screen bg-gray-900">
      {/* Left side - Signup Form */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 shadow-2xl">
        <Card className="w-full max-w-md bg-gray-800 border-gray-600 border-2">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <div className="flex items-center justify-center mb-2">
              <Truck className="h-10 w-10 text-custom-green" />
            </div>
            <CardTitle className="text-4xl font-bold text-white">Register</CardTitle>
            <CardDescription className="text-gray-300 text-lg font-normal">
              Sign up as a {getUserTypeTitle(userType)} with LogitrustKenya
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="sme" className="w-full" onValueChange={setUserType}>
              <TabsList className="grid w-full grid-cols-3 bg-gray-700 border-gray-600">
                <TabsTrigger 
                  value="sme" 
                  className="data-[state=active]:bg-lime-400 data-[state=active]:text-gray-900 text-gray-300 hover:text-white"
                >
                  SME
                </TabsTrigger>
                <TabsTrigger 
                  value="user"
                  className="data-[state=active]:bg-lime-400 data-[state=active]:text-gray-900 text-gray-300 hover:text-white"
                >
                  User
                </TabsTrigger>
                <TabsTrigger 
                  value="courier"
                  className="data-[state=active]:bg-lime-400 data-[state=active]:text-gray-900 text-gray-300 hover:text-white"
                >
                  Courier
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {/* Display general error */}
              {errors.general && (
                <div className="flex items-center space-x-2 text-red-400 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.general}</span>
                </div>
              )}
              
              {/* Common fields for all user types */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">First name</Label>
                  <Input 
                    id="firstName" 
                    name="firstName" 
                    value={formData.firstName} 
                    onChange={handleChange} 
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-lime-400 focus:ring-lime-400"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">Last name</Label>
                  <Input 
                    id="lastName" 
                    name="lastName" 
                    value={formData.lastName} 
                    onChange={handleChange} 
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-lime-400 focus:ring-lime-400"
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-lime-400 focus:ring-lime-400"
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-white">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-lime-400 focus:ring-lime-400"
                  required
                />
              </div>
              
              {/* User type specific fields */}
              {renderUserTypeSpecificFields()}
              
              {/* Password fields with validation */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-lime-400 focus:ring-lime-400 ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                  required
                />
                {errors.password && (
                  <div className="flex items-center space-x-2 text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.password}</span>
                  </div>
                )}
                {passwordValidation.showValidation && (
                  <div className="flex items-center space-x-2 text-sm">
                    {passwordValidation.lengthValid ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-400" />
                    )}
                    <span className={passwordValidation.lengthValid ? 'text-custom-green' : 'text-red-400'}>
                      At least 8 characters
                    </span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-lime-400 focus:ring-lime-400 ${
                    errors.confirmPassword ? 'border-red-500' : ''
                  }`}
                  required
                />
                {errors.confirmPassword && (
                  <div className="flex items-center space-x-2 text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.confirmPassword}</span>
                  </div>
                )}
                {passwordValidation.showValidation && formData.confirmPassword.length > 0 && (
                  <div className="flex items-center space-x-2 text-sm">
                    {passwordValidation.matchValid ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-400" />
                    )}
                    <span className={passwordValidation.matchValid ? 'text-custom-green' : 'text-red-400'}>
                      Passwords match
                    </span>
                  </div>
                )}
              </div>
              
              {/* Terms and conditions */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      agreeTerms: checked as boolean,
                    })
                  }
                  className="border-gray-600 data-[state=checked]:bg-custom-green data-[state=checked]:border-custom-green data-[state=checked]:text-gray-900"
                  required
                />
                <label
                  htmlFor="agreeTerms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-custom-green hover:text-lime-300">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-custom-green hover:text-lime-300">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-custom-green hover:bg-[#9bc943] text-gray-900 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating Account..." : `Create ${getUserTypeTitle(userType)} account`}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-center w-full text-sm text-gray-300">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-custom-green hover:text-lime-300">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      {/* Right side - Logo */}
      <div className="flex-1 bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Truck className="h-16 w-16 text-white mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white">LogitrustKenya</h1>
        </div>
      </div>
    </div>
  )
}
