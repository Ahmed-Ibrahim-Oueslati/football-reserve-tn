import { Suspense } from "react";
import { FieldList } from "@/components/field/FieldList";
import { SearchFilters } from "@/components/search/SearchFilters";
import { Pagination } from "@/components/ui/Pagination";
import { getFields } from "@/lib/actions/field-actions";
import { FieldSearchParams } from "@/types";

export default async function FieldsPage({
  searchParams,
}: {
  searchParams: FieldSearchParams;
}) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 9;

  const { fields, pagination } = await getFields({
    ...searchParams,
    page,
    limit,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">All Fields</h1>
        <p className="text-muted-foreground">
          Explore our selection of football fields across Tunis.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Suspense fallback={<div>Loading filters...</div>}>
            <SearchFilters />
          </Suspense>
        </div>
        <div className="lg:col-span-3">
          <Suspense fallback={<div>Loading fields...</div>}>
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
