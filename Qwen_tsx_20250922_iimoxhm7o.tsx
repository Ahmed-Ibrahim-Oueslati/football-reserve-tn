// Football Reserve TN - Booking Calendar Component
// An interactive calendar for selecting booking dates and times

"use client";

import * as React from "react";
import { format, isBefore, isSameDay, startOfDay, addDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimeSlotSelector } from "./time-slot-selector";
import { useFieldAvailability } from "@/hooks/use-field-availability";
import { Skeleton } from "@/components/ui/skeleton";

interface BookingCalendarProps {
  fieldId: string;
  userId: string | null;
  onBook?: (bookingData: {
    date: string;
    startTime: string;
    endTime: string;
  }) => void;
}

export function BookingCalendar({
  fieldId,
  userId,
  onBook,
}: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  );
  const { availability, isLoading, error } = useFieldAvailability(
    fieldId,
    selectedDate
  );

  if (!userId) {
    return (
      <div className="rounded-lg border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold">Réserver ce terrain</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Veuillez vous connecter pour réserver ce terrain.
        </p>
        <Button className="w-full">Se Connecter</Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card p-6">
        <Skeleton className="h-8 w-full mb-4" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border bg-card p-6 text-destructive">
        Erreur: {error}
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold">Sélectionnez une date</h3>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={`w-full justify-start text-left font-normal ${
              !selectedDate && "text-muted-foreground"
            }`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, "PPP") : "Choisir une date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) =>
              isBefore(date, new Date()) ||
              isSameDay(date, new Date()) ||
              date > addDays(new Date(), 30)
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {selectedDate && (
        <div className="mt-6">
          <h4 className="mb-2 text-sm font-medium">
            Disponibilités pour le {format(selectedDate, "PPP")}
          </h4>
          <TimeSlotSelector
            availability={availability || []}
            onTimeSelect={(startTime, endTime) => {
              if (onBook) {
                onBook({
                  date: format(selectedDate, "yyyy-MM-dd"),
                  startTime,
                  endTime,
                });
              }
            }}
          />
        </div>
      )}
    </div>
  );
}