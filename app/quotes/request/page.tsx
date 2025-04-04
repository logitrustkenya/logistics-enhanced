"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Info } from "lucide-react"
import Link from "next/link"

export default function RequestQuotePage() {
  const [formData, setFormData] = useState({
    pickupAddress: "",
    pickupCity: "",
    destinationAddress: "",
    destinationCity: "",
    packageType: "",
    weight: "",
    dimensions: "",
    description: "",
    fragile: false,
    refrigerated: false,
    hazardous: false,
    insurance: false,
    specialInstructions: "",
    pickupDate: "",
    deliveryPreference: "standard",
    providerPreference: "any",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    })
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
    // Redirect to quotes page or show success message
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Link href="/quotes">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Request Quote</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quote Request Details</CardTitle>
          <CardDescription>Provide the details to receive quotes from logistics providers</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Shipment Details</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="pickupAddress">Pickup Address</Label>
                    <Input
                      id="pickupAddress"
                      name="pickupAddress"
                      value={formData.pickupAddress}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pickupCity">Pickup City</Label>
                    <Input
                      id="pickupCity"
                      name="pickupCity"
                      value={formData.pickupCity}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="destinationAddress">Destination Address</Label>
                    <Input
                      id="destinationAddress"
                      name="destinationAddress"
                      value={formData.destinationAddress}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destinationCity">Destination City</Label>
                    <Input
                      id="destinationCity"
                      name="destinationCity"
                      value={formData.destinationCity}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Package Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="packageType">Package Type</Label>
                  <Select
                    value={formData.packageType}
                    onValueChange={(value) => handleSelectChange("packageType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select package type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="box">Box</SelectItem>
                      <SelectItem value="envelope">Envelope</SelectItem>
                      <SelectItem value="pallet">Pallet</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      value={formData.weight}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dimensions">Dimensions (L x W x H cm)</Label>
                    <Input
                      id="dimensions"
                      name="dimensions"
                      placeholder="e.g., 30 x 20 x 10"
                      value={formData.dimensions}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="description">Package Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the contents of your package"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Special Requirements</h3>
                <div className="space-y-2">
                  <Label>Special Handling Requirements</Label>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="fragile"
                        checked={formData.fragile}
                        onCheckedChange={(checked) => handleCheckboxChange("fragile", checked as boolean)}
                      />
                      <label
                        htmlFor="fragile"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Fragile Items
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="refrigerated"
                        checked={formData.refrigerated}
                        onCheckedChange={(checked) => handleCheckboxChange("refrigerated", checked as boolean)}
                      />
                      <label
                        htmlFor="refrigerated"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Temperature Controlled
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hazardous"
                        checked={formData.hazardous}
                        onCheckedChange={(checked) => handleCheckboxChange("hazardous", checked as boolean)}
                      />
                      <label
                        htmlFor="hazardous"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Hazardous Materials
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="insurance"
                        checked={formData.insurance}
                        onCheckedChange={(checked) => handleCheckboxChange("insurance", checked as boolean)}
                      />
                      <label
                        htmlFor="insurance"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Additional Insurance
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="specialInstructions">Special Instructions</Label>
                  <Textarea
                    id="specialInstructions"
                    name="specialInstructions"
                    placeholder="Any special instructions for handling or delivery"
                    value={formData.specialInstructions}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Delivery Preferences</h3>
                <div className="space-y-2">
                  <Label htmlFor="pickupDate">Desired Pickup Date</Label>
                  <Input
                    id="pickupDate"
                    name="pickupDate"
                    type="date"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2 mt-4">
                  <Label>Delivery Preference</Label>
                  <RadioGroup
                    value={formData.deliveryPreference}
                    onValueChange={(value) => handleSelectChange("deliveryPreference", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard">Standard Delivery (3-5 business days)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express">Express Delivery (1-2 business days)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="same-day" id="same-day" />
                      <Label htmlFor="same-day">Same Day Delivery (where available)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Provider Preferences</h3>
                <div className="space-y-2">
                  <Label>Provider Preference</Label>
                  <RadioGroup
                    value={formData.providerPreference}
                    onValueChange={(value) => handleSelectChange("providerPreference", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="any" id="any-provider" />
                      <Label htmlFor="any-provider">Any Provider (best match)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lowest-cost" id="lowest-cost" />
                      <Label htmlFor="lowest-cost">Lowest Cost Provider</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="highest-rated" id="highest-rated" />
                      <Label htmlFor="highest-rated">Highest Rated Provider</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="eco-friendly" id="eco-friendly" />
                      <Label htmlFor="eco-friendly">Eco-Friendly Provider</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex items-center p-4 bg-blue-50 rounded-lg mt-4">
                  <Info className="h-5 w-5 text-blue-500 mr-2" />
                  <p className="text-sm text-blue-700">
                    After submitting, you'll receive quotes from matching providers. You can then compare and select the
                    provider that best meets your needs.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/quotes">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" className="bg-green-600 hover:bg-green-700" onClick={handleSubmit}>
            Submit Quote Request
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

