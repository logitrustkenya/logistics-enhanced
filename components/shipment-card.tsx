import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Package, Truck } from "lucide-react"

interface ShipmentCardProps {
  shipment: {
    id: string
    origin: string
    destination: string
    status: string
    provider: string
    date: string
    items: string
    progress: number
  }
}

export function ShipmentCard({ shipment }: ShipmentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "in-transit":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <Package className="h-4 w-4" />
      case "in-transit":
        return <Truck className="h-4 w-4" />
      case "pending":
        return <MapPin className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">{getStatusIcon(shipment.status)}</div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-gray-900 truncate">{shipment.id}</p>
            <Badge className={getStatusColor(shipment.status)}>{shipment.status.replace("-", " ")}</Badge>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <span>{shipment.origin}</span>
            <span>→</span>
            <span>{shipment.destination}</span>
          </div>
          <p className="text-xs text-gray-400">
            {shipment.items} • {shipment.provider}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm text-gray-900">{shipment.date}</p>
          <div className="w-24">
            <Progress value={shipment.progress} className="h-2" />
          </div>
        </div>
      </div>
    </div>
  )
}

