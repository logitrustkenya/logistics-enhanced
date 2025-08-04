import { Package, Truck, CreditCard, AlertCircle } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "shipment",
    title: "Shipment SHP-1234 picked up",
    description: "FastTruck Logistics collected your package",
    time: "2 hours ago",
    icon: Package,
    status: "success",
  },
  {
    id: 2,
    type: "payment",
    title: "Payment processed",
    description: "KSh 2,450 charged for shipment SHP-1233",
    time: "4 hours ago",
    icon: CreditCard,
    status: "success",
  },
  {
    id: 3,
    type: "delivery",
    title: "Delivery completed",
    description: "SHP-1232 delivered to Mombasa",
    time: "1 day ago",
    icon: Truck,
    status: "success",
  },
  {
    id: 4,
    type: "alert",
    title: "Delivery delayed",
    description: "SHP-1231 delayed due to weather conditions",
    time: "2 days ago",
    icon: AlertCircle,
    status: "warning",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3">
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              activity.status === "success" ? "bg-green-100" : "bg-yellow-100"
            }`}
          >
            <activity.icon
              className={`h-4 w-4 ${activity.status === "success" ? "text-green-600" : "text-yellow-600"}`}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base font-medium text-gray-100">{activity.title}</p>
            <p className="text-sm text-white/70">{activity.description}</p>
            <p className="text-xs text-white/70 mt-1">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}


