import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Package, Clock } from "lucide-react"

interface QuoteRequestCardProps {
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

export function QuoteRequestCard({ quote }: QuoteRequestCardProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Package className="h-5 w-5 text-gray-400" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-gray-900">{quote.id}</p>
            <Badge variant="outline">{quote.status}</Badge>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <MapPin className="h-3 w-3" />
            <span>{quote.origin}</span>
            <span>→</span>
            <span>{quote.destination}</span>
          </div>
          <div className="flex items-center space-x-4 text-xs text-gray-400 mt-1">
            <span>{quote.packageType}</span>
            <span>{quote.weight}</span>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{quote.date}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{quote.quotes} quotes</p>
          <Button size="sm" variant="outline" className="mt-2 bg-transparent">
            View Quotes
          </Button>
        </div>
      </div>
    </div>
  )
}


