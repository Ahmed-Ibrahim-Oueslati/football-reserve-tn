// Football Reserve TN - Fields Listing Page
// Displays a paginated, filterable list of all available football fields

import { Suspense } from "react";
import { SearchFilters } from "@/components/features/search/search-filters";
import { FieldList } from "@/components/features/fields/field-list";
import { Pagination } from "@/components/ui/pagination";
import { getFields } from "@/lib/actions/field-actions";
import { FieldSearchParams } from "@/types";

export default async function FieldsPage({
  searchParams,
}: {
  searchParams: FieldSearchParams;
}) {
  const page = parseInt(searchParams.page as string) || 1;
  const limit = parseInt(searchParams.limit as string) || 20;

  const { fields, pagination } = await getFields({
    ...searchParams,
    page,
    limit,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Tous les terrains</h1>
        <p className="text-muted-foreground">
          Explorez notre sélection de terrains de football à travers la Tunisie.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Suspense fallback={<div>Chargement des filtres...</div>}>
            <SearchFilters filters={searchParams} />
          </Suspense>
        </div>
        <div className="lg:col-span-3">
          <Suspense fallback={<div>Chargement des terrains...</div>}>
            <FieldList fields={fields} />
          </Suspense>
          <div className="mt-8">
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              hasNext={pagination.hasNext}
              hasPrev={pagination.hasPrev}
            />
          </div>
        </div>
      </div>
    </div>
  );
}