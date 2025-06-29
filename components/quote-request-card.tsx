import { Badge } from "@/components/ui/badge"
import { FileText, ArrowRight, Package, MapPin } from "lucide-react"
import Link from "next/link"

interface QuoteRequestProps {
  quote: {
    id: string
    origin: string
    destination: string
    packageType: string
    weight: string
    date: string
    quotes: number
    status: string
  }
}

export function QuoteRequestCard({ quote }: QuoteRequestProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending Quotes
          </Badge>
        )
      case "received":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Quotes Received
          </Badge>
        )
      case "accepted":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
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
          <FileText className="h-5 w-5 text-gray-500" />
          <Link href={`/quotes/${quote.id}`} className="font-medium hover:underline">
            {quote.id}
          </Link>
          {getStatusBadge(quote.status)}
        </div>
        <div className="text-sm text-muted-foreground">{quote.date}</div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium flex items-center gap-1">
            <MapPin className="h-3 w-3" /> From
          </p>
          <p className="text-sm text-muted-foreground">{quote.origin}</p>
        </div>
        <div>
          <p className="text-sm font-medium flex items-center gap-1">
            <MapPin className="h-3 w-3" /> To
          </p>
          <p className="text-sm text-muted-foreground">{quote.destination}</p>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium flex items-center gap-1">
            <Package className="h-3 w-3" /> Package Type
          </p>
          <p className="text-sm text-muted-foreground">{quote.packageType}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Weight</p>
          <p className="text-sm text-muted-foreground">{quote.weight}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm">
          <span className="font-medium">{quote.quotes}</span> quotes received
        </div>
        <Link href={`/quotes/${quote.id}`} className="text-sm text-green-600 hover:text-green-700 flex items-center">
          View quotes
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

