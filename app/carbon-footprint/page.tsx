"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

// Sample data for the charts
const monthlyData = [
  { name: "Jan", emissions: 120 },
  { name: "Feb", emissions: 110 },
  { name: "Mar", emissions: 130 },
  { name: "Apr", emissions: 100 },
  { name: "May", emissions: 80 },
  { name: "Jun", emissions: 70 },
  { name: "Jul", emissions: 90 },
  { name: "Aug", emissions: 85 },
  { name: "Sep", emissions: 95 },
  { name: "Oct", emissions: 75 },
  { name: "Nov", emissions: 65 },
  { name: "Dec", emissions: 60 },
]

const shipmentData = [
  { id: 1, route: "Nairobi to Mombasa", distance: 485, emissions: 320, date: "2023-04-15" },
  { id: 2, route: "Nairobi to Kisumu", distance: 340, emissions: 210, date: "2023-04-18" },
  { id: 3, route: "Mombasa to Nakuru", distance: 580, emissions: 390, date: "2023-04-22" },
  { id: 4, route: "Eldoret to Nairobi", distance: 320, emissions: 180, date: "2023-04-25" },
  { id: 5, route: "Nakuru to Kisumu", distance: 180, emissions: 120, date: "2023-04-28" },
]

const offsetProjects = [
  { id: 1, name: "Kenyan Reforestation Project", cost: 15, impact: "High", location: "Central Kenya" },
  { id: 2, name: "Solar Energy Initiative", cost: 20, impact: "Medium", location: "Nairobi" },
  { id: 3, name: "Wind Farm Development", cost: 25, impact: "High", location: "Turkana" },
  { id: 4, name: "Sustainable Agriculture", cost: 10, impact: "Medium", location: "Rift Valley" },
]

export default function CarbonFootprintPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-green-800">Carbon Footprint Tracker</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="bg-green-50">
            <CardTitle className="text-green-800">Total Emissions</CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">1,245 kg CO₂e</div>
            <p className="text-sm text-gray-500 mt-2">15% decrease from last year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-green-50">
            <CardTitle className="text-green-800">Average per Shipment</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">87 kg CO₂e</div>
            <p className="text-sm text-gray-500 mt-2">5% decrease from previous month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-green-50">
            <CardTitle className="text-green-800">Carbon Offset</CardTitle>
            <CardDescription>Total offset</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">780 kg CO₂e</div>
            <p className="text-sm text-gray-500 mt-2">62% of total emissions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
          <TabsTrigger value="offset">Carbon Offset</TabsTrigger>
          <TabsTrigger value="tips">Reduction Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Emissions</CardTitle>
              <CardDescription>Track your carbon footprint over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="emissions" stroke="#16a34a" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Shipments</CardTitle>
              <CardDescription>Carbon emissions by shipment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={shipmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="id" label={{ value: "Shipment ID", position: "insideBottom", offset: -5 }} />
                    <YAxis label={{ value: "CO₂e (kg)", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="emissions" fill="#16a34a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-green-50">
                      <th className="border p-2 text-left">ID</th>
                      <th className="border p-2 text-left">Route</th>
                      <th className="border p-2 text-left">Distance (km)</th>
                      <th className="border p-2 text-left">Emissions (kg CO₂e)</th>
                      <th className="border p-2 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipmentData.map((shipment) => (
                      <tr key={shipment.id} className="hover:bg-gray-50">
                        <td className="border p-2">{shipment.id}</td>
                        <td className="border p-2">{shipment.route}</td>
                        <td className="border p-2">{shipment.distance}</td>
                        <td className="border p-2">{shipment.emissions}</td>
                        <td className="border p-2">{shipment.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offset" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Carbon Offset Projects</CardTitle>
              <CardDescription>Support environmental initiatives to offset your carbon footprint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {offsetProjects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-lg text-green-800">{project.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">Location: {project.location}</p>
                    <p className="text-sm text-gray-600 mb-2">Impact: {project.impact}</p>
                    <p className="text-sm text-gray-600 mb-4">Cost: ${project.cost} per ton CO₂e</p>
                    <Button className="w-full bg-green-600 hover:bg-green-700">Contribute</Button>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Why Offset Your Carbon?</h3>
                <p className="text-sm text-gray-700">
                  Carbon offsetting allows you to compensate for your emissions by funding projects that reduce
                  greenhouse gas emissions elsewhere. These projects often provide additional benefits such as
                  biodiversity conservation, improved air quality, and support for local communities.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Carbon Reduction Tips</CardTitle>
              <CardDescription>Practical ways to reduce your logistics carbon footprint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Optimize Routes</h3>
                  <p className="text-sm">
                    Plan the most efficient routes to minimize distance traveled and fuel consumption. Consider factors
                    like traffic patterns and road conditions.
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Consolidate Shipments</h3>
                  <p className="text-sm">
                    Combine multiple shipments going to the same area to reduce the number of trips and maximize vehicle
                    capacity.
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Choose Eco-Friendly Vehicles</h3>
                  <p className="text-sm">
                    When possible, use electric or hybrid vehicles, or vehicles that run on alternative fuels with lower
                    emissions.
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Reduce Packaging</h3>
                  <p className="text-sm">
                    Use minimal, recyclable packaging materials to reduce weight and space, which leads to more
                    efficient transport.
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Regular Maintenance</h3>
                  <p className="text-sm">
                    Keep vehicles well-maintained with regular servicing to ensure optimal fuel efficiency and reduced
                    emissions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

