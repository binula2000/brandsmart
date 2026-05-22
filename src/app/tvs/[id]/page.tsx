import Link from "next/link";
import { ChevronRight, Star, Share2, FileText } from "lucide-react";
import TVS_DATA from "@/data/tvs.json";
import ProductGallery from "@/components/ProductGallery";
import ProductActions from "@/components/ProductActions";

const getProduct = async (id: string) => {
  const tv = TVS_DATA.find(item => item.id === id) || TVS_DATA[0];
  return tv;
};

export async function generateStaticParams() {
  return TVS_DATA.map((tv) => ({
    id: tv.id,
  }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);
  
  const isSale = product.originalPrice && product.price < product.originalPrice;
  const savings = isSale ? product.originalPrice! - product.price : 0;
  
  // Default specifications if none exist
  const specs = product.specifications || {
    "Brand": product.brand,
    "Model": product.model,
    "Screen Size": "55 Inches",
    "Resolution": "4K Ultra HD",
    "Display Technology": "LED",
    "Smart Platform": "Yes",
    "Refresh Rate": "120Hz"
  };

  return (
    <div className="bg-white min-h-screen font-sans pb-16">
      <div className="container mx-auto px-4 py-4">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center text-xs font-semibold text-gray-500 mb-6 flex-wrap gap-1">
          <Link href="/" className="hover:text-brand-blue">Departments</Link>
          <span className="mx-1">|</span>
          <Link href="/tvs" className="hover:text-brand-blue">TV & Home Theater</Link>
          <span className="mx-1">|</span>
          <span className="text-brand-blue cursor-pointer">{product.brand} - {product.title}</span>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          
          {/* Left Column: Image Gallery (BrandsMart style) */}
          <ProductGallery id={product.id} images={product.images || []} title={product.title} isSale={isSale} />

          {/* Right Column: Product Details & Actions */}
          <div className="w-full lg:w-5/12 flex flex-col">
            <Link href={`/brand/${product.brand.toLowerCase()}`} className="text-brand-blue font-bold text-sm mb-2 hover:underline">
              {product.brand}
            </Link>
            
            <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-3">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-4">
               <div className="flex items-center gap-1">
                 <div className="flex text-yellow-400">
                   {[...Array(5)].map((_, i) => (
                     <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                   ))}
                 </div>
                 <span className="text-brand-blue text-sm font-semibold hover:underline cursor-pointer ml-1">({product.reviews})</span>
               </div>
               <span className="text-xs text-gray-400">|</span>
               <div className="text-sm text-gray-600">Model: <span className="font-semibold text-gray-800">{product.model}</span></div>
               <span className="text-xs text-gray-400">|</span>
               <div className="text-sm text-gray-600">SKU: <span className="font-semibold text-gray-800">{product.sku}</span></div>
            </div>

            {/* Pricing Block */}
            <div className="mt-4 mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-brand-red">${product.price.toFixed(2)}</span>
                <span className="text-sm text-brand-blue hover:underline cursor-pointer font-semibold">(Why?)</span>
              </div>
              {isSale && (
                <div className="text-sm text-gray-500 font-semibold mt-1">
                  Was: <span className="line-through">${product.originalPrice?.toFixed(2)}</span>
                  <span className="text-green-600 ml-2 border border-green-200 bg-green-50 px-2 py-0.5 rounded text-xs">Save ${(product.originalPrice! - product.price).toFixed(2)}</span>
                </div>
              )}
            </div>



            <ProductActions id={product.id} title={product.title} price={product.price} image={product.images?.[0] || ''} />
          </div>
        </div>

        {/* Product Features Section */}
        <div className="bg-[#f8f9fa] border border-gray-200 p-8 rounded mb-8">
          <div className="flex justify-between items-end border-b border-gray-300 pb-3 mb-6">
            <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">Product Features</h2>
            <div className="text-sm font-bold text-gray-500">Model: <span className="text-gray-900">{product.model}</span> &nbsp;|&nbsp; SKU: <span className="text-gray-900">{product.sku}</span></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
             {product.features?.map((feature, idx) => (
               <div key={idx} className="flex items-start gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2 shrink-0"></div>
                 <span className="text-sm text-gray-800 font-medium leading-relaxed">{feature}</span>
               </div>
             ))}
          </div>
          <div className="mt-6">
            <span className="text-brand-blue font-bold text-sm cursor-pointer hover:underline">View all Product Features</span>
          </div>
        </div>

        {/* Accordions */}
        <div className="border border-gray-200 rounded bg-white">
          {/* Description Accordion */}
          <details className="group border-b border-gray-200" open>
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-5 hover:bg-gray-50 transition-colors">
              <span className="text-lg text-gray-900 uppercase tracking-wide">Product Description</span>
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <div className="text-gray-700 text-sm p-5 pt-0 border-t border-gray-100 bg-white">
              <p className="mb-6 leading-relaxed text-[15px]">{product.description}</p>
              <div className="flex gap-6 mt-4">
                <a href={product.manualUrl || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand-blue font-bold cursor-pointer hover:underline">
                  <span className="bg-blue-50 p-2 rounded text-blue-400"><FileText size={16} /></span>
                  Specification - PDF
                </a>
                <a href={product.manualUrl || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand-blue font-bold cursor-pointer hover:underline">
                  <span className="bg-blue-50 p-2 rounded text-blue-400"><FileText size={16} /></span>
                  Use and Care Manual
                </a>
              </div>
            </div>
          </details>

          {/* Specifications Accordion */}
          <details className="group border-b border-gray-200">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-5 hover:bg-gray-50 transition-colors">
              <span className="text-lg text-gray-900 uppercase tracking-wide">Specifications</span>
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <div className="p-0 border-t border-gray-100 bg-white">
               <table className="w-full text-sm text-left">
                 <tbody>
                   {Object.entries(specs).map(([key, value], idx) => (
                     <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#f8f9fa]'}>
                       <td className="py-4 px-6 font-bold text-gray-900 w-1/3 border-r border-gray-100">{key}</td>
                       <td className="py-4 px-6 text-gray-700 font-medium">{value as string}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
          </details>

          {/* Reviews Accordion */}
          <details className="group">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-5 hover:bg-gray-50 transition-colors">
              <span className="text-lg text-gray-900 uppercase tracking-wide">Ratings & Reviews</span>
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <div className="text-gray-700 text-sm p-5 pt-0 border-t border-gray-100 bg-white flex flex-col items-center justify-center py-12">
               <div className="text-5xl font-extrabold text-gray-900 mb-2">{product.rating}</div>
               <div className="flex text-yellow-400 mb-2">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} size={24} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                 ))}
               </div>
               <div className="text-gray-500 font-semibold mb-6">Based on {product.reviews} reviews</div>
               <button className="border-2 border-brand-blue text-brand-blue font-bold px-8 py-3 rounded hover:bg-brand-blue hover:text-white transition-colors">
                 Write the First Review
               </button>
            </div>
          </details>
        </div>
        
      </div>
    </div>
  );
}
