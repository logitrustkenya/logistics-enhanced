import { Package, Truck, CreditCard, MessageSquare, CheckCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "shipment_created",
      message: "New shipment created",
      details: "SHP-1237 to Nakuru",
      time: "10 minutes ago",
      icon: Package,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-100",
    },
    {
      id: 2,
      type: "provider_assigned",
      message: "Provider assigned",
      details: "FastTruck Logistics for SHP-1234",
      time: "1 hour ago",
      icon: Truck,
      iconColor: "text-green-500",
      iconBg: "bg-green-100",
    },
    {
      id: 3,
      type: "payment_completed",
      message: "Payment completed",
      details: "KSh 3,500 for SHP-1236",
      time: "3 hours ago",
      icon: CreditCard,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-100",
    },
    {
      id: 4,
      type: "message_received",
      message: "New message",
      details: "From Kenya Express regarding SHP-1236",
      time: "5 hours ago",
      icon: MessageSquare,
      iconColor: "text-yellow-500",
      iconBg: "bg-yellow-100",
    },
    {
      id: 5,
      type: "shipment_delivered",
      message: "Shipment delivered",
      details: "SHP-1236 delivered successfully",
      time: "Yesterday",
      icon: CheckCircle,
      iconColor: "text-green-500",
      iconBg: "bg-green-100",
    },
    {
      id: 6,
      type: "shipment_delayed",
      message: "Shipment delayed",
      details: "SHP-1233 delayed by 1 day",
      time: "Yesterday",
      icon: Clock,
      iconColor: "text-red-500",
      iconBg: "bg-red-100",
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <div className={cn("rounded-full p-2", activity.iconBg)}>
            <activity.icon className={cn("h-4 w-4", activity.iconColor)} />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.message}</p>
            <p className="text-sm text-muted-foreground">{activity.details}</p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

