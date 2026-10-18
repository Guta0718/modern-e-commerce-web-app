
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const API = "https://api.escuelajs.co/api/v1";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: { id: number; name: string };
  images: string[];
};

type Category = {
  id: number;
  name: string;
};

const emptyForm = {
  title: "",
  price: "",
  description: "",
  categoryId: "",
  image: "",
};

export default function ManageProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function loadData() {
    setLoading(true);

    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch(`${API}/products?limit=100`),
        fetch(`${API}/categories`),
      ]);

      if (!productsRes.ok || !categoriesRes.ok) {
        throw new Error("Failed to load products or categories.");
      }

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();

      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    setForm({
      title: product.title,
      price: String(product.price),
      description: product.description,
      categoryId: String(product.category.id),
      image: product.images?.[0] ?? "",
    });

    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const payload = {
      title: form.title.trim(),
      price: Number(form.price),
      description: form.description.trim(),
      categoryId: Number(form.categoryId),
      images: form.image.trim() ? [form.image.trim()] : [],
    };

    try {
      const response = await fetch(
        editingId ? `${API}/products/${editingId}` : `${API}/products`,
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Unable to save product.");
      }

      setMessage(editingId ? "Product updated successfully." : "Product added successfully.");
      resetForm();
      await loadData();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to save product."
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteProduct(id: number) {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setMessage("");

    try {
      const response = await fetch(`${API}/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete product.");
      }

      setProducts((current) => current.filter((product) => product.id !== id));
      setMessage("Product deleted.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to delete product."
      );
    }
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <p className="mt-2 text-gray-500">
          Add, view, edit, and delete products in your store.
        </p>
      </div>

      <section className="rounded-xl border border-gray-200 p-6 dark:border-gray-700">
        <h2 className="mb-5 text-xl font-semibold">
          {editingId ? "Edit Product" : "Add New Product"}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Product title"
            className={inputClass}
            required
          />

          <input
            name="price"
            type="number"
            min="0.01"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className={inputClass}
            required
          />

          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className={inputClass}
            required
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            name="image"
            type="url"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL (https://...)"
            className={inputClass}
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Product description"
            className={`${inputClass} min-h-28 md:col-span-2`}
            required
          />

          <div className="flex flex-wrap gap-3 md:col-span-2">
            <button
              type="submit"
              disabled={saving || categories.length === 0}
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Product"
                  : "Add Product"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border px-5 py-3 dark:border-gray-700"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {message && (
          <p className="mt-4 break-words text-sm" role="status">
            {message}
          </p>
        )}
      </section>

      <section>
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold">
            All Products ({filteredProducts.length})
          </h2>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className={`${inputClass} sm:max-w-xs`}
          />
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="rounded-xl border p-6 text-gray-500 dark:border-gray-700">
            No products found.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border dark:border-gray-700">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t dark:border-gray-700"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {product.images?.[0] &&
                        /^https?:\/\//.test(product.images[0]) ? (
                          <div className="relative h-12 w-12 shrink-0">
                            <Image
                              src={product.images[0]}
                              alt={product.title}
                              fill
                              sizes="48px"
                              className="rounded-md object-cover"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                            No image
                          </div>
                        )}
                        <span className="max-w-xs font-medium">
                          {product.title}
                        </span>
                      </div>
                    </td>

                    <td className="p-4">{product.category?.name ?? "—"}</td>
                    <td className="p-4">${product.price}</td>

                    <td className="p-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => startEdit(product)}
                          className="font-semibold text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="font-semibold text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
