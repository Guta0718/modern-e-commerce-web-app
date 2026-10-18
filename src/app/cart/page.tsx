"use client";

import Link from "next/link";
import { useCartStore } from "@/features/cart/store";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-4xl py-20 text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
          Your Cart Is Empty
        </h1>

        <p className="mb-8 text-gray-600 dark:text-gray-300">
          Browse our products and add something you like.
        </p>

        <Link
          href="/products"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Shopping Cart ({itemCount})
        </h1>

        <button
          type="button"
          onClick={clearCart}
          className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900 sm:flex-row sm:items-center"
            >
              {item.images?.[0] ? (
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="h-28 w-full rounded-lg bg-gray-50 object-contain dark:bg-gray-800 sm:w-28"
                />
              ) : (
                <div className="flex h-28 w-full items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400 sm:w-28">
                  No image
                </div>
              )}

              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h2>

                <p className="mt-2 font-medium text-gray-700 dark:text-gray-300">
                  ETB {item.price.toLocaleString()}
                </p>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="mt-3 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  Remove
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(item.id, item.quantity - 1)
                  }
                  aria-label={`Decrease quantity of ${item.title}`}
                  className="h-9 w-9 rounded-lg border border-gray-300 text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                >
                  −
                </button>

                <span className="min-w-5 text-center font-medium text-gray-900 dark:text-white">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }
                  aria-label={`Increase quantity of ${item.title}`}
                  className="h-9 w-9 rounded-lg border border-gray-300 text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                >
                  +
                </button>
              </div>

              <p className="font-bold text-gray-900 dark:text-white sm:w-28 sm:text-right">
                ETB {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
          <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
            Order Summary
          </h2>

          <div className="mb-4 flex justify-between text-gray-600 dark:text-gray-300">
            <span>Products</span>
            <span>{itemCount}</span>
          </div>

          <div className="mb-6 flex justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
            <span className="font-semibold text-gray-900 dark:text-white">
              Total
            </span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ETB {total.toLocaleString()}
            </span>
          </div>

          <Link
            href="/checkout"
            className="block w-full rounded-lg bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
          >
            Checkout
          </Link>

          <Link
            href="/products"
            className="mt-4 block text-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
