import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/features/products/api";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";


type ProductsPageProps = {
  products: Product[];
  currentPage: number; 
  onPageChange: (page: number) => void; 
  hasNextPage: boolean; 
};

export const ProductsPage = ({ products, currentPage, onPageChange, hasNextPage }: ProductsPageProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProduct = products.filter((product) => {
    const term = searchTerm.toLowerCase();

    const nameMatch = product.title.toLowerCase().includes(term);

    const descriptionMatch = product.description
      ? product.description.toLowerCase().includes(term)
      : false;

    return nameMatch || descriptionMatch;
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Products</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-8 w-full rounded-xl border border-gray-200 bg-background p-3 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:max-w-md"
      />
      {hasNextPage && (
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          className="mb-6 rounded border p-2"
        >
          Load More
        </Button>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProduct.map((product) => (
          <div key={product.id} className="rounded border p-4">
        <div className="relative bg-background-50 h-56 w-full">
              {product.images?.[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain p-3 transition duration-300 group-hover:scale-105"
                />
              )}
            </div>
            <h2 className="mb-2 line-clamp-2 min-h-10 text-base font-semibold text-foreground">
              {product.title}
            </h2>
            <p className="mb-3 text-xl font-bold">
              ETB {product.price}
            </p>
            <Button className="w-full rounded-lg">
              <Link href={`/products/${product.id}`}>
                View Details
                </Link> 
            </Button>
          </div>
        ))}

       {filteredProduct.length === 0 && (
        <p className="py-12 text-center">
          No products found. Try another search.
        </p>
      )}

      <div className="mt-8 flex items-center justify-center gap-4">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </Button>

        <span className="font-medium">
          Page {currentPage}
        </span>

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className="rounded bg-blue-600 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </Button>
      </div>

      </div>
    </div>
  );
};