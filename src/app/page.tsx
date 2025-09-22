"use client"

import { useState } from "react"
import { Button } from "src/components/ui/button"
import { Input } from "src/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card"
import { Badge } from "src/components/ui/badge"
import { MapPin, Users, Shield, Zap } from "lucide-react"
import { SearchFilters } from "src/components/search-filters"
import { FieldCard } from "src/components/field-card"
import { Header } from "src/components/header"

// Mock data for football fields
const mockFields = [
  {
    id: 1,
    name: "Stade Municipal Tunis",
    location: "Tunis Centre",
    price: 80,
    rating: 4.8,
    image: "/modern-football-field-with-green-grass.jpg",
    amenities: ["Parking", "Vestiaires", "Éclairage"],
    surface: "Gazon naturel",
    capacity: 22,
  },
  {
    id: 2,
    name: "Complex Sportif Carthage",
    location: "Carthage",
    price: 120,
    rating: 4.9,
    image: "/premium-football-stadium-with-lights.jpg",
    amenities: ["Parking", "Vestiaires", "Éclairage", "Cafétéria"],
    surface: "Gazon synthétique",
    capacity: 22,
  },
  {
    id: 3,
    name: "Terrain El Menzah",
    location: "El Menzah",
    price: 60,
    rating: 4.5,
    image: "/football-field-with-artificial-turf.jpg",
    amenities: ["Vestiaires", "Éclairage"],
    surface: "Gazon synthétique",
    capacity: 14,
  },
  {
    id: 4,
    name: "Stade Olympique Sousse",
    location: "Sousse",
    price: 100,
    rating: 4.7,
    image: "/football-stadium-in-tunisia.jpg",
    amenities: ["Parking", "Vestiaires", "Éclairage", "Tribunes"],
    surface: "Gazon naturel",
    capacity: 22,
  },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredFields, setFilteredFields] = useState(mockFields)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const filtered = mockFields.filter(
      (field) =>
        field.name.toLowerCase().includes(query.toLowerCase()) ||
        field.location.toLowerCase().includes(query.toLowerCase()),
    )
    setFilteredFields(filtered)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
              Réservez votre terrain de <span className="text-green-600">football</span> en Tunisie
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Trouvez et réservez les meilleurs terrains de football près de chez vous. Simple, rapide et sécurisé.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Rechercher par ville ou nom du terrain..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
                <Button size="lg" className="bg-green-600 hover:bg-green-700 px-8">
                  Rechercher
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">150+</div>
                <div className="text-muted-foreground">Terrains disponibles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">5000+</div>
                <div className="text-muted-foreground">Réservations effectuées</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">4.8★</div>
                <div className="text-muted-foreground">Note moyenne</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pourquoi choisir Football Reserve TN ?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              La plateforme de référence pour la réservation de terrains de football en Tunisie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Zap className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Réservation instantanée</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Réservez votre terrain en quelques clics, 24h/24 et 7j/7</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Paiement sécurisé</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Transactions sécurisées avec plusieurs options de paiement</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Communauté active</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Rejoignez des milliers de joueurs passionnés à travers la Tunisie</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Search Filters */}
      <section className="py-8 bg-muted/50">
        <div className="container mx-auto px-4">
          <SearchFilters onFiltersChange={setFilteredFields} fields={mockFields} />
        </div>
      </section>

      {/* Fields Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Terrains disponibles</h2>
            <Badge variant="secondary">{filteredFields.length} terrains trouvés</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFields.map((field) => (
              <FieldCard key={field.id} field={field} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à jouer ?</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de joueurs qui font confiance à Football Reserve TN pour leurs réservations de
            terrains.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-green-50">
            Commencer maintenant
          </Button>
        </div>
      </section>
    </div>
  )
}
