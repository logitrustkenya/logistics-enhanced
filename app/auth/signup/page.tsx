"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Building, Sparkles, Shield, Clock, Users } from "lucide-react"
import { toast } from "react-hot-toast"

interface UserTypeData {
  userType: string
}

export default function SignupPage() {
  const [selectedUserType, setSelectedUserType] = useState<string>("sme")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // Load Google Identity Services on component mount
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    // Cleanup
    return () => {
      const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]')
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript)
      }
    }
  }, [])

  const handleUserTypeChange = (userType: string) => {
    setSelectedUserType(userType)
  }

  const handleGoogleSignup = async () => {
    setIsSubmitting(true)
    
    try {
      // Store user type for after Google auth completes
      localStorage.setItem("pendingUserType", selectedUserType)
      
      // Use Google Identity Services (modern approach)
      if (typeof window !== 'undefined' && window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID",
          callback: handleGoogleCallback,
        })
        
        window.google.accounts.id.prompt()
      } else {
        // Fallback: Load Google Identity Services
        loadGoogleIdentityServices()
      }
      
    } catch (error: any) {
      console.error("Google signup error:", error)
      toast.error("Failed to initiate Google signup. Please try again.")
      setIsSubmitting(false)
    }
  }

  const loadGoogleIdentityServices = () => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID",
        callback: handleGoogleCallback,
      })
      window.google.accounts.id.prompt()
    }
    document.head.appendChild(script)
  }

  const handleGoogleCallback = async (response: any) => {
    try {
      const userType = localStorage.getItem("pendingUserType") || selectedUserType
      
      // Send the Google credential to your existing backend
      const backendResponse = await fetch("https://logistics-backend-1-rq78.onrender.com/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          googleCredential: response.credential,
          userType: userType,
          authMethod: "google"
        }),
      })

      const data = await backendResponse.json()

      if (backendResponse.ok) {
        localStorage.removeItem("pendingUserType")
        localStorage.setItem("userType", userType)
        localStorage.setItem("token", data.token || "authenticated")
        
        toast.success("Account created successfully!")
        router.push("/profile")
      } else {
        throw new Error(data.message || "Signup failed")
      }
      
    } catch (error: any) {
      console.error("Google callback error:", error)
      toast.error(error.message || "Signup failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

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

  const benefits = [
    {
      icon: <Clock className="h-5 w-5 text-[#add64e]" />,
      title: "Quick Setup",
      description: "Get started in seconds with Google"
    },
    {
      icon: <Shield className="h-5 w-5 text-[#add64e]" />,
      title: "Secure & Trusted",
      description: "Protected by Google's security"
    },
    {
      icon: <Users className="h-5 w-5 text-[#add64e]" />,
      title: "Join Our Community",
      description: "Connect with logistics professionals"
    }
  ]

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
                  Get Started
                </CardTitle>
                <CardDescription className="text-white/70 text-base">
                  Choose your account type and sign up with Google
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Account Type Selection */}
                <div className="space-y-4">
                  <h3 className="text-white font-medium text-center">I am a:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      variant={selectedUserType === "sme" ? "default" : "outline"}
                      onClick={() => handleUserTypeChange("sme")}
                      className={`h-auto p-4 flex flex-col items-center gap-3 ${
                        selectedUserType === "sme" 
                          ? "bg-[#add64e] text-black hover:bg-[#9bc943]" 
                          : "border-white/20 text-white hover:bg-white/5"
                      }`}
                    >
                      <Building className="h-8 w-8" />
                      <div className="text-center">
                        <div className="font-semibold">SME</div>
                        <div className="text-xs opacity-80 mt-1">Business Owner</div>
                      </div>
                    </Button>
                    <Button
                      type="button"
                      variant={selectedUserType === "provider" ? "default" : "outline"}
                      onClick={() => handleUserTypeChange("provider")}
                      className={`h-auto p-4 flex flex-col items-center gap-3 ${
                        selectedUserType === "provider" 
                          ? "bg-[#add64e] text-black hover:bg-[#9bc943]" 
                          : "border-white/20 text-white hover:bg-white/5"
                      }`}
                    >
                      <Truck className="h-8 w-8" />
                      <div className="text-center">
                        <div className="font-semibold">Provider</div>
                        <div className="text-xs opacity-80 mt-1">Service Provider</div>
                      </div>
                    </Button>
                  </div>
                  <p className="text-sm text-white/60 text-center">
                    {getUserTypeDescription(selectedUserType)}
                  </p>
                </div>

                {/* Benefits Section */}
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                      {benefit.icon}
                      <div>
                        <div className="text-sm font-medium text-white">{benefit.title}</div>
                        <div className="text-xs text-white/70">{benefit.description}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Google Sign Up Button */}
                <Button
                  type="button"
                  onClick={handleGoogleSignup}
                  disabled={isSubmitting}
                  className="w-full bg-white hover:bg-white/90 text-gray-900 font-semibold py-4 shadow-xl hover:shadow-white/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
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
                  {isSubmitting ? "Setting up..." : "Continue with Google"}
                </Button>

                {/* Terms */}
                <div className="text-center">
                  <p className="text-xs text-white/60 leading-relaxed">
                    By continuing, you agree to our{" "}
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
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
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