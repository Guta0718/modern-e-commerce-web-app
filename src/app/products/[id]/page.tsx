
import Image from "next/image";
import { getProducts } from "@/features/products/api";
import type { Product } from "@/types";
import Link from "next/link";

// NEW: Fetch one product using its ID
async function getProduct(id: string): Promise<Product> {
  const response = await fetch(
    `https://api.escuelajs.co/api/v1/products/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/products"
        className="mb-8 inline-block text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        ← Back to Products
      </Link>

      <div className="grid gap-10 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
        <div className="relative min-h-80 overflow-hidden rounded-xl bg-gray-50">
          {product.images?.[0] && (
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-6"
            />
          )}
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-blue-600">
            {product.category?.name}
          </p>

          <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900">
            {product.title}
          </h1>

          <p className="mb-6 text-2xl font-bold text-gray-900">
            ETB {product.price}
          </p>

          <p className="leading-7 text-gray-600">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
