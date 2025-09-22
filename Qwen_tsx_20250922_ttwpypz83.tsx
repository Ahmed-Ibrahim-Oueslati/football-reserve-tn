// Football Reserve TN - Homepage
// The main landing page featuring search, featured fields, and call-to-action

import { Suspense } from "react";
import { SearchBar } from "@/components/features/search/search-bar";
import { FeaturedFields } from "@/components/features/fields/featured-fields";
import { HeroSection } from "@/components/features/home/hero-section";
import { HowItWorks } from "@/components/features/home/how-it-works";
import { Testimonials } from "@/components/features/home/testimonials";
import { CallToAction } from "@/components/features/home/call-to-action";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <section className="my-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Trouvez votre terrain idéal</h2>
        <Suspense fallback={<Skeleton className="h-16 w-full" />}>
          <SearchBar />
        </Suspense>
      </section>
      <Suspense fallback={<div>Loading featured fields...</div>}>
        <FeaturedFields />
      </Suspense>
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </div>
  );
}