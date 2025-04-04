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
import { ArrowLeft, Info, Upload } from "lucide-react"
import Link from "next/link"

export default function NewDisputePage() {
  const [formData, setFormData] = useState({
    shipmentId: "",
    issueType: "",
    description: "",
    priority: "medium",
    attachments: [] as File[],
    preferredResolution: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        attachments: [...formData.attachments, ...Array.from(e.target.files)],
      })
    }
  }

  const handleRemoveFile = (index: number) => {
    const newAttachments = [...formData.attachments]
    newAttachments.splice(index, 1)
    setFormData({
      ...formData,
      attachments: newAttachments,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
    // Redirect to disputes page or show success message
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Link href="/disputes">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">File New Dispute</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dispute Details</CardTitle>
          <CardDescription>Provide information about the issue with your shipment</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Shipment Information</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="shipmentId">Shipment ID</Label>
                    <Input
                      id="shipmentId"
                      name="shipmentId"
                      placeholder="e.g., SHP-1234"
                      value={formData.shipmentId}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Issue Details</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="issueType">Issue Type</Label>
                    <Select
                      value={formData.issueType}
                      onValueChange={(value) => handleSelectChange("issueType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="damaged">Damaged Goods</SelectItem>
                        <SelectItem value="delayed">Delivery Delay</SelectItem>
                        <SelectItem value="missing">Missing Items</SelectItem>
                        <SelectItem value="wrong">Wrong Items Delivered</SelectItem>
                        <SelectItem value="billing">Billing Discrepancy</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Detailed Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Please provide a detailed description of the issue"
                      value={formData.description}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <RadioGroup
                      value={formData.priority}
                      onValueChange={(value) => handleSelectChange("priority", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="low" />
                        <Label htmlFor="low">Low</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="high" />
                        <Label htmlFor="high">High</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Supporting Evidence</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Attachments</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 mb-2">Drag and drop files here, or click to browse</p>
                      <p className="text-xs text-gray-400 mb-4">Supported formats: JPG, PNG, PDF (Max 5MB each)</p>
                      <Input id="attachments" type="file" className="hidden" onChange={handleFileChange} multiple />
                      <Label htmlFor="attachments">
                        <Button type="button" variant="outline">
                          Browse Files
                        </Button>
                      </Label>
                    </div>
                    {formData.attachments.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Uploaded Files:</p>
                        <ul className="space-y-2">
                          {formData.attachments.map((file, index) => (
                            <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                              <span className="text-sm">{file.name}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveFile(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                Remove
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Resolution</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="preferredResolution">Preferred Resolution</Label>
                    <Select
                      value={formData.preferredResolution}
                      onValueChange={(value) => handleSelectChange("preferredResolution", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred resolution" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="refund">Full Refund</SelectItem>
                        <SelectItem value="partial-refund">Partial Refund</SelectItem>
                        <SelectItem value="replacement">Replacement</SelectItem>
                        <SelectItem value="reship">Reship Items</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-blue-50 rounded-lg mt-4">
                  <Info className="h-5 w-5 text-blue-500 mr-2" />
                  <p className="text-sm text-blue-700">
                    Our team will review your dispute and respond within 24-48 hours. You can track the status of your
                    dispute in the Disputes section.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/disputes">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" className="bg-green-600 hover:bg-green-700" onClick={handleSubmit}>
            Submit Dispute
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

