"use client"

import { useState } from "react"
import { Button } from "src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card"
import { Badge } from "src/components/ui/badge"
import { Calendar } from "src/components/ui/calendar"
import { Separator } from "src/components/ui/separator"
import { MapPin, Star, Users, Clock, Wifi, Car, Coffee, Shield, ArrowLeft } from "lucide-react"
import { Header } from "src/components/header"
import { BookingModal } from "src/components/booking-modal"
import { TimeSlotGrid } from "src/components/time-slot-grid"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock field data - in real app this would come from API
const mockField = {
  id: 1,
  name: "Stade Municipal Tunis",
  location: "Tunis Centre",
  address: "Avenue Habib Bourguiba, Tunis 1000",
  price: 80,
  rating: 4.8,
  reviews: 124,
  images: [
    "/modern-football-field-with-green-grass.jpg",
    "/premium-football-stadium-with-lights.jpg",
    "/football-field-with-artificial-turf.jpg",
  ],
  amenities: ["Parking", "Vestiaires", "Éclairage", "Wifi", "Cafétéria", "Sécurité"],
  surface: "Gazon naturel",
  capacity: 22,
  description:
    "Un magnifique terrain de football situé au cœur de Tunis. Parfait pour les matchs entre amis ou les entraînements d'équipe. Le terrain dispose d'un éclairage professionnel pour les matchs en soirée.",
  rules: [
    "Chaussures à crampons obligatoires",
    "Respect des horaires de réservation",
    "Nettoyage du terrain après utilisation",
    "Interdiction de fumer sur le terrain",
  ],
  contact: {
    phone: "+216 71 123 456",
    email: "contact@stademunicipal.tn",
  },
}

const amenityIcons = {
  Parking: Car,
  Vestiaires: Users,
  Éclairage: Clock,
  Wifi: Wifi,
  Cafétéria: Coffee,
  Sécurité: Shield,
}

export default function FieldDetailPage() {
  const params = useParams()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleBooking = () => {
    if (selectedDate && selectedTimeSlot) {
      setShowBookingModal(true)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux terrains
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative h-96">
                <Image
                  src={mockField.images[currentImageIndex] || "/placeholder.svg"}
                  alt={mockField.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {mockField.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* Field Info */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{mockField.name}</CardTitle>
                    <CardDescription className="flex items-center mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {mockField.address}
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-600 hover:bg-green-700 text-lg px-3 py-1">{mockField.price} DT/h</Badge>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 mr-1" />
                    <span className="font-medium">{mockField.rating}</span>
                    <span className="text-muted-foreground ml-1">({mockField.reviews} avis)</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    {mockField.capacity} joueurs max
                  </div>
                  <Badge variant="outline">{mockField.surface}</Badge>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-6">{mockField.description}</p>

                {/* Amenities */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Équipements disponibles</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {mockField.amenities.map((amenity) => {
                      const Icon = amenityIcons[amenity as keyof typeof amenityIcons] || Users
                      return (
                        <div key={amenity} className="flex items-center gap-2 text-sm">
                          <Icon className="h-4 w-4 text-green-600" />
                          {amenity}
                        </div>
                      )
                    })}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Rules */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Règlement du terrain</h3>
                  <ul className="space-y-2">
                    {mockField.rules.map((rule, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator className="my-6" />

                {/* Contact */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Contact</h3>
                  <div className="space-y-2 text-sm">
                    <div>Téléphone: {mockField.contact.phone}</div>
                    <div>Email: {mockField.contact.email}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle>Sélectionner une date</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Time Slots */}
            {selectedDate && (
              <Card>
                <CardHeader>
                  <CardTitle>Créneaux disponibles</CardTitle>
                  <CardDescription>
                    {selectedDate.toLocaleDateString("fr-FR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TimeSlotGrid
                    selectedDate={selectedDate}
                    selectedSlot={selectedTimeSlot}
                    onSlotSelect={setSelectedTimeSlot}
                    price={mockField.price}
                  />
                </CardContent>
              </Card>
            )}

            {/* Booking Summary */}
            {selectedDate && selectedTimeSlot && (
              <Card>
                <CardHeader>
                  <CardTitle>Résumé de la réservation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Terrain:</span>
                      <span className="font-medium">{mockField.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span className="font-medium">{selectedDate.toLocaleDateString("fr-FR")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Heure:</span>
                      <span className="font-medium">{selectedTimeSlot}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Durée:</span>
                      <span className="font-medium">1 heure</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total:</span>
                      <span className="text-green-600">{mockField.price} DT</span>
                    </div>
                  </div>

                  <Button onClick={handleBooking} className="w-full bg-green-600 hover:bg-green-700" size="lg">
                    Réserver maintenant
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        field={mockField}
        selectedDate={selectedDate}
        selectedTimeSlot={selectedTimeSlot}
      />
    </div>
  )
}
