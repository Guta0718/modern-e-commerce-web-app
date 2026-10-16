import { apiFetch } from "@/lib/api-client";
import type { Category, Product } from "@/types";
 
export interface GetProductsParams {
  offset?: number;
  limit?: number;
  categoryId?: number;
  title?: string;
  priceMin?: number;
  priceMax?: number;
}
 
// Some products in this API have messy image data (for example a JSON string
// inside the array). This cleans it so the UI always gets plain URLs.
function cleanImages(images: unknown): string[] {
  if (!Array.isArray(images)) return [];
  return images
    .flatMap((img) => {
      if (typeof img !== "string") return [];
      const trimmed = img.trim();
      if (trimmed.startsWith("[")) {
        try {
          const parsed = JSON.parse(trimmed);
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      }
      return [trimmed];
    })
    .filter((url): url is string => typeof url === "string" && url.startsWith("http"));
}
 
function normalizeProduct(p: Product): Product {
  return { ...p, images: cleanImages(p.images) };
}
 
export async function getProducts(params: GetProductsParams = {}): Promise<Product[]> {
  const query = new URLSearchParams();
  if (params.offset !== undefined) query.set("offset", String(params.offset));
  if (params.limit !== undefined) query.set("limit", String(params.limit));
  if (params.categoryId !== undefined) query.set("categoryId", String(params.categoryId));
  if (params.title) query.set("title", params.title);
  if (params.priceMin !== undefined) query.set("price_min", String(params.priceMin));
  if (params.priceMax !== undefined) query.set("price_max", String(params.priceMax));
 
  const qs = query.toString();
  const products = await apiFetch<Product[]>(`/products${qs ? `?${qs}` : ""}`);
  return products.map(normalizeProduct);
}
 
export async function getProduct(id: number): Promise<Product> {
  return normalizeProduct(await apiFetch<Product>(`/products/${id}`));
}
 
export async function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("/categories");
}
 
export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  const products = await apiFetch<Product[]>(`/categories/${categoryId}/products`);
  return products.map(normalizeProduct);
}
 