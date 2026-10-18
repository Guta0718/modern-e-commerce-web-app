"use client";

import { useState } from "react";
import { useCartStore } from "@/features/cart/store";
import type { Product } from "@/types";

export default function AddToCartButton({
  product,
}: {
  product: Product;
}) {
  const addToCart = useCartStore((state) => state.addToCart);

  // **Added state**
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);

    // **Reset message after 2 seconds**
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="mt-8 w-full">
      <button
        type="button"
        onClick={handleAddToCart}
        className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Add to Cart
      </button>

      {/* **Display confirmation message** */}
      {added && (
        <p className="mt-2 text-center text-sm font-medium text-green-600">
          Added to cart!
        </p>
      )}
    </div>
  );
}

