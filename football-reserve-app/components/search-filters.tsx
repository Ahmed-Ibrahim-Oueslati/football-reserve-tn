"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Filter, X } from "lucide-react"

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

interface SearchFiltersProps {
  onFiltersChange: (filteredFields: Field[]) => void
  fields: Field[]
}

export function SearchFilters({ onFiltersChange, fields }: SearchFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    location: "all",
    surface: "all",
    priceRange: [0, 200],
    capacity: "",
    amenities: [] as string[],
  })

  const locations = [...new Set(fields.map((field) => field.location))]
  const surfaces = [...new Set(fields.map((field) => field.surface))]
  const allAmenities = [...new Set(fields.flatMap((field) => field.amenities))]

  const applyFilters = () => {
    let filtered = fields

    if (filters.location !== "all") {
      filtered = filtered.filter((field) => field.location === filters.location)
    }

    if (filters.surface !== "all") {
      filtered = filtered.filter((field) => field.surface === filters.surface)
    }

    filtered = filtered.filter((field) => field.price >= filters.priceRange[0] && field.price <= filters.priceRange[1])

    if (filters.capacity) {
      const capacity = Number.parseInt(filters.capacity)
      filtered = filtered.filter((field) => field.capacity >= capacity)
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter((field) => filters.amenities.every((amenity) => field.amenities.includes(amenity)))
    }

    onFiltersChange(filtered)
  }

  const clearFilters = () => {
    setFilters({
      location: "all",
      surface: "all",
      priceRange: [0, 200],
      capacity: "",
      amenities: [],
    })
    onFiltersChange(fields)
  }

  const toggleAmenity = (amenity: string) => {
    setFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>

        {(filters.location !== "all" || filters.surface !== "all" || filters.amenities.length > 0) && (
          <Button variant="ghost" onClick={clearFilters} className="text-sm">
            <X className="h-4 w-4 mr-1" />
            Clear filters
          </Button>
        )}
      </div>

      {showFilters && (
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Location Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                <Select
                  value={filters.location}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, location: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All cities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All cities</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Surface Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Surface</label>
                <Select
                  value={filters.surface}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, surface: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All surfaces" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All surfaces</SelectItem>
                    {surfaces.map((surface) => (
                      <SelectItem key={surface} value={surface}>
                        {surface}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Price ({filters.priceRange[0]} - {filters.priceRange[1]} DT/h)
                </label>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, priceRange: value }))}
                  max={200}
                  min={0}
                  step={10}
                  className="w-full"
                />
              </div>

              {/* Capacity Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Minimum capacity</label>
                <Select
                  value={filters.capacity}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, capacity: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All capacities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All capacities</SelectItem>
                    <SelectItem value="10">10+ players</SelectItem>
                    <SelectItem value="14">14+ players</SelectItem>
                    <SelectItem value="22">22+ players</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Amenities Filter */}
            <div className="mt-6 space-y-2">
              <label className="text-sm font-medium">Amenities</label>
              <div className="flex flex-wrap gap-2">
                {allAmenities.map((amenity) => (
                  <Badge
                    key={amenity}
                    variant={filters.amenities.includes(amenity) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      filters.amenities.includes(amenity) ? "bg-green-600 hover:bg-green-700" : "hover:bg-muted"
                    }`}
                    onClick={() => toggleAmenity(amenity)}
                  >
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={applyFilters} className="bg-green-600 hover:bg-green-700">
                Apply filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
