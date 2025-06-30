import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Package, ArrowRight, CheckCircle, Clock, Truck } from "lucide-react"
import Link from "next/link"

interface ShipmentProps {
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

export function ShipmentCard({ shipment }: ShipmentProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1 text-yellow-600 border-yellow-200 bg-yellow-50">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        )
      case "in-transit":
        return (
          <Badge variant="outline" className="flex items-center gap-1 text-blue-600 border-blue-200 bg-blue-50">
            <Truck className="h-3 w-3" />
            In Transit
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="flex items-center gap-1 text-green-600 border-green-200 bg-green-50">
            <CheckCircle className="h-3 w-3" />
            Delivered
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="rounded-lg border p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-gray-500" />
          <Link href={`/shipments/${shipment.id}`} className="font-medium hover:underline">
            {shipment.id}
          </Link>
          {getStatusBadge(shipment.status)}
        </div>
        <div className="text-sm text-muted-foreground">{shipment.date}</div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium">From</p>
          <p className="text-sm text-muted-foreground">{shipment.origin}</p>
        </div>
        <div>
          <p className="text-sm font-medium">To</p>
          <p className="text-sm text-muted-foreground">{shipment.destination}</p>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-sm font-medium">Provider</p>
        <p className="text-sm text-muted-foreground">{shipment.provider}</p>
      </div>
      <div className="mt-2">
        <p className="text-sm font-medium">Items</p>
        <p className="text-sm text-muted-foreground">{shipment.items}</p>
      </div>
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div>Progress</div>
          <div>{shipment.progress}%</div>
        </div>
        <Progress value={shipment.progress} className="h-2" />
      </div>
      <div className="mt-4 flex justify-end">
        <Link
          href={`/shipments/${shipment.id}`}
          className="text-sm text-green-600 hover:text-green-700 flex items-center"
        >
          View details
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

