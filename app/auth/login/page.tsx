"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Sparkles, ArrowRight, Shield, Zap, Users2 } from "lucide-react"
import { toast } from "react-hot-toast"

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // Handle OAuth callback if coming from Google
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    const userType = urlParams.get('userType')
    const error = urlParams.get('error')

    if (error) {
      toast.error('Login failed. Please try again.')
    } else if (token && userType) {
      // Store auth data
      localStorage.setItem('token', token)
      localStorage.setItem('userType', userType)
      toast.success('Welcome back!')
      router.push('/dashboard')
    }
  }, [router])

  const handleGoogleLogin = async () => {
    setIsSubmitting(true)
    
    try {
      // Redirect to Google OAuth endpoint
      window.location.href = "https://logistics-backend-1-rq78.onrender.com/api/auth/google/login"
      
    } catch (error: any) {
      console.error("Google login error:", error)
      toast.error("Failed to initiate Google login. Please try again.")
      setIsSubmitting(false)
    }
  }

  const features = [
    {
      icon: <Shield className="h-6 w-6 text-[#add64e]" />,
      title: "Secure Access",
      description: "Your account is protected by Google's advanced security"
    },
    {
      icon: <Zap className="h-6 w-6 text-[#add64e]" />,
      title: "Instant Access",
      description: "Jump straight into your logistics dashboard"
    },
    {
      icon: <Users2 className="h-6 w-6 text-[#add64e]" />,
      title: "Trusted Platform",
      description: "Join thousands of logistics professionals"
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
          <div className="w-full max-w-lg">
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
                  Access your LogitrustKenya dashboard with Google
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features Preview */}
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                      <div className="flex-shrink-0 p-2 rounded-lg bg-[#add64e]/10">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                        <p className="text-sm text-white/70 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Google Sign In Button */}
                <Button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isSubmitting}
                  className="w-full bg-white hover:bg-white/90 text-gray-900 font-semibold py-4 shadow-xl hover:shadow-white/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
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
                  {isSubmitting ? "Signing in..." : "Continue with Google"}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>

                {/* Quick Access Info */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-[#add64e]/10 to-[#9bc943]/10 border border-[#add64e]/20 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-2 w-2 bg-[#add64e] rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-white">Quick Access</span>
                  </div>
                  <p className="text-sm text-white/70">
                    Sign in once and stay logged in across all your devices securely.
                  </p>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-white/10">
                  <div className="text-center w-full text-sm text-white/70">
                    New to LogitrustKenya?{" "}
                    <Link
                      href="/auth/signup"
                      className="font-medium text-[#add64e] hover:text-[#9bc943] transition-colors duration-300 inline-flex items-center gap-1"
                    >
                      Create your account
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>

                {/* Help Section */}
                <div className="text-center">
                  <p className="text-xs text-white/50">
                    Having trouble signing in?{" "}
                    <Link href="/support" className="text-[#add64e] hover:text-[#9bc943] transition-colors">
                      Get help
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}