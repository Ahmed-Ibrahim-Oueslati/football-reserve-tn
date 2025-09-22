'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export function Pagination({ currentPage, totalPages, hasNext, hasPrev }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-8">
      {hasPrev && (
        <Link href={createPageURL(currentPage - 1)} className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600">
          Previous
        </Link>
      )}

      <span className="text-gray-300">
        Page {currentPage} of {totalPages}
      </span>

      {hasNext && (
        <Link href={createPageURL(currentPage + 1)} className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600">
          Next
        </Link>
      )}
    </div>
  );
}
