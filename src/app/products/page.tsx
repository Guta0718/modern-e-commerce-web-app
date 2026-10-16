"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/features/products/api";
import { Product } from "@/types";
import { ProductsPage } from "@/components/productsPage";


export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts({ offset: 0, limit: 20 })
      .then((data) => setProducts(data))
      .catch((error) => console.error("Failed to fetch products:", error));
  }, []);

  return <ProductsPage products={products} />;
}
 