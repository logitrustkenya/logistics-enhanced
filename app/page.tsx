"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Truck, Menu, X, Sparkles, MapPin, Phone, Instagram, Shield, CheckCircle, AlertTriangle } from "lucide-react"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const judySteps = [
    {
      title: "The Problem",
      icon: AlertTriangle,
      content: "Judy runs a cosmetic shop in Nairobi. She takes orders via Instagram and WhatsApp — but her rider sometimes ghosts her, and scammers are a weekly headache.",
      color: "from-red-500/20 to-orange-500/20",
      iconColor: "text-red-400"
    },
    {
      title: "Step 1: Easy Setup",
      icon: MapPin,
      content: "She simply inputs pickup & delivery details on LogiTrust's platform.",
      color: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400"
    },
    {
      title: "Step 2: Secure Payment",
      icon: Shield,
      content: "Buyer pays securely via M-Pesa integration with built-in escrow protection.",
      color: "from-[#add64e]/20 to-[#9bc943]/20",
      iconColor: "text-[#add64e]"
    },
    {
      title: "Step 3: Guaranteed Delivery",
      icon: CheckCircle,
      content: "Rider is paid only after delivery is confirmed. No more ghosted deliveries. No more scams. Just trust, built in.",
      color: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-400"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % judySteps.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Truck className="h-7 w-7 text-[#add64e]" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-[#add64e] rounded-full animate-pulse"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              LogitrustKenya
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <a
              href="#judy-story"
              className="text-sm font-medium text-white/70 hover:text-[#add64e] transition-all duration-300 hover:scale-105"
            >
              How It Works
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/auth/login"
              className="text-sm font-medium text-white/70 hover:text-[#add64e] transition-all duration-300"
            >
              Log in
            </a>
            <a href="/auth/signup">
              <Button className="bg-gradient-to-r from-[#add64e] to-[#9bc943] hover:from-[#9bc943] hover:to-[#add64e] text-black font-semibold shadow-lg hover:shadow-[#add64e]/25 transition-all duration-300 hover:scale-105">
                Sign up
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white/70 hover:text-[#add64e] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-background/95 backdrop-blur-xl">
            <div className="container py-6 space-y-4">
              <nav className="flex flex-col space-y-3">
                <a
                  href="#judy-story"
                  className="text-sm font-medium text-white/70 hover:text-[#add64e] transition-colors py-2"
                >
                  How It Works
                </a>
              </nav>
              <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
                <a
                  href="/auth/login"
                  className="text-sm font-medium text-white/70 hover:text-[#add64e] transition-colors py-2"
                >
                  Log in
                </a>
                <a href="/auth/signup" className="block">
                  <Button className="w-full bg-gradient-to-r from-[#add64e] to-[#9bc943] hover:from-[#9bc943] hover:to-[#add64e] text-black font-semibold">
                    Sign up
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-40 xl:py-48 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[#add64e]/5"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(173,214,78,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(173,214,78,0.05),transparent_50%)]"></div>

          <div className="container relative px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#add64e]/10 border border-[#add64e]/20 backdrop-blur-sm">
                    <Sparkles className="h-4 w-4 text-[#add64e]" />
                    <span className="text-sm font-medium text-[#add64e]">Blockchain-Powered Platform</span>
                  </div>

                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl/none">
                    <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                      Streamline
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-[#add64e] to-[#9bc943] bg-clip-text text-transparent">
                      Logistics
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                      for SMEs
                    </span>
                  </h1>

                  <p className="max-w-[600px] text-lg text-white/70 leading-relaxed">
                    Connect with trusted logistics providers, track shipments in real-time, and reduce costs with our
                    innovative blockchain-powered platform designed for Kenyan businesses.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <a href="/auth/signup">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#add64e] to-[#9bc943] hover:from-[#9bc943] hover:to-[#add64e] text-black font-semibold shadow-xl hover:shadow-[#add64e]/25 transition-all duration-300 hover:scale-105 group"
                    >
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                  <a href="#judy-story">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/5 hover:border-[#add64e]/50 transition-all duration-300 bg-transparent"
                    >
                      See How It Works
                    </Button>
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-lg">
                  {/* Enhanced Blob Animations */}
                  <div className="absolute top-0 -left-4 w-80 h-80 bg-gradient-to-r from-[#add64e]/20 to-[#9bc943]/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                  <div className="absolute top-0 -right-4 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                  <div className="absolute -bottom-8 left-20 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

                  {/* Modern Card Design */}
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#add64e]/20 rounded-xl">
                          <Truck className="h-6 w-6 text-[#add64e]" />
                        </div>
                        <div>
                          <span className="font-semibold text-white">Shipment #12345</span>
                          <div className="text-xs text-white/60">Live Tracking</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white/70">Status</span>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 bg-[#add64e] rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-[#add64e]">In Transit</span>
                          </div>
                        </div>

                        <div className="relative">
                          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                            <div className="bg-gradient-to-r from-[#add64e] to-[#9bc943] h-3 rounded-full w-3/4 relative">
                              <div className="absolute right-0 top-0 h-full w-4 bg-white/30 rounded-full animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-white/70">
                        <MapPin className="h-4 w-4 text-[#add64e]" />
                        <span>Nairobi → Mombasa</span>
                        <div className="ml-auto text-xs bg-[#add64e]/20 px-2 py-1 rounded-full text-[#add64e]">
                          2h 30m
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Judy's Story Section */}
        <section id="judy-story" className="relative w-full py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-white/5"></div>

          <div className="container relative px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center mb-16">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#add64e]/10 border border-[#add64e]/20">
                  <div className="h-2 w-2 bg-[#add64e] rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-[#add64e]">Real Stories, Real Solutions</span>
                </div>

                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    Meet Judy: From
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-[#add64e] to-[#9bc943] bg-clip-text text-transparent">
                    Scams to Success
                  </span>
                </h2>

                <p className="max-w-[800px] text-lg text-white/70 leading-relaxed">
                  See how LogiTrust transformed a small business owner's delivery nightmares into seamless operations.
                </p>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-96 md:h-80 flex items-center justify-center">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 left-4">
                        <Instagram className="h-8 w-8 text-pink-400" />
                      </div>
                      <div className="absolute top-4 right-4">
                        <Phone className="h-8 w-8 text-green-400" />
                      </div>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <Truck className="h-12 w-12 text-[#add64e]" />
                      </div>
                    </div>

                    {/* Step indicators */}
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {judySteps.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-500 ${
                            index === currentStep ? 'bg-[#add64e] w-8' : 'bg-white/30'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Main content area */}
                    <div className="relative z-10 p-8 text-center max-w-2xl">
                      <div className="space-y-6">
                        {/* Icon */}
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${judySteps[currentStep].color} transition-all duration-500`}>
                          {React.createElement(judySteps[currentStep].icon, {
                            className: `h-8 w-8 ${judySteps[currentStep].iconColor} transition-colors duration-500`
                          })}
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-white transition-all duration-500">
                          {judySteps[currentStep].title}
                        </h3>

                        {/* Content */}
                        <p className="text-lg text-white/80 leading-relaxed transition-all duration-500">
                          {judySteps[currentStep].content}
                        </p>

                        {/* Progress dots for manual navigation */}
                        <div className="flex justify-center gap-3 pt-4">
                          {judySteps.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentStep(index)}
                              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                                index === currentStep 
                                  ? 'bg-[#add64e] shadow-lg shadow-[#add64e]/50' 
                                  : 'bg-white/30 hover:bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Animated background elements */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-[#add64e]/10 to-transparent rounded-full animate-pulse"></div>
                      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-l from-[#9bc943]/10 to-transparent rounded-full animate-pulse animation-delay-2000"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trust indicators */}
              <div className="mt-12 text-center">
                <p className="text-[#add64e] font-semibold mb-4">LogiTrust gives her peace of mind</p>
                <div className="flex flex-wrap justify-center gap-8 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-[#add64e]" />
                    <span>No more ghosted deliveries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#add64e]" />
                    <span>No more scams</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#add64e]" />
                    <span>Just trust, built in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative w-full py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#add64e] via-[#9bc943] to-[#add64e] opacity-90"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]"></div>

          <div className="container relative px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-black">
                  Ready to Transform Your Logistics?
                </h2>
                <p className="max-w-[700px] text-lg text-black/80 leading-relaxed">
                  Join thousands of SMEs and logistics providers who are already revolutionizing their operations with
                  LogitrustKenya.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a href="/auth/signup">
                  <Button
                    size="lg"
                    className="bg-black text-white hover:bg-black/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <a href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-black/20 text-black hover:bg-black/5 hover:border-black/40 transition-all duration-300 bg-transparent"
                  >
                    Contact Sales
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative w-full border-t border-white/10 bg-gradient-to-b from-background to-background/80 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-6 lg:col-span-2">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Truck className="h-8 w-8 text-[#add64e]" />
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-[#add64e] rounded-full animate-pulse"></div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  LogitrustKenya
                </span>
              </div>
              <p className="text-white/70 leading-relaxed max-w-md">
                Connecting SMEs with reliable logistics providers for seamless delivery experiences across Kenya through
                innovative blockchain technology.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/contact"
                    className="text-white/70 hover:text-[#add64e] transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/help"
                    className="text-white/70 hover:text-[#add64e] transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-white/60">&copy; 2025 LogitrustKenya. All rights reserved.</p>

            <div className="flex items-center gap-6">
              {[
                {
                  href: "#",
                  icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
                  label: "Facebook",
                },
                {
                  href: "#",
                  icon: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
                  label: "Twitter",
                },
               
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-white/60 hover:text-[#add64e] transition-all duration-300 hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={social.icon}></path>
                  </svg>
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
