"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Info } from "lucide-react"
import Link from "next/link"

export default function RequestQuotePage() {
  const router = useRouter()

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        alert(`Error: ${result.error || "Failed to submit quote request"}`)
        return
      }

      alert("Quote request submitted successfully!")

      // Reset form
      setFormData({
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

      // Redirect to quotes page
      router.push("/quotes")
    } catch (error) {
      console.error("Submission error:", error)
      alert("An unexpected error occurred.")
    }
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
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Quote Request Details</CardTitle>
            <CardDescription>
              Provide the details to receive quotes from logistics providers
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* ... same form UI you already had (unchanged) ... */}
            {/* Retain the rest of the form here exactly as in your original post */}
            {/* If you'd like I can paste the full JSX form again with no truncation */} 
            
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/quotes">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Submit Quote Request
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

