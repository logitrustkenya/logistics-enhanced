"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, MapPin, Truck, Star, ArrowRight, Leaf } from "lucide-react"
import Link from "next/link"

export default function ProvidersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  // Mock data
  const providers = [
    {
      id: "PRV-001",
      name: "FastTruck Logistics",
      logo: "/placeholder.svg",
      rating: 4.8,
      reviews: 124,
      location: "Nairobi",
      specialties: ["Express Delivery", "Fragile Items", "Nationwide"],
      ecoFriendly: true,
      description: "Specializing in fast and reliable deliveries across Kenya with a focus on customer satisfaction.",
    },
    {
      id: "PRV-002",
      name: "Kenya Express",
      logo: "/placeholder.svg",
      rating: 4.6,
      reviews: 98,
      location: "Mombasa",
      specialties: ["Same-Day Delivery", "Heavy Items", "Coastal Region"],
      ecoFriendly: false,
      description: "Leading logistics provider in the coastal region with expertise in same-day deliveries.",
    },
    {
      id: "PRV-003",
      name: "Swift Movers",
      logo: "/placeholder.svg",
      rating: 4.5,
      reviews: 87,
      location: "Kisumu",
      specialties: ["Refrigerated Transport", "Western Kenya", "Rural Areas"],
      ecoFriendly: true,
      description: "Specialized in serving western Kenya with a focus on refrigerated transport and rural deliveries.",
    },
    {
      id: "PRV-004",
      name: "Green Logistics",
      logo: "/placeholder.svg",
      rating: 4.7,
      reviews: 76,
      location: "Nairobi",
      specialties: ["Eco-Friendly", "Urban Deliveries", "Electric Vehicles"],
      ecoFriendly: true,
      description: "Environmentally conscious logistics provider using electric vehicles for urban deliveries.",
    },
    {
      id: "PRV-005",
      name: "Highlands Transport",
      logo: "/placeholder.svg",
      rating: 4.4,
      reviews: 65,
      location: "Nakuru",
      specialties: ["Central Kenya", "Agricultural Products", "Bulk Transport"],
      ecoFriendly: false,
      description:
        "Specialized in transporting agricultural products across central Kenya with bulk transport capabilities.",
    },
    {
      id: "PRV-006",
      name: "Nairobi Couriers",
      logo: "/placeholder.svg",
      rating: 4.3,
      reviews: 54,
      location: "Nairobi",
      specialties: ["Small Packages", "Documents", "Urban Areas"],
      ecoFriendly: true,
      description: "Fast and reliable courier service for small packages and documents within urban areas.",
    },
  ]

  // Filter providers based on search term
  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase())) ||
      provider.description.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterType === "eco") {
      return matchesSearch && provider.ecoFriendly
    }

    return matchesSearch
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Logistics Providers</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Find a Provider</CardTitle>
          <CardDescription>Browse and connect with trusted logistics providers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex w-full items-center gap-2 md:w-2/3">
                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search providers by name, location, or specialty..."
                    className="w-full appearance-none pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterType === "all" ? "default" : "outline"}
                  className={filterType === "all" ? "bg-custom-green hover:bg-[#9bc943]" : ""}
                  onClick={() => setFilterType("all")}
                >
                  All Providers
                </Button>
                <Button
                  variant={filterType === "eco" ? "default" : "outline"}
                  className={filterType === "eco" ? "bg-custom-green hover:bg-[#9bc943]" : ""}
                  onClick={() => setFilterType("eco")}
                >
                  <Leaf className="mr-2 h-4 w-4" />
                  Eco-Friendly
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredProviders.map((provider) => (
                <Card key={provider.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={provider.logo} alt={provider.name} />
                          <AvatarFallback>{provider.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{provider.name}</h3>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="ml-1 text-sm font-medium">{provider.rating}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">({provider.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{provider.location}</span>
                        </div>
                        <p className="mt-2 text-sm">{provider.description}</p>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {provider.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-50">
                            {specialty}
                          </Badge>
                        ))}
                        {provider.ecoFriendly && (
                          <Badge variant="outline" className="bg-custom-green/20 text-custom-green border-custom-green">
                            <Leaf className="mr-1 h-3 w-3" />
                            Eco-Friendly
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t p-4">
                      <Button variant="outline" size="sm">
                        <Truck className="mr-2 h-4 w-4" />
                        Request Quote
                      </Button>
                      <Link
                        href={`/providers/${provider.id}`}
                        className="text-sm text-custom-green hover:text-[#9bc943] flex items-center"
                      >
                        View Profile
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

