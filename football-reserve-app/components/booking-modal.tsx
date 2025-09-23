"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, CreditCard, User, Phone, Mail } from "lucide-react"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  field: any
  selectedDate?: Date
  selectedTimeSlot?: string | null
}

export function BookingModal({ isOpen, onClose, field, selectedDate, selectedTimeSlot }: BookingModalProps) {
  const [step, setStep] = useState(1) // 1: Details, 2: Payment, 3: Confirmation
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleBookingComplete = () => {
    // In real app, this would process the booking
    setStep(3)
  }

  const resetAndClose = () => {
    setStep(1)
    setFormData({ name: "", email: "", phone: "", notes: "" })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === 1 && "Informations de réservation"}
            {step === 2 && "Paiement"}
            {step === 3 && "Confirmation"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 && "Veuillez remplir vos informations pour finaliser la réservation"}
            {step === 2 && "Choisissez votre méthode de paiement"}
            {step === 3 && "Votre réservation a été confirmée avec succès"}
          </DialogDescription>
        </DialogHeader>

        {/* Step 1: User Details */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Booking Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Résumé de votre réservation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Terrain:</span>
                  <span className="font-medium">{field.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">{selectedDate?.toLocaleDateString("fr-FR")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Heure:</span>
                  <span className="font-medium">{selectedTimeSlot}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-green-600">{field.price} DT</span>
                </div>
              </CardContent>
            </Card>

            {/* User Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Votre nom complet"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      placeholder="+216 XX XXX XXX"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optionnel)</Label>
                <Textarea
                  id="notes"
                  placeholder="Informations supplémentaires..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <Button
              onClick={handleNextStep}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={!formData.name || !formData.email || !formData.phone}
            >
              Continuer vers le paiement
            </Button>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Méthodes de paiement</CardTitle>
                <CardDescription>Choisissez votre méthode de paiement préférée</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start h-auto p-4 bg-transparent"
                  onClick={handleBookingComplete}
                >
                  <CreditCard className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Carte bancaire</div>
                    <div className="text-sm text-muted-foreground">Visa, Mastercard</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start h-auto p-4 bg-transparent"
                  onClick={handleBookingComplete}
                >
                  <div className="h-5 w-5 mr-3 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">
                    D17
                  </div>
                  <div className="text-left">
                    <div className="font-medium">D17 (Dinar Électronique)</div>
                    <div className="text-sm text-muted-foreground">Paiement mobile</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start h-auto p-4 bg-transparent"
                  onClick={handleBookingComplete}
                >
                  <div className="h-5 w-5 mr-3 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                    €
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Paiement sur place</div>
                    <div className="text-sm text-muted-foreground">Espèces ou carte</div>
                  </div>
                </Button>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Retour
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Réservation confirmée !</h3>
              <p className="text-muted-foreground">
                Votre réservation a été enregistrée avec succès. Vous recevrez un email de confirmation sous peu.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Détails de votre réservation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-left">
                <div className="flex justify-between">
                  <span>Numéro de réservation:</span>
                  <Badge variant="secondary">#FR{Math.floor(Math.random() * 10000)}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Terrain:</span>
                  <span className="font-medium">{field.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">{selectedDate?.toLocaleDateString("fr-FR")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Heure:</span>
                  <span className="font-medium">{selectedTimeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span>Contact:</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button onClick={resetAndClose} className="w-full bg-green-600 hover:bg-green-700">
                Parfait !
              </Button>
              <p className="text-sm text-muted-foreground">
                Un SMS de rappel vous sera envoyé 2 heures avant votre créneau.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
