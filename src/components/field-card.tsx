"use client"

import { Button } from "src/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "src/components/ui/card"
import { Badge } from "src/components/ui/badge"
import { MapPin, Star, Users, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Field {
  id: number
  name: string
  location: string
  price: number
  rating: number
  image: string
  amenities: string[]
  surface: string
  capacity: number
}

interface FieldCardProps {
  field: Field
}

export function FieldCard({ field }: FieldCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image src={field.image || "/placeholder.svg"} alt={field.name} fill className="object-cover" />
          <div className="absolute top-2 right-2">
            <Badge className="bg-green-600 hover:bg-green-700">{field.price} DT/h</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">{field.name}</h3>

          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {field.location}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-sm font-medium">{field.rating}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              {field.capacity} joueurs
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {field.amenities.slice(0, 3).map((amenity) => (
              <Badge key={amenity} variant="secondary" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {field.amenities.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{field.amenities.length - 3}
              </Badge>
            )}
          </div>

          <div className="text-sm text-muted-foreground">Surface: {field.surface}</div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link href={`/field/${field.id}`} className="w-full">
          <Button className="w-full bg-green-600 hover:bg-green-700">
            <Clock className="h-4 w-4 mr-2" />
            Voir les créneaux
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
