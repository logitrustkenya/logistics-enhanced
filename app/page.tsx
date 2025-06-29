"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Package, Truck, BarChart3, Shield, MapPin, Leaf, Menu, X, Sparkles } from "lucide-react"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

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
              href="#features"
              className="text-sm font-medium text-white/70 hover:text-[#add64e] transition-all duration-300 hover:scale-105"
            >
              Features
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
                  href="#features"
                  className="text-sm font-medium text-white/70 hover:text-[#add64e] transition-colors py-2"
                >
                  Features
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
                  <a href="#features">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/5 hover:border-[#add64e]/50 transition-all duration-300 bg-transparent"
                    >
                      Explore Features
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

        {/* Features Section */}
        <section id="features" className="relative w-full py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-white/5"></div>

          <div className="container relative px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center mb-16">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#add64e]/10 border border-[#add64e]/20">
                  <div className="h-2 w-2 bg-[#add64e] rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-[#add64e]">Platform Features</span>
                </div>

                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    Everything You Need for
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-[#add64e] to-[#9bc943] bg-clip-text text-transparent">
                    Efficient Logistics
                  </span>
                </h2>

                <p className="max-w-[800px] text-lg text-white/70 leading-relaxed">
                  Our platform connects SMEs with reliable logistics providers, offering transparency, security, and
                  efficiency through cutting-edge technology.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
              {[
                {
                  icon: Package,
                  title: "Smart Shipment Management",
                  description:
                    "Create, track, and manage shipments with AI-powered insights and real-time updates on your deliveries.",
                },
                {
                  icon: Truck,
                  title: "Intelligent Provider Matching",
                  description:
                    "Get matched with the best logistics providers using our advanced algorithm based on your specific requirements.",
                },
                {
                  icon: Shield,
                  title: "Blockchain-Secured Payments",
                  description:
                    "Pay securely with our blockchain-based escrow system, eliminating fraud risks and building trust.",
                },
                {
                  icon: MapPin,
                  title: "Real-time GPS Tracking",
                  description:
                    "Track shipments in real-time with precise GPS location updates and automated status notifications.",
                },
                {
                  icon: BarChart3,
                  title: "Advanced Analytics",
                  description:
                    "Gain valuable insights with comprehensive analytics, performance metrics, and predictive reporting.",
                },
                {
                  icon: Leaf,
                  title: "Carbon Impact Tracking",
                  description:
                    "Monitor and reduce your environmental footprint with detailed carbon emission tracking and optimization.",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-[#add64e]/30 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-[#add64e]/10"
                >
                  <CardHeader className="pb-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#add64e]/20 to-[#9bc943]/20 group-hover:from-[#add64e]/30 group-hover:to-[#9bc943]/30 transition-all duration-300">
                      <feature.icon className="h-7 w-7 text-[#add64e] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardTitle className="mt-4 text-xl font-semibold text-white group-hover:text-[#add64e] transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white/70 leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
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
                {
                  href: "#",
                  icon: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
                  label: "LinkedIn",
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
    </div>
  )
}
