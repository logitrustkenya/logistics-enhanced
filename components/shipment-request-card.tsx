import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, ArrowRight, MapPin, Calendar } from "lucide-react"
import Link from "next/link"

interface ShipmentRequestProps {
  request: {
    id: string
    origin: string
    destination: string
    packageType: string
    weight: string
    date: string
    deadline: string
    status: string
  }
}

export function ShipmentRequestCard({ request }: ShipmentRequestProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            New Request
          </Badge>
        )
      case "quoted":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Quote Submitted
          </Badge>
        )
      case "accepted":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Quote Accepted
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
          <Link href={`/requests/${request.id}`} className="font-medium hover:underline">
            {request.id}
          </Link>
          {getStatusBadge(request.status)}
        </div>
        <div className="text-sm text-muted-foreground">{request.date}</div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium flex items-center gap-1">
            <MapPin className="h-3 w-3" /> From
          </p>
          <p className="text-sm text-muted-foreground">{request.origin}</p>
        </div>
        <div>
          <p className="text-sm font-medium flex items-center gap-1">
            <MapPin className="h-3 w-3" /> To
          </p>
          <p className="text-sm text-muted-foreground">{request.destination}</p>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium">Package Type</p>
          <p className="text-sm text-muted-foreground">{request.packageType}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Weight</p>
          <p className="text-sm text-muted-foreground">{request.weight}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>Deadline: {request.deadline}</span>
        </div>
        {request.status === "new" ? (
          <Link href={`/requests/${request.id}`}>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              Submit Quote
            </Button>
          </Link>
        ) : (
          <Link
            href={`/requests/${request.id}`}
            className="text-sm text-green-600 hover:text-green-700 flex items-center"
          >
            View details
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  )
}

