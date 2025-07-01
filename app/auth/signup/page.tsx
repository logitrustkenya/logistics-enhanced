"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Truck, AlertCircle, CheckCircle, Sparkles } from "lucide-react"

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

  // Individual user specific fields
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
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
        general: undefined,
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
      await new Promise((resolve) => setTimeout(resolve, 1000))

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
      showValidation: formData.password.length > 0 || formData.confirmPassword.length > 0,
    }
  }

  const renderUserTypeSpecificFields = () => {
    switch (userType) {
      case "sme":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-white font-medium">
                Company/Business Name
              </Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName || ""}
                onChange={handleChange}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#add64e] focus:ring-[#add64e] backdrop-blur-sm transition-all duration-300"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyType" className="text-white font-medium">
                Company/Business Type
              </Label>
              <Select
                value={formData.companyType || ""}
                onValueChange={(value) => handleSelectChange("companyType", value)}
              >
                <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-[#add64e] focus:ring-[#add64e] backdrop-blur-sm">
                  <SelectValue placeholder="Select type" className="text-white/50" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900/95 border-white/20 backdrop-blur-xl">
                  <SelectItem value="retail" className="text-white hover:bg-white/10 focus:bg-white/10">
                    Retail
                  </SelectItem>
                  <SelectItem value="manufacturing" className="text-white hover:bg-white/10 focus:bg-white/10">
                    Manufacturing
                  </SelectItem>
                  <SelectItem value="agriculture" className="text-white hover:bg-white/10 focus:bg-white/10">
                    Agriculture
                  </SelectItem>
                  <SelectItem value="technology" className="text-white hover:bg-white/10 focus:bg-white/10">
                    Technology
                  </SelectItem>
                  <SelectItem value="services" className="text-white hover:bg-white/10 focus:bg-white/10">
                    Services
                  </SelectItem>
                  <SelectItem value="other" className="text-white hover:bg-white/10 focus:bg-white/10">
                    Other
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessRegistration" className="text-white font-medium">
                Business Registration Number
              </Label>
              <Input
                id="businessRegistration"
                name="businessRegistration"
                value={formData.businessRegistration || ""}
                onChange={handleChange}
                placeholder="Enter registration number"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#add64e] focus:ring-[#add64e] backdrop-blur-sm transition-all duration-300"
              />
            </div>
          </>
        )

      case "courier":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="courierCompanyName" className="text-white font-medium">
                Company Name
              </Label>
              <Input
                id="courierCompanyName"
                name="courierCompanyName"
                value={formData.courierCompanyName || ""}
                onChange={handleChange}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#add64e] focus:ring-[#add64e] backdrop-blur-sm transition-all duration-300"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceType" className="text-white font-medium">
                Service Type
              </Label>
              <Select
                value={formData.serviceType || ""}
                onValueChange={(value) => handleSelectChange("serviceType", value)}
              >
                <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-[#add64e] focus:ring-[#add64e] backdrop-blur-sm">
                  <SelectValue placeholder="Select service type" className="text-white/50" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900/95 border-white/20 backdrop-blur-xl">
                  <SelectItem value="logistics" className="text-white hover:bg-white/10 focus:bg-white/10">
                    Logistics
                  </SelectItem>
                  <SelectItem value="warehousing" className="text-white hover:bg-white/10 focus:bg-white/10">
                    Warehousing
                  </SelectItem>
                  <SelectItem value="freight" className="text-white hover:bg-white/10 focus:bg-white/10">
                    Freight Forwarding
                  </SelectItem>
                  <SelectItem value="customs" className="text-white hover:bg-white/10 focus:bg-white/10">
                    Customs Clearance
                  </SelectItem>
                  <SelectItem value="packaging" className="text-white hover:bg-white/10 focus:bg-white/10">
                    Packaging
                  </SelectItem>
                  <SelectItem value="other" className="text-white hover:bg-white/10 focus:bg-white/10">
                    Other
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseNumber" className="text-white font-medium">
                License Number
              </Label>
              <Input
                id="licenseNumber"
                name="licenseNumber"
                value={formData.licenseNumber || ""}
                onChange={handleChange}
                placeholder="Professional license number"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#add64e] focus:ring-[#add64e] backdrop-blur-sm transition-all duration-300"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-white font-medium">
                Years of Experience
              </Label>
              <Select
                value={formData.experience || ""}
                onValueChange={(value) => handleSelectChange("experience", value)}
              >
                <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-[#add64e] focus:ring-[#add64e] backdrop-blur-sm">
                  <SelectValue placeholder="Select experience" className="text-white/50" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900/95 border-white/20 backdrop-blur-xl">
                  <SelectItem value="0-2" className="text-white hover:bg-white/10 focus:bg-white/10">
                    0-2 years
                  </SelectItem>
                  <SelectItem value="3-5" className="text-white hover:bg-white/10 focus:bg-white/10">
                    3-5 years
                  </SelectItem>
                  <SelectItem value="6-10" className="text-white hover:bg-white/10 focus:bg-white/10">
                    6-10 years
                  </SelectItem>
                  <SelectItem value="10+" className="text-white hover:bg-white/10 focus:bg-white/10">
                    10+ years
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverage" className="text-white font-medium">
                Service Coverage Area
              </Label>
              <Input
                id="coverage"
                name="coverage"
                value={formData.coverage || ""}
                onChange={handleChange}
                placeholder="e.g., Nairobi, Kenya, East Africa"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#add64e] focus:ring-[#add64e] backdrop-blur-sm transition-all duration-300"
                required
              />
            </div>
          </>
        )

      case "user":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="driverLicense" className="text-white font-medium">
                Driver's License Number (Optional)
              </Label>
              <Input
                id="driverLicense"
                name="driverLicense"
                value={formData.driverLicense || ""}
                onChange={handleChange}
                placeholder="Enter license number"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#add64e] focus:ring-[#add64e] backdrop-blur-sm transition-all duration-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleType" className="text-white font-medium">
                Vehicle Type (Optional)
              </Label>
              <Select
                value={formData.vehicleType || ""}
                onValueChange={(value) => handleSelectChange("vehicleType", value)}
              >
                <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-[#add64e] focus:ring-[#add64e] backdrop-blur-sm">
                  <SelectValue placeholder="Select vehicle type" className="text-white/50" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900/95 border-white/20 backdrop-blur-xl">
                  <SelectItem value="motorcycle" className="text-white hover:bg-white/10 focus:bg-white/10">
                    Motorcycle
                  </SelectItem>
                  <SelectItem value="car" className="text-white hover:bg-white/10 focus:bg-white/10">
                    Car
                  </SelectItem>
                  <SelectItem value="van" className="text-white hover:bg-white/10 focus:bg-white/10">
                    Van
                  </SelectItem>
                  <SelectItem value="pickup" className="text-white hover:bg-white/10 focus:bg-white/10">
                    Pickup Truck
                  </SelectItem>
                  <SelectItem value="truck" className="text-white hover:bg-white/10 focus:bg-white/10">
                    Truck
                  </SelectItem>
                  <SelectItem value="bicycle" className="text-white hover:bg-white/10 focus:bg-white/10">
                    Bicycle
                  </SelectItem>
                  <SelectItem value="none" className="text-white hover:bg-white/10 focus:bg-white/10">
                    No Vehicle
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleRegistration" className="text-white font-medium">
                Vehicle Registration Number (Optional)
              </Label>
              <Input
                id="vehicleRegistration"
                name="vehicleRegistration"
                value={formData.vehicleRegistration || ""}
                onChange={handleChange}
                placeholder="e.g., KAA 123A"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#add64e] focus:ring-[#add64e] backdrop-blur-sm transition-all duration-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="insuranceNumber" className="text-white font-medium">
                Insurance Policy Number (Optional)
              </Label>
              <Input
                id="insuranceNumber"
                name="insuranceNumber"
                value={formData.insuranceNumber || ""}
                onChange={handleChange}
                placeholder="Vehicle insurance number"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#add64e] focus:ring-[#add64e] backdrop-blur-sm transition-all duration-300"
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
      case "sme":
        return "Small & Medium Enterprise"
      case "user":
        return "Individual User"
      case "courier":
        return "Logistics Provider"
      default:
        return "User"
    }
  }

  const passwordValidation = getPasswordValidationStatus()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-[#add64e]/5 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <Truck className="h-7 w-7 text-[#add64e]" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-[#add64e] rounded-full animate-pulse"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              LogitrustKenya
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-white/70">Already have an account?</span>
            <Link href="/auth/login">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5 hover:border-[#add64e]/50 transition-all duration-300 bg-transparent"
              >
                Sign in
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
          <div className="w-full max-w-lg">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
              <CardHeader className="space-y-1 text-center pb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#add64e]/10 border border-[#add64e]/20 backdrop-blur-sm mx-auto mb-4">
                  <Sparkles className="h-4 w-4 text-[#add64e]" />
                  <span className="text-sm font-medium text-[#add64e]">Join LogitrustKenya</span>
                </div>

                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Create Account
                </CardTitle>
                <CardDescription className="text-white/70 text-base">
                  Sign up as a {getUserTypeTitle(userType)}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="sme" className="w-full mb-6" onValueChange={setUserType}>
                  <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/20 backdrop-blur-sm">
                    <TabsTrigger
                      value="sme"
                      className="data-[state=active]:bg-[#add64e] data-[state=active]:text-black text-white/70"
                    >
                      SME
                    </TabsTrigger>
                    <TabsTrigger
                      value="sme"
                      className="data-[state=active]:bg-[#add64e] data-[state=active]:text-black text-white/70"
                    >
                      User
                    </TabsTrigger>
                    <TabsTrigger
                      value="user"
                      className="data-[state=active]:bg-[#add64e] data-[state=active]:text-black text-white/70"
                    >
                      Provider
                    </TabsTrigger>
                  <TabsTrigger
                      value="providers"
                      className="data-[state=active]:bg-[#add64e] data-[state=active]:text-black text-white/70"
                    ></TabsTrigger>
                  
                </TabsList>
                </Tabs>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Display general error */}
                  {errors.general && (
                    <div className="flex items-center space-x-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3 backdrop-blur-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.general}</span>
                    </div>
                  )}

                  {/* Common fields for all user types */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-white font-medium">
                        First name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#add64e] focus:ring-[#add64e] backdrop-blur-sm transition-all duration-300"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-white font-medium">
                        Last name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#add64e] focus:ring-[#add64e] backdrop-blur-sm transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#add64e] focus:ring-[#add64e] backdrop-blur-sm transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-white font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#add64e] focus:ring-[#add64e] backdrop-blur-sm transition-all duration-300"
                      required
                    />
                  </div>

                  {/* User type specific fields */}
                  {renderUserTypeSpecificFields()}

                  {/* Password fields with validation */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white font-medium">
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#add64e] focus:ring-[#add64e] backdrop-blur-sm transition-all duration-300 ${
                        errors.password ? "border-red-500" : ""
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
                          <CheckCircle className="h-4 w-4 text-[#add64e]" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-400" />
                        )}
                        <span className={passwordValidation.lengthValid ? "text-[#add64e]" : "text-red-400"}>
                          At least 8 characters
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white font-medium">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#add64e] focus:ring-[#add64e] backdrop-blur-sm transition-all duration-300 ${
                        errors.confirmPassword ? "border-red-500" : ""
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
                          <CheckCircle className="h-4 w-4 text-[#add64e]" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-400" />
                        )}
                        <span className={passwordValidation.matchValid ? "text-[#add64e]" : "text-red-400"}>
                          Passwords match
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Terms and conditions */}
                  <div className="flex items-start space-x-3 pt-2">
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
                      className="border-white/30 data-[state=checked]:bg-[#add64e] data-[state=checked]:border-[#add64e] data-[state=checked]:text-black mt-1"
                      required
                    />
                    <label htmlFor="agreeTerms" className="text-sm leading-relaxed text-white/70 cursor-pointer">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-[#add64e] hover:text-[#9bc943] transition-colors duration-300 font-medium"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-[#add64e] hover:text-[#9bc943] transition-colors duration-300 font-medium"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#add64e] to-[#9bc943] hover:from-[#9bc943] hover:to-[#add64e] text-black font-semibold shadow-xl hover:shadow-[#add64e]/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? "Creating Account..." : `Create ${getUserTypeTitle(userType)} Account`}
                  </Button>
                </form>

                <div className="pt-6">
                  <div className="text-center w-full text-sm text-white/70">
                    Already have an account?{" "}
                    <Link
                      href="/auth/login"
                      className="font-medium text-[#add64e] hover:text-[#9bc943] transition-colors duration-300"
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

