import Link from "next/link";
import { ChevronRight } from "lucide-react";
import TVS_DATA from "@/data/tvs.json";
import TVCatalog from "@/components/TVCatalog";
import { Suspense } from "react";

export default function TVCategoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-blue">Home</Link>
        <ChevronRight size={16} className="mx-2" />
        <Link href="#" className="hover:text-brand-blue">TVs & Home Theater</Link>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-gray-900 font-medium">TVs</span>
      </nav>

      {/* Render the interactive catalog client component */}
      <Suspense fallback={<div className="text-center py-12">Loading TVs...</div>}>
        <TVCatalog initialTvs={TVS_DATA} />
      </Suspense>
    </div>
  );
}
