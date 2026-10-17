"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/features/products/api";
import { Product } from "@/types";
import { ProductsPage } from "@/components/productsPage";

const PRODUCTS_PER_PAGE = 20;

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    getProducts({ 
      offset: (currentPage - 1) * PRODUCTS_PER_PAGE, 
      limit: PRODUCTS_PER_PAGE,
    })
      .then((data) => {
        setProducts(data);
        setHasNextPage(data.length === PRODUCTS_PER_PAGE);
  })

      .catch((error) => console.error("Failed to fetch products:", error));
  }, [currentPage]);

  return <ProductsPage 
  products={products} 
  currentPage={currentPage} 
  onPageChange={setCurrentPage}
  hasNextPage={hasNextPage}
  />;
}
 