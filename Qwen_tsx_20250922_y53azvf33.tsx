// Football Reserve TN - Single Field Detail Page
// Displays detailed information about a specific football field

import { notFound } from "next/navigation";
import { FieldDetails } from "@/components/features/fields/field-details";
import { BookingCalendar } from "@/components/features/booking/booking-calendar";
import { FieldReviews } from "@/components/features/reviews/field-reviews";
import { getFieldBySlug } from "@/lib/actions/field-actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function FieldPage({
  params,
}: {
  params: { slug: string };
}) {
  const session = await getServerSession(authOptions);
  const field = await getFieldBySlug(params.slug);

  if (!field) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <FieldDetails field={field} />
          <div className="mt-8">
            <FieldReviews fieldId={field.id} />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <BookingCalendar
              fieldId={field.id}
              userId={session?.user?.id || null}
            />
          </div>
        </div>
      </div>
    </div>
  );
}