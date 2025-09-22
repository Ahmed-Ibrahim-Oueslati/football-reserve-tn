"use client"

import { useState } from "react"
import { Button } from "src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card"
import { Badge } from "src/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "src/components/ui/tabs"
import { Calendar, MapPin, Clock, Phone, Mail, MoreHorizontal } from "lucide-react"
import { Header } from "src/components/header"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "src/components/ui/dropdown-menu"

// Mock bookings data
const mockBookings = {
  upcoming: [
    {
      id: 1,
      fieldName: "Stade Municipal Tunis",
      location: "Tunis Centre",
      date: "2024-01-15",
      time: "14:00 - 15:00",
      price: 80,
      status: "confirmed",
      bookingNumber: "FR1234",
    },
    {
      id: 2,
      fieldName: "Complex Sportif Carthage",
      location: "Carthage",
      date: "2024-01-20",
      time: "16:00 - 17:00",
      price: 120,
      status: "confirmed",
      bookingNumber: "FR1235",
    },
  ],
  past: [
    {
      id: 3,
      fieldName: "Terrain El Menzah",
      location: "El Menzah",
      date: "2024-01-10",
      time: "18:00 - 19:00",
      price: 60,
      status: "completed",
      bookingNumber: "FR1230",
    },
  ],
  cancelled: [
    {
      id: 4,
      fieldName: "Stade Olympique Sousse",
      location: "Sousse",
      date: "2024-01-12",
      time: "20:00 - 21:00",
      price: 100,
      status: "cancelled",
      bookingNumber: "FR1231",
    },
  ],
}

const statusColors = {
  confirmed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

const statusLabels = {
  confirmed: "Confirmée",
  completed: "Terminée",
  cancelled: "Annulée",
}

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  const handleCancelBooking = (bookingId: number) => {
    // In real app, this would call an API
    console.log("Cancelling booking:", bookingId)
  }

  const handleRescheduleBooking = (bookingId: number) => {
    // In real app, this would open a reschedule modal
    console.log("Rescheduling booking:", bookingId)
  }

  const BookingCard = ({ booking }: { booking: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{booking.fieldName}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {booking.location}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={statusColors[booking.status as keyof typeof statusColors]}>
              {statusLabels[booking.status as keyof typeof statusLabels]}
            </Badge>
            {booking.status === "confirmed" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleRescheduleBooking(booking.id)}>Reprogrammer</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCancelBooking(booking.id)} className="text-red-600">
                    Annuler
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(booking.date).toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              {booking.time}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="text-sm text-muted-foreground">Réservation #{booking.bookingNumber}</div>
            <div className="text-lg font-semibold text-green-600">{booking.price} DT</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Mes réservations</h1>
            <p className="text-muted-foreground">Gérez toutes vos réservations de terrains de football</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">À venir ({mockBookings.upcoming.length})</TabsTrigger>
              <TabsTrigger value="past">Passées ({mockBookings.past.length})</TabsTrigger>
              <TabsTrigger value="cancelled">Annulées ({mockBookings.cancelled.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {mockBookings.upcoming.length > 0 ? (
                mockBookings.upcoming.map((booking) => <BookingCard key={booking.id} booking={booking} />)
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Aucune réservation à venir</h3>
                    <p className="text-muted-foreground mb-4">Vous n'avez pas encore de réservations programmées.</p>
                    <Button className="bg-green-600 hover:bg-green-700">Réserver un terrain</Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {mockBookings.past.length > 0 ? (
                mockBookings.past.map((booking) => <BookingCard key={booking.id} booking={booking} />)
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Aucune réservation passée</h3>
                    <p className="text-muted-foreground">Vos réservations terminées apparaîtront ici.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="cancelled" className="space-y-4">
              {mockBookings.cancelled.length > 0 ? (
                mockBookings.cancelled.map((booking) => <BookingCard key={booking.id} booking={booking} />)
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <h3 className="text-lg font-semibold mb-2">Aucune réservation annulée</h3>
                    <p className="text-muted-foreground">Les réservations annulées apparaîtront ici.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          {/* Contact Support */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Besoin d'aide ?</CardTitle>
              <CardDescription>Notre équipe est là pour vous aider avec vos réservations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex items-center bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  +216 71 123 456
                </Button>
                <Button variant="outline" className="flex items-center bg-transparent">
                  <Mail className="h-4 w-4 mr-2" />
                  support@footballreserve.tn
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
