"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
  import axios from "axios"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Truck, AlertCircle, CheckCircle, Sparkles, Building } from "lucide-react"
import { toast } from "react-hot-toast"

interface FormData {
  email: string
  password: string
  confirmPassword: string
  userType: string
  agreeTerms: boolean
}

interface ValidationErrors {
  email?: string
  password?: string
  confirmPassword?: string
  userType?: string
  general?: string
}

export default function SignupPage() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    userType: "sme",
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

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    // Validate password length
    if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long"
    }

    // Validate password match
    if (!validateConfirmPassword(formData.password, formData.confirmPassword)) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.userType) {
      newErrors.userType = "Please select an account type"
    }

    if (!formData.agreeTerms) {
      newErrors.general = "You must agree to the terms and conditions"
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
    if (name === "password" || name === "confirmPassword" || name === "email") {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
        general: undefined,
      }))
    }
  }

  const handleUserTypeChange = (userType: string) => {
    setFormData({
      ...formData,
      userType,
    })
    
    // Clear userType error when user selects
    if (errors.userType) {
      setErrors((prev) => ({
        ...prev,
        userType: undefined,
      }))
    }
  }

// Next.js router for navigation
const router = useRouter();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)

  if (!validateForm()) {
    setIsSubmitting(false)
    return
  }

  try {
    const response = await axios.post("https://logistics-backend-1-rq78.onrender.com/api/signup", {
      email: formData.email,
      password: formData.password,
      userType: formData.userType,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // If your backend uses cookies/sessions
    })

    if (response.status === 200 || response.status === 201) {
      toast.success("Signup successful!")
      console.log("Signup successful:", response.data)
      router.push("/auth/login")
    }
    
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const serverErrors = error.response?.data?.errors
      const generalError = error.response?.data?.message || "Signup failed"

      if (serverErrors) {
        setErrors(serverErrors)
      } else {
        setErrors({ general: generalError })
      }
    } else {
      setErrors({ general: "An unexpected error occurred." })
    }
  } finally {
    setIsSubmitting(false)
  }
}

  
  const getPasswordValidationStatus = () => {
    const isValidLength = validatePassword(formData.password)
    const isMatching = validateConfirmPassword(formData.password, formData.confirmPassword)

    return {
      lengthValid: isValidLength,
      matchValid: isMatching,
      showValidation: formData.password.length > 0 || formData.confirmPassword.length > 0,
    }
  }

  const passwordValidation = getPasswordValidationStatus()

  const getUserTypeDescription = (type: string) => {
    switch (type) {
      case "sme":
        return "I need logistics services for my business"
      case "provider":
        return "I provide logistics services to businesses"
      default:
        return ""
    }
  }

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
          <div className="w-full max-w-md">
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
                  Sign up to get started with your logistics journey
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Display general error */}
                  {errors.general && (
                    <div className="flex items-center space-x-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3 backdrop-blur-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.general}</span>
                    </div>
                  )}

                  {/* Account Type Selection */}
                  <div className="space-y-3">
                    <Label className="text-white font-medium">I am a:</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant={formData.userType === "sme" ? "default" : "outline"}
                        onClick={() => handleUserTypeChange("sme")}
                        className={`h-auto p-4 flex flex-col items-center gap-2 ${
                          formData.userType === "sme" 
                            ? "bg-[#add64e] text-black hover:bg-[#9bc943]" 
                            : "border-white/20 text-white hover:bg-white/5"
                        }`}
                      >
                        <Building className="h-6 w-6" />
                        <div className="text-center">
                          <div className="font-semibold">SME</div>
                          <div className="text-xs opacity-80">Business Owner</div>
                        </div>
                      </Button>
                      <Button
                        type="button"
                        variant={formData.userType === "provider" ? "default" : "outline"}
                        onClick={() => handleUserTypeChange("provider")}
                        className={`h-auto p-4 flex flex-col items-center gap-2 ${
                          formData.userType === "provider" 
                            ? "bg-[#add64e] text-black hover:bg-[#9bc943]" 
                            : "border-white/20 text-white hover:bg-white/5"
                        }`}
                      >
                        <Truck className="h-6 w-6" />
                        <div className="text-center">
                          <div className="font-semibold">Provider</div>
                          <div className="text-xs opacity-80">Service Provider</div>
                        </div>
                      </Button>
                    </div>
                    {errors.userType && (
                      <div className="flex items-center space-x-2 text-red-400 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.userType}</span>
                      </div>
                    )}
                    <p className="text-xs text-white/60 text-center">
                      {getUserTypeDescription(formData.userType)}
                    </p>
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
                      className={`bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#add64e] focus:ring-[#add64e] backdrop-blur-sm transition-all duration-300 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.email && (
                      <div className="flex items-center space-x-2 text-red-400 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>

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
                    {isSubmitting ? "Creating Account..." : "Create Account"}
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
