// Football Reserve TN - Custom Hook for Field Availability
// Fetches and manages the availability data for a specific field on a given date

import { useState, useEffect } from "react";
import { DayAvailability } from "@/types";

export function useFieldAvailability(
  fieldId: string,
  date: Date | undefined
) {
  const [availability, setAvailability] = useState<DayAvailability | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fieldId || !date) {
      setAvailability(null);
      setIsLoading(false);
      return;
    }

    const fetchAvailability = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/fields/${fieldId}/availability?date=${date.toISOString().split('T')[0]}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: DayAvailability = await response.json();
        setAvailability(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setAvailability(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailability();
  }, [fieldId, date]);

  return { availability, isLoading, error };
}