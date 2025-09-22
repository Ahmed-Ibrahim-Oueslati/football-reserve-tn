"use client"

import { Button } from "src/components/ui/button"
import { Badge } from "src/components/ui/badge"

interface TimeSlotGridProps {
  selectedDate: Date
  selectedSlot: string | null
  onSlotSelect: (slot: string) => void
  price: number
}

// Mock availability data - in real app this would come from API
const generateTimeSlots = (date: Date) => {
  const slots = []
  const today = new Date()
  const isToday = date.toDateString() === today.toDateString()
  const currentHour = today.getHours()

  for (let hour = 8; hour <= 22; hour++) {
    const timeSlot = `${hour.toString().padStart(2, "0")}:00 - ${(hour + 1).toString().padStart(2, "0")}:00`

    // Mock availability logic
    const isAvailable = Math.random() > 0.3 // 70% chance of being available
    const isPast = isToday && hour <= currentHour

    slots.push({
      time: timeSlot,
      available: isAvailable && !isPast,
      isPast,
    })
  }

  return slots
}

export function TimeSlotGrid({ selectedDate, selectedSlot, onSlotSelect, price }: TimeSlotGridProps) {
  const timeSlots = generateTimeSlots(selectedDate)

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-2">
        {timeSlots.map((slot) => (
          <Button
            key={slot.time}
            variant={selectedSlot === slot.time ? "default" : "outline"}
            className={`justify-between h-auto p-3 ${
              selectedSlot === slot.time ? "bg-green-600 hover:bg-green-700 border-green-600" : ""
            } ${!slot.available ? "opacity-50 cursor-not-allowed" : "hover:border-green-600"}`}
            onClick={() => slot.available && onSlotSelect(slot.time)}
            disabled={!slot.available}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">{slot.time}</span>
              {slot.isPast && <span className="text-xs text-muted-foreground">Passé</span>}
              {!slot.available && !slot.isPast && <span className="text-xs text-muted-foreground">Réservé</span>}
            </div>
            {slot.available && (
              <Badge variant="secondary" className="ml-2">
                {price} DT
              </Badge>
            )}
          </Button>
        ))}
      </div>

      <div className="text-xs text-muted-foreground space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-600 rounded"></div>
          <span>Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-muted border rounded"></div>
          <span>Réservé</span>
        </div>
      </div>
    </div>
  )
}
