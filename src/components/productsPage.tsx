import Image from "next/image";
import { getProducts } from "@/features/products/api";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type ProductsPageProps = {
  products: Product[];
};

export const ProductsPage = ({ products }: ProductsPageProps) => {
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
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 rounded border p-2"
      />
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProduct.map((product) => (
          <div key={product.id} className="rounded border p-4">
        <div className="relative h-56 w-full">
              {product.images?.[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain p-4"
                />
              )}
            </div>
            <h2>{product.title}</h2>
            <p>ETB {product.price}</p>
            <Button>View Details</Button>
          </div>
        ))}
      </div>
    </div>
  );
};