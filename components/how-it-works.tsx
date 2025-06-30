import { Card, CardContent } from "@/components/ui/card"
import { Package, Truck, CheckCircle, CreditCard } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Package,
      title: "Create Shipment",
      description: "Specify pickup location, destination, package type, and special handling requirements.",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Truck,
      title: "Get Matched",
      description: "Our system matches you with suitable logistics providers based on your requirements.",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: CheckCircle,
      title: "Track Delivery",
      description: "Track your shipment in real-time with updates on pickup, transit, and delivery.",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "Pay securely through our escrow system once delivery is confirmed.",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ]

  return (
    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <Card key={index} className="relative">
          {index < steps.length - 1 && (
            <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 hidden md:block">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-300"
                />
              </svg>
            </div>
          )}
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${step.bgColor} mb-4`}>
              <step.icon className={`h-6 w-6 ${step.color}`} />
            </div>
            <h3 className="text-lg font-bold mb-2">{step.title}</h3>
            <p className="text-sm text-gray-500">{step.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

