"use client"

import type React from "react"
import { useState } from "react"
  import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Truck, Eye, EyeOff, AlertCircle, Sparkles } from "lucide-react"

interface LoginFormData {
  email: string
  password: string
}

interface ValidationErrors {
  email?: string
  password?: string
  general?: string
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear errors when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
        general: undefined,
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

const router = useRouter()

const handleSubmit = async (e?: React.MouseEvent | React.KeyboardEvent) => {
  if (e) e.preventDefault()
  setIsSubmitting(true)

  if (!validateForm()) {
    setIsSubmitting(false)
    return
  }

  try {
    const response = await axios.post("https://logistics-backend-1-rq78.onrender.com/api/login", formData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })

        if (response) {
          console.log("Login successful:", response.data)
          //toaster ----ow success message 
          const userType = response.data.user.userType
          localStorage.setItem("userType", userType)
          if (userType === 'admin') {
            router.push("/dashboard/admin")
          }
          else if (userType === 'sme') {
            router.push("/dashboard/sme")
          } 

          else if (userType === 'sme') {
            router.push("/dashboard/provider")
          } 
          else if (userType === 'user') {
            router.push("/dashboard/user")
          } else {
              router.push("/")
            }
    }
  } catch (error: any) {
    if (error.response && error.response.data?.message) {
      setErrors({ general: error.response.data.message })
    } else {
      setErrors({ general: "Invalid email or password. Please try again." })
    }
  } finally {
    setIsSubmitting(false)
  }
}


  

  const handleGoogleSignIn = () => {
    // Handle Google sign in logic
    console.log("Google sign in clicked")
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
            <span className="text-sm text-white/70">Don't have an account?</span>
            <Link href="/auth/signup">
              <Button className="bg-gradient-to-r from-[#add64e] to-[#9bc943] hover:from-[#9bc943] hover:to-[#add64e] text-black font-semibold shadow-lg hover:shadow-[#add64e]/25 transition-all duration-300 hover:scale-105">
                Sign up
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
                  <span className="text-sm font-medium text-[#add64e]">Welcome Back</span>
                </div>

                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Sign In
                </CardTitle>
                <CardDescription className="text-white/70 text-base">
                  Access your LogitrustKenya dashboard
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Social Login Button */}
                <Button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-medium border border-white/20 hover:border-[#add64e]/50 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full bg-white/20" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-gradient-to-br from-white/10 to-white/5 px-3 py-1 text-white/60 rounded-full backdrop-blur-sm">
                      or continue with email
                    </span>
                  </div>
                </div>

                {/* Login Form */}
                <div className="space-y-4">
                  {/* Display general error */}
                  {errors.general && (
                    <div className="flex items-center space-x-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3 backdrop-blur-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.general}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@company.com"
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

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#add64e] focus:ring-[#add64e] backdrop-blur-sm transition-all duration-300 pr-10 ${
                          errors.password ? "border-red-500" : ""
                        }`}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white/80 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <div className="flex items-center space-x-2 text-red-400 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.password}</span>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#add64e] to-[#9bc943] hover:from-[#9bc943] hover:to-[#add64e] text-black font-semibold shadow-xl hover:shadow-[#add64e]/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
